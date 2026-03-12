"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  CVBuilder.tsx  –  Tabbed admin form for editing CV data in the browser
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nanoid } from "@/lib/nanoid";
import type {
    CVData,
    CVPersonal,
    CVExperience,
    CVProject,
    CVEducation,
    CVSkillGroup,
} from "@/lib/cv-data";

// ─── Zod schemas ─────────────────────────────────────────────────────────────

const personalSchema = z.object({
    name: z.string().min(1, "Required"),
    title: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    phone: z.string().default(""),
    location: z.string().default(""),
    linkedin: z.string().default(""),
    github: z.string().default(""),
    website: z.string().default(""),
    photoPath: z.string().default(""),
    summary: z.string().default(""),
});

const expSchema = z.object({
    company: z.string().min(1, "Required"),
    role: z.string().min(1, "Required"),
    dates: z.string().min(1, "Required"),
    bulletsRaw: z
        .string()
        .min(1, "Enter at least one bullet (one per line)")
        .describe("One bullet per line"),
});

const projSchema = z.object({
    name: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    technologiesRaw: z.string().min(1, "Enter technologies, comma-separated"),
    liveUrl: z.string().optional().default(""),
    githubUrl: z.string().optional().default(""),
    bulletsRaw: z.string().optional().default(""),
});

const eduSchema = z.object({
    institution: z.string().min(1, "Required"),
    degree: z.string().min(1, "Required"),
    dates: z.string().min(1, "Required"),
    notes: z.string().optional().default(""),
});

const skillGroupSchema = z.object({
    category: z.string().min(1, "Required"),
    skillsRaw: z.string().min(1, "Enter skills, comma-separated"),
});

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "personal" | "experience" | "projects" | "education" | "skills";

// ─── Component ───────────────────────────────────────────────────────────────
interface Props {
    initialData: CVData;
    onUpdate: (data: CVData) => void;
}

export function CVBuilder({ initialData, onUpdate }: Props) {
    const [data, setData] = useState<CVData>(initialData);
    const [activeTab, setActiveTab] = useState<Tab>("personal");
    const [editingExpId, setEditingExpId] = useState<string | null>(null);
    const [editingProjId, setEditingProjId] = useState<string | null>(null);
    const [editingEduId, setEditingEduId] = useState<string | null>(null);
    const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
    const [savedMsg, setSavedMsg] = useState(false);

    function push(next: CVData) {
        setData(next);
        onUpdate(next);
        flash();
    }

    function flash() {
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 2000);
    }

    const TABS: { id: Tab; label: string }[] = [
        { id: "personal", label: "Personal" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "education", label: "Education" },
        { id: "skills", label: "Skills" },
    ];

    return (
        <div className="cvb-root">
            <div className="cvb-header">
                <h2 className="cvb-title">CV Builder</h2>
                {savedMsg && <span className="cvb-saved">✓ Saved</span>}
            </div>

            {/* Tabs */}
            <nav className="cvb-tabs" aria-label="CV sections">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`cvb-tab ${activeTab === t.id ? "cvb-tab--active" : ""}`}
                    >
                        {t.label}
                    </button>
                ))}
            </nav>

            <div className="cvb-panel">
                {activeTab === "personal" && (
                    <PersonalTab data={data} push={push} />
                )}
                {activeTab === "experience" && (
                    <ListTab<CVExperience>
                        items={data.experience}
                        editingId={editingExpId}
                        setEditingId={setEditingExpId}
                        renderSummary={(e) => `${e.role} @ ${e.company}`}
                        renderForm={(item, onSave, onCancel) => (
                            <ExpForm item={item} onSave={onSave} onCancel={onCancel} />
                        )}
                        onAdd={() => setEditingExpId("__new__")}
                        onSave={(item) => {
                            const next = editingExpId === "__new__"
                                ? { ...data, experience: [...data.experience, item] }
                                : { ...data, experience: data.experience.map((e) => (e.id === item.id ? item : e)) };
                            push(next);
                            setEditingExpId(null);
                        }}
                        onDelete={(id) => {
                            push({ ...data, experience: data.experience.filter((e) => e.id !== id) });
                        }}
                    />
                )}
                {activeTab === "projects" && (
                    <ListTab<CVProject>
                        items={data.projects}
                        editingId={editingProjId}
                        setEditingId={setEditingProjId}
                        renderSummary={(p) => p.name}
                        renderForm={(item, onSave, onCancel) => (
                            <ProjForm item={item} onSave={onSave} onCancel={onCancel} />
                        )}
                        onAdd={() => setEditingProjId("__new__")}
                        onSave={(item) => {
                            const next = editingProjId === "__new__"
                                ? { ...data, projects: [...data.projects, item] }
                                : { ...data, projects: data.projects.map((p) => (p.id === item.id ? item : p)) };
                            push(next);
                            setEditingProjId(null);
                        }}
                        onDelete={(id) => {
                            push({ ...data, projects: data.projects.filter((p) => p.id !== id) });
                        }}
                    />
                )}
                {activeTab === "education" && (
                    <ListTab<CVEducation>
                        items={data.education}
                        editingId={editingEduId}
                        setEditingId={setEditingEduId}
                        renderSummary={(e) => `${e.degree} — ${e.institution}`}
                        renderForm={(item, onSave, onCancel) => (
                            <EduForm item={item} onSave={onSave} onCancel={onCancel} />
                        )}
                        onAdd={() => setEditingEduId("__new__")}
                        onSave={(item) => {
                            const next = editingEduId === "__new__"
                                ? { ...data, education: [...data.education, item] }
                                : { ...data, education: data.education.map((e) => (e.id === item.id ? item : e)) };
                            push(next);
                            setEditingEduId(null);
                        }}
                        onDelete={(id) => {
                            push({ ...data, education: data.education.filter((e) => e.id !== id) });
                        }}
                    />
                )}
                {activeTab === "skills" && (
                    <ListTab<CVSkillGroup>
                        items={data.skillGroups}
                        editingId={editingSkillId}
                        setEditingId={setEditingSkillId}
                        renderSummary={(sg) => sg.category}
                        renderForm={(item, onSave, onCancel) => (
                            <SkillGroupForm item={item} onSave={onSave} onCancel={onCancel} />
                        )}
                        onAdd={() => setEditingSkillId("__new__")}
                        onSave={(item) => {
                            const next = editingSkillId === "__new__"
                                ? { ...data, skillGroups: [...data.skillGroups, item] }
                                : { ...data, skillGroups: data.skillGroups.map((sg) => (sg.id === item.id ? item : sg)) };
                            push(next);
                            setEditingSkillId(null);
                        }}
                        onDelete={(id) => {
                            push({ ...data, skillGroups: data.skillGroups.filter((sg) => sg.id !== id) });
                        }}
                    />
                )}
            </div>
        </div>
    );
}

// ─── Personal Tab ─────────────────────────────────────────────────────────────
function PersonalTab({ data, push }: { data: CVData; push: (d: CVData) => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(personalSchema),
        defaultValues: data.personal,
    });

    return (
        <form
            className="cvb-form"
            onSubmit={handleSubmit((vals) => push({ ...data, personal: vals as unknown as CVPersonal }))}
        >
            <div className="cvb-form-grid">
                <Field label="Full Name" error={errors.name?.message}>
                    <input {...register("name")} className="cvb-input" />
                </Field>
                <Field label="Title / Role" error={errors.title?.message}>
                    <input {...register("title")} className="cvb-input" />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                    <input {...register("email")} className="cvb-input" type="email" />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                    <input {...register("phone")} className="cvb-input" />
                </Field>
                <Field label="Location" error={errors.location?.message}>
                    <input {...register("location")} className="cvb-input" />
                </Field>
                <Field label="Website" error={errors.website?.message}>
                    <input {...register("website")} className="cvb-input" />
                </Field>
                <Field label="LinkedIn URL" error={errors.linkedin?.message}>
                    <input {...register("linkedin")} className="cvb-input" />
                </Field>
                <Field label="GitHub URL" error={errors.github?.message}>
                    <input {...register("github")} className="cvb-input" />
                </Field>
                <Field
                    label="Photo (public path, e.g. /photo.jpg)"
                    error={errors.photoPath?.message}
                    full
                >
                    <input {...register("photoPath")} className="cvb-input" placeholder="/photo.jpg" />
                </Field>
                <Field label="Summary / Profile" error={errors.summary?.message} full>
                    <textarea {...register("summary")} className="cvb-input cvb-textarea" rows={4} />
                </Field>
            </div>
            <button type="submit" className="cvb-btn-primary">Save Personal Info</button>
        </form>
    );
}

// ─── Generic List Tab ─────────────────────────────────────────────────────────
interface ListTabProps<T extends { id: string }> {
    items: T[];
    editingId: string | null;
    setEditingId: (id: string | null) => void;
    renderSummary: (item: T) => string;
    renderForm: (item: T | null, onSave: (item: T) => void, onCancel: () => void) => React.ReactNode;
    onAdd: () => void;
    onSave: (item: T) => void;
    onDelete: (id: string) => void;
}

function ListTab<T extends { id: string }>({
    items,
    editingId,
    setEditingId,
    renderSummary,
    renderForm,
    onAdd,
    onSave,
    onDelete,
}: ListTabProps<T>) {
    const editingItem = editingId && editingId !== "__new__"
        ? items.find((i) => i.id === editingId) ?? null
        : null;

    return (
        <div className="cvb-list-tab">
            {/* Existing items */}
            {items.map((item) => (
                <div key={item.id} className="cvb-list-item">
                    <span className="cvb-list-item__label">{renderSummary(item)}</span>
                    <div className="cvb-list-item__actions">
                        <button
                            onClick={() => setEditingId(item.id)}
                            className="cvb-btn-ghost"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="cvb-btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Add button */}
            {editingId === null && (
                <button onClick={onAdd} className="cvb-btn-add">
                    + Add Entry
                </button>
            )}

            {/* Inline form */}
            {editingId !== null && (
                <div className="cvb-inline-form">
                    {renderForm(
                        editingItem,
                        onSave,
                        () => setEditingId(null),
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Experience Form ──────────────────────────────────────────────────────────
function ExpForm({
    item,
    onSave,
    onCancel,
}: {
    item: CVExperience | null;
    onSave: (e: CVExperience) => void;
    onCancel: () => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(expSchema),
        defaultValues: {
            company: item?.company ?? "",
            role: item?.role ?? "",
            dates: item?.dates ?? "",
            bulletsRaw: item?.bullets.join("\n") ?? "",
        },
    });

    return (
        <form
            className="cvb-form"
            onSubmit={handleSubmit((vals) =>
                onSave({
                    id: item?.id ?? nanoid(),
                    company: vals.company,
                    role: vals.role,
                    dates: vals.dates,
                    bullets: vals.bulletsRaw.split("\n").map((s: string) => s.trim()).filter(Boolean),
                })
            )}
        >
            <div className="cvb-form-grid">
                <Field label="Company" error={errors.company?.message}>
                    <input {...register("company")} className="cvb-input" />
                </Field>
                <Field label="Role / Title" error={errors.role?.message}>
                    <input {...register("role")} className="cvb-input" />
                </Field>
                <Field label="Dates" error={errors.dates?.message} full>
                    <input {...register("dates")} className="cvb-input" placeholder="Jan 2024 — Present" />
                </Field>
                <Field label="Bullet Points (one per line)" error={errors.bulletsRaw?.message} full>
                    <textarea {...register("bulletsRaw")} className="cvb-input cvb-textarea" rows={4} />
                </Field>
            </div>
            <div className="cvb-form-actions">
                <button type="submit" className="cvb-btn-primary">Save</button>
                <button type="button" onClick={onCancel} className="cvb-btn-ghost">Cancel</button>
            </div>
        </form>
    );
}

// ─── Project Form ─────────────────────────────────────────────────────────────
function ProjForm({
    item,
    onSave,
    onCancel,
}: {
    item: CVProject | null;
    onSave: (p: CVProject) => void;
    onCancel: () => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(projSchema),
        defaultValues: {
            name: item?.name ?? "",
            description: item?.description ?? "",
            technologiesRaw: item?.technologies.join(", ") ?? "",
            liveUrl: item?.liveUrl ?? "",
            githubUrl: item?.githubUrl ?? "",
            bulletsRaw: item?.bullets?.join("\n") ?? "",
        },
    });

    return (
        <form
            className="cvb-form"
            onSubmit={handleSubmit((vals) =>
                onSave({
                    id: item?.id ?? nanoid(),
                    name: vals.name,
                    description: vals.description,
                    technologies: vals.technologiesRaw.split(",").map((s: string) => s.trim()).filter(Boolean),
                    liveUrl: vals.liveUrl ?? "",
                    githubUrl: vals.githubUrl ?? "",
                    bullets: vals.bulletsRaw.split("\n").map((b: string) => b.trim()).filter(Boolean),
                })
            )}
        >
            <div className="cvb-form-grid">
                <Field label="Project Name" error={errors.name?.message} full>
                    <input {...register("name")} className="cvb-input" />
                </Field>
                <Field label="Description" error={errors.description?.message} full>
                    <textarea {...register("description")} className="cvb-input cvb-textarea" rows={2} />
                </Field>
                <Field label="Technologies (comma-separated)" error={errors.technologiesRaw?.message} full>
                    <input {...register("technologiesRaw")} className="cvb-input" placeholder="React, Node.js, PostgreSQL" />
                </Field>
                <Field label="Bullet Points (optional, one per line)" error={errors.bulletsRaw?.message} full>
                    <textarea {...register("bulletsRaw")} className="cvb-input cvb-textarea" rows={3} placeholder="Developed X using Y..." />
                </Field>
                <Field label="Live URL" error={errors.liveUrl?.message}>
                    <input {...register("liveUrl")} className="cvb-input" />
                </Field>
                <Field label="GitHub URL" error={errors.githubUrl?.message}>
                    <input {...register("githubUrl")} className="cvb-input" />
                </Field>
            </div>
            <div className="cvb-form-actions">
                <button type="submit" className="cvb-btn-primary">Save</button>
                <button type="button" onClick={onCancel} className="cvb-btn-ghost">Cancel</button>
            </div>
        </form>
    );
}

// ─── Education Form ───────────────────────────────────────────────────────────
function EduForm({
    item,
    onSave,
    onCancel,
}: {
    item: CVEducation | null;
    onSave: (e: CVEducation) => void;
    onCancel: () => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(eduSchema),
        defaultValues: {
            institution: item?.institution ?? "",
            degree: item?.degree ?? "",
            dates: item?.dates ?? "",
            notes: item?.notes ?? "",
        },
    });

    return (
        <form
            className="cvb-form"
            onSubmit={handleSubmit((vals) =>
                onSave({
                    id: item?.id ?? nanoid(),
                    institution: vals.institution,
                    degree: vals.degree,
                    dates: vals.dates,
                    notes: vals.notes ?? "",
                })
            )}
        >
            <div className="cvb-form-grid">
                <Field label="Institution" error={errors.institution?.message}>
                    <input {...register("institution")} className="cvb-input" />
                </Field>
                <Field label="Degree" error={errors.degree?.message}>
                    <input {...register("degree")} className="cvb-input" />
                </Field>
                <Field label="Dates" error={errors.dates?.message} full>
                    <input {...register("dates")} className="cvb-input" placeholder="Sep 2019 — May 2023" />
                </Field>
                <Field label="Notes / Achievements" error={errors.notes?.message} full>
                    <textarea {...register("notes")} className="cvb-input cvb-textarea" rows={2} />
                </Field>
            </div>
            <div className="cvb-form-actions">
                <button type="submit" className="cvb-btn-primary">Save</button>
                <button type="button" onClick={onCancel} className="cvb-btn-ghost">Cancel</button>
            </div>
        </form>
    );
}

// ─── Skill Group Form ─────────────────────────────────────────────────────────
function SkillGroupForm({
    item,
    onSave,
    onCancel,
}: {
    item: CVSkillGroup | null;
    onSave: (sg: CVSkillGroup) => void;
    onCancel: () => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(skillGroupSchema),
        defaultValues: {
            category: item?.category ?? "",
            skillsRaw: item?.skills.join(", ") ?? "",
        },
    });

    return (
        <form
            className="cvb-form"
            onSubmit={handleSubmit((vals) =>
                onSave({
                    id: item?.id ?? nanoid(),
                    category: vals.category,
                    skills: vals.skillsRaw.split(",").map((s: string) => s.trim()).filter(Boolean),
                })
            )}
        >
            <div className="cvb-form-grid">
                <Field label="Category" error={errors.category?.message}>
                    <input {...register("category")} className="cvb-input" placeholder="Frontend" />
                </Field>
                <Field label="Skills (comma-separated)" error={errors.skillsRaw?.message} full>
                    <input {...register("skillsRaw")} className="cvb-input" placeholder="React, TypeScript, CSS" />
                </Field>
            </div>
            <div className="cvb-form-actions">
                <button type="submit" className="cvb-btn-primary">Save</button>
                <button type="button" onClick={onCancel} className="cvb-btn-ghost">Cancel</button>
            </div>
        </form>
    );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
    label,
    error,
    children,
    full,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
    full?: boolean;
}) {
    return (
        <div className={`cvb-field ${full ? "cvb-field--full" : ""}`}>
            <label className="cvb-label">{label}</label>
            {children}
            {error && <span className="cvb-error">{error}</span>}
        </div>
    );
}
