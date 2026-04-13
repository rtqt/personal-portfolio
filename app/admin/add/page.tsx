"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addProjectAction } from "../actions";

// Form Schema
const projectSchema = z.object({
  password: z.string().min(1, "Password is required"),
  num: z.string().min(1, "Project number is required (e.g., 04)"),
  title: z.string().min(1, "Title is required"),
  impact: z.string().min(1, "Impact statement is required"),
  desc: z.string().min(1, "Description is required"),
  tags: z.string().min(1, "Comma-separated tags are required"),
  imageAlt: z.string().min(1, "Image Alt Text is required"),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function AddProjectPage() {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsPending(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (!file) {
        throw new Error("Please select an image file.");
      }

      const formData = new FormData();
      formData.append("password", data.password);
      formData.append("num", data.num);
      formData.append("title", data.title);
      formData.append("impact", data.impact);
      formData.append("desc", data.desc);
      formData.append("tags", data.tags);
      formData.append("imageAlt", data.imageAlt);
      if (data.liveUrl) formData.append("liveUrl", data.liveUrl);
      if (data.githubUrl) formData.append("githubUrl", data.githubUrl);
      formData.append("image", file); // append file

      const result = await addProjectAction(formData);

      if (result.error) {
        setErrorMsg(result.error);
      } else {
        setSuccessMsg("Project securely added and homepage revalidated! You can view it on the main page now.");
        reset();
        setFile(null);
      }
    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  const inputStyle = { padding: "0.8rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", color: "#faf5eb", border: "1px solid rgba(255,220,150,0.16)", outline: "none", fontSize: "1rem" };
  const labelStyle = { color: "#a09080", fontSize: "0.9rem", fontWeight: 500 };
  const errorStyle = { color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" };

  return (
    <section className="section" style={{ minHeight: "100vh", paddingTop: "120px" }}>
      <div className="container" style={{ maxWidth: "600px", background: "rgba(255,255,255,0.02)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(255,220,150,0.09)" }}>
        <h1 className="section-title">Add <span className="accent">Project</span></h1>
        <p className="section-desc" style={{ marginBottom: "2rem" }}>Fill out the details below to securely add a new project to your portfolio database.</p>

        {errorMsg && <div style={{ color: "#ef4444", padding: "1rem", borderRadius: "8px", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", marginBottom: "1.5rem" }}>{errorMsg}</div>}
        {successMsg && <div style={{ color: "#10b981", padding: "1rem", borderRadius: "8px", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", marginBottom: "1.5rem" }}>{successMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={labelStyle}>Admin Password *</label>
            <input type="password" {...register("password")} style={inputStyle} placeholder="Secret..." />
            {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={labelStyle}>Number *</label>
              <input type="text" {...register("num")} style={inputStyle} placeholder="04" />
              {errors.num && <span style={errorStyle}>{errors.num.message}</span>}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={labelStyle}>Title *</label>
              <input type="text" {...register("title")} style={inputStyle} placeholder="Project Title" />
              {errors.title && <span style={errorStyle}>{errors.title.message}</span>}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={labelStyle}>Impact Statement *</label>
            <input type="text" {...register("impact")} style={inputStyle} placeholder="What was the main achievement?" />
            {errors.impact && <span style={errorStyle}>{errors.impact.message}</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={labelStyle}>Description *</label>
            <textarea {...register("desc")} rows={4} style={{...inputStyle, resize: "vertical"}} placeholder="Detailed project description..." />
            {errors.desc && <span style={errorStyle}>{errors.desc.message}</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={labelStyle}>Tags (Comma-separated) *</label>
            <input type="text" {...register("tags")} placeholder="React, Next.js, PostgreSQL" style={inputStyle} />
            {errors.tags && <span style={errorStyle}>{errors.tags.message}</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={labelStyle}>Image Upload *</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              style={{...inputStyle, padding: "0.6rem"}} 
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={labelStyle}>Image Alt Text *</label>
            <input type="text" {...register("imageAlt")} style={inputStyle} placeholder="Description of the image" />
            {errors.imageAlt && <span style={errorStyle}>{errors.imageAlt.message}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={labelStyle}>Live URL</label>
              <input type="text" {...register("liveUrl")} style={inputStyle} placeholder="https://..." />
              {errors.liveUrl && <span style={errorStyle}>{errors.liveUrl.message}</span>}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <label style={labelStyle}>GitHub URL</label>
              <input type="text" {...register("githubUrl")} style={inputStyle} placeholder="https://github.com/..." />
              {errors.githubUrl && <span style={errorStyle}>{errors.githubUrl.message}</span>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending} 
            className="btn btn-primary"
            style={{ marginTop: "1rem", width: "100%", justifyContent: "center", fontSize: "1.1rem" }}
          >
            {isPending ? "Uploading..." : "Publish Project"}
          </button>
        </form>
      </div>
    </section>
  );
}
