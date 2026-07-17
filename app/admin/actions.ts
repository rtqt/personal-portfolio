"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { put, del } from "@vercel/blob";

export async function addProjectAction(formData: FormData) {
  try {
    const password = formData.get("password")?.toString();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return { error: "Server misconfiguration: No ADMIN_PASSWORD set in .env.local" };
    }

    if (password !== adminPassword) {
      return { error: "Invalid admin password" };
    }

    const num = formData.get("num")?.toString();
    const title = formData.get("title")?.toString();
    const impact = formData.get("impact")?.toString();
    const desc = formData.get("desc")?.toString();
    const tagsString = formData.get("tags")?.toString();
    const imageAlt = formData.get("imageAlt")?.toString();
    const liveUrl = formData.get("liveUrl")?.toString() || null;
    const githubUrl = formData.get("githubUrl")?.toString() || null;
    const imageFile = formData.get("image") as File;

    if (!num || !title || !impact || !desc || !tagsString || !imageAlt || !imageFile) {
       return { error: "Missing required fields" };
    }

    const tags = tagsString.split(",").map(t => t.trim());
    
    // 1. Upload the image to Vercel Blob
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `portfolio-assets/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    let blob;
    try {
      blob = await put(fileName, imageFile, { access: 'public' });
    } catch (uploadError: any) {
      console.error("Vercel Blob upload error", uploadError);
      return { error: "Failed to upload image to Vercel Blob: " + uploadError.message };
    }

    const imageUrl = blob.url;

    // 2. Insert record into Neon DB via Drizzle
    try {
      await db.insert(projects).values({
        num,
        title,
        impact,
        desc,
        tags,
        image: imageUrl,
        imageAlt,
        liveUrl,
        githubUrl
      });
    } catch (insertError: any) {
      console.error("Drizzle insert error", insertError);
      return { error: "Failed to insert database record: " + insertError.message };
    }

    // 3. Revalidate cache so the homepage updates instantly
    revalidatePath("/");
    
    return { success: true };

  } catch (error: any) {
    console.error("Action error", error);
    return { error: error.message || "Something went wrong" };
  }
}

export async function deleteProjectAction(formData: FormData) {
  try {
    const password = formData.get("password")?.toString();
    const projectIdStr = formData.get("projectId")?.toString();

    // 1. Validate admin password
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return { error: "Server misconfiguration: No ADMIN_PASSWORD set" };
    }

    if (password !== adminPassword) {
      return { error: "Invalid admin password" };
    }

    if (!projectIdStr) {
      return { error: "Missing required field: projectId" };
    }
    
    const projectId = parseInt(projectIdStr, 10);

    // 2. Fetch project record to get image URL
    let project;
    try {
      const records = await db.select().from(projects).where(eq(projects.id, projectId));
      project = records[0];
    } catch (fetchError) {
      console.error("Fetch error", fetchError);
      return { error: "Project not found" };
    }

    if (!project) {
      return { error: "Project not found in database" };
    }

    // 3. Delete from Vercel Blob
    if (project.image) {
      try {
        await del(project.image);
      } catch (imageError: any) {
        console.warn("Failed to delete image from Vercel Blob, continuing with database deletion:", imageError.message);
      }
    }

    // 4. Delete project record from database
    try {
      await db.delete(projects).where(eq(projects.id, projectId));
    } catch (deleteError: any) {
      console.error("Database deletion error", deleteError);
      return { error: "Failed to delete project record: " + deleteError.message };
    }

    // 5. Revalidate cache so the homepage updates instantly
    revalidatePath("/");

    return { success: true };

  } catch (error: any) {
    console.error("Delete action error", error);
    return { error: error.message || "Something went wrong" };
  }
}
