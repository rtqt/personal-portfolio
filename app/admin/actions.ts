"use server";

import { revalidatePath } from "next/cache";
import { getAdminSupabase } from "@/lib/supabase";

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
    const supabase = getAdminSupabase();
    
    // 1. Upload the image
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error("Upload error", uploadError);
      return { error: "Failed to upload image: " + uploadError.message };
    }

    // 2. Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from('portfolio-assets')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 3. Insert record into database
    const { error: insertError } = await supabase
      .from("projects")
      .insert({
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

    if (insertError) {
      console.error("Insert error", insertError);
      return { error: "Failed to insert database record: " + insertError.message };
    }

    // 4. Revalidate cache so the homepage updates instantly
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
    const projectId = formData.get("projectId")?.toString();

    // 1. Validate admin password
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return { error: "Server misconfiguration: No ADMIN_PASSWORD set" };
    }

    if (password !== adminPassword) {
      return { error: "Invalid admin password" };
    }

    if (!projectId) {
      return { error: "Missing required field: projectId" };
    }

    const supabase = getAdminSupabase();

    // 2. Fetch project record to get image URL
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (fetchError || !project) {
      console.error("Fetch error", fetchError);
      return { error: "Project not found" };
    }

    // 3. Extract filename from image URL and delete from storage
    if (project.image) {
      try {
        const urlParts = project.image.split('/');
        const filename = urlParts[urlParts.length - 1];

        const { error: storageError } = await supabase.storage
          .from('portfolio-assets')
          .remove([filename]);

        if (storageError) {
          // If image doesn't exist (404), log warning but continue
          if (storageError.message?.includes('404') || storageError.message?.includes('not found')) {
            console.warn("Image file not found in storage, continuing with database deletion");
          } else {
            console.error("Storage deletion error", storageError);
            return { error: "Failed to delete image: " + storageError.message };
          }
        }
      } catch (imageError: any) {
        console.error("Image deletion error", imageError);
        return { error: "Failed to delete image: " + imageError.message };
      }
    }

    // 4. Delete project record from database
    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (deleteError) {
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
