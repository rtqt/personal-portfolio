"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  CVPDF.tsx  –  @react-pdf/renderer document template
//  Layout: dark sidebar (30%) + white main area (70%)
//  Accent: #f59e0b  (amber – matches portfolio)
// ─────────────────────────────────────────────────────────────────────────────

import {
    Document,
    Page,
    View,
    Text,
    Image,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";
import type { CVData } from "@/lib/cv-data";

// We can skip Font.register since Helvetica is a standard font in react-pdf

// ─── Palette ─────────────────────────────────────────────────────────────────
const AMBER = "#f59e0b";
const DARK = "#1a1612";
const SIDEBAR_BG = "#231f1b";
const WHITE = "#ffffff";
const MUTED = "#9ca3af";
const BODY_TEXT = "#374151";
const LIGHT_LINE = "#e5e7eb";

// ─── Styles ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: WHITE,
        fontFamily: "Helvetica",
        fontSize: 9,
        color: BODY_TEXT,
    },

    // ── Sidebar ────────────────────────────────────────────────────────────────
    sidebar: {
        width: "30%",
        backgroundColor: SIDEBAR_BG,
        padding: 22,
        color: WHITE,
    },

    photoWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: "hidden",
        backgroundColor: DARK,
        marginBottom: 14,
        alignSelf: "center",
        border: `2px solid ${AMBER}`,
    },

    photo: {
        width: 80,
        height: 80,
        objectFit: "cover",
    },

    photoInitials: {
        width: 80,
        height: 80,
        backgroundColor: DARK,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 14,
        border: `2px solid ${AMBER}`,
    },

    initialsText: {
        color: AMBER,
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
    },

    sidebarName: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: WHITE,
        textAlign: "center",
        marginBottom: 2,
    },

    sidebarTitle: {
        fontSize: 9,
        color: AMBER,
        textAlign: "center",
        marginBottom: 16,
        fontFamily: "Helvetica-Oblique",
    },

    sidebarSection: {
        marginBottom: 14,
    },

    sidebarSectionLabel: {
        fontSize: 7,
        color: AMBER,
        fontFamily: "Helvetica-Bold",
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 6,
        paddingBottom: 4,
        borderBottom: `1px solid ${AMBER}`,
    },

    contactRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 4,
        gap: 5,
    },

    contactBullet: {
        color: AMBER,
        fontSize: 8,
        marginTop: 1,
    },

    contactText: {
        color: "#d1d5db",
        fontSize: 8,
        flex: 1,
        lineHeight: 1.4,
    },

    skillCat: {
        color: "#d1d5db",
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        marginBottom: 3,
        marginTop: 6,
    },

    skillPill: {
        backgroundColor: "rgba(245,158,11,0.15)",
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginBottom: 3,
        alignSelf: "flex-start",
    },

    skillPillText: {
        color: AMBER,
        fontSize: 7.5,
    },

    skillsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 3,
    },

    // ── Main ───────────────────────────────────────────────────────────────────
    main: {
        width: "70%",
        padding: "22 26 22 22",
    },

    mainSection: {
        marginBottom: 16,
    },

    mainSectionTitle: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        color: DARK,
        marginBottom: 5,
        paddingBottom: 4,
        borderBottom: `1.5px solid ${AMBER}`,
        textTransform: "uppercase",
        letterSpacing: 1,
    },

    // Summary
    summaryText: {
        fontSize: 9,
        color: BODY_TEXT,
        lineHeight: 1.6,
    },

    // Experience
    expItem: {
        marginBottom: 11,
    },

    expHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },

    expRole: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: DARK,
    },

    expDates: {
        fontSize: 8,
        color: MUTED,
        fontFamily: "Helvetica-Oblique",
    },

    expCompany: {
        fontSize: 8.5,
        color: AMBER,
        marginBottom: 4,
        fontFamily: "Helvetica-Bold",
    },

    bulletRow: {
        flexDirection: "row",
        marginBottom: 2,
        paddingLeft: 2,
    },

    bulletDot: {
        color: AMBER,
        fontSize: 10,
        marginRight: 5,
        marginTop: -1,
    },

    bulletText: {
        flex: 1,
        fontSize: 8.5,
        color: BODY_TEXT,
        lineHeight: 1.5,
    },

    // Project
    projItem: {
        marginBottom: 10,
    },

    projHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 2,
    },

    projName: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: DARK,
    },

    projDesc: {
        fontSize: 8.5,
        color: BODY_TEXT,
        lineHeight: 1.5,
        marginBottom: 3,
    },

    projTags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 3,
    },

    projTag: {
        backgroundColor: "#fef3c7",
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 1.5,
    },

    projTagText: {
        color: "#92400e",
        fontSize: 7,
    },

    // Education
    eduItem: {
        marginBottom: 9,
    },

    eduHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 1,
    },

    eduDegree: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: DARK,
    },

    eduDates: {
        fontSize: 8,
        color: MUTED,
        fontFamily: "Helvetica-Oblique",
    },

    eduInstitution: {
        fontSize: 8.5,
        color: AMBER,
        fontFamily: "Helvetica-Bold",
        marginBottom: 3,
    },

    eduNotes: {
        fontSize: 8.5,
        color: BODY_TEXT,
        lineHeight: 1.5,
    },

    divider: {
        height: 1,
        backgroundColor: LIGHT_LINE,
        marginVertical: 8,
    },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInitials(name: string) {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

// ─── Document Component ──────────────────────────────────────────────────────
export function CVPDF({ data }: { data: CVData }) {
    const { personal, experience, projects, education, skillGroups } = data;

    return (
        <Document
            title={`${personal.name} — CV`}
            author={personal.name}
            subject="Curriculum Vitae"
        >
            <Page size="A4" style={s.page}>
                {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
                <View style={s.sidebar}>
                    {/* Photo */}
                    {personal.photoPath ? (
                        <View style={s.photoWrapper}>
                            <Image
                                src={
                                    personal.photoPath.startsWith("http")
                                        ? personal.photoPath
                                        : `${typeof window !== "undefined" ? window.location.origin : ""}${personal.photoPath}`
                                }
                                style={s.photo}
                            />
                        </View>
                    ) : (
                        <View style={s.photoInitials}>
                            <Text style={s.initialsText}>{getInitials(personal.name)}</Text>
                        </View>
                    )}

                    <Text style={s.sidebarName}>{personal.name}</Text>
                    <Text style={s.sidebarTitle}>{personal.title}</Text>

                    {/* Contact */}
                    <View style={s.sidebarSection}>
                        <Text style={s.sidebarSectionLabel}>Contact</Text>
                        {personal.email && (
                            <View style={s.contactRow}>
                                <Text style={s.contactBullet}>✉</Text>
                                <Text style={s.contactText}>{personal.email}</Text>
                            </View>
                        )}
                        {personal.phone && (
                            <View style={s.contactRow}>
                                <Text style={s.contactBullet}>☎</Text>
                                <Text style={s.contactText}>{personal.phone}</Text>
                            </View>
                        )}
                        {personal.location && (
                            <View style={s.contactRow}>
                                <Text style={s.contactBullet}>⌖</Text>
                                <Text style={s.contactText}>{personal.location}</Text>
                            </View>
                        )}
                        {personal.website && (
                            <View style={s.contactRow}>
                                <Text style={s.contactBullet}>⬡</Text>
                                <Text style={s.contactText}>{personal.website}</Text>
                            </View>
                        )}
                        {personal.linkedin && (
                            <View style={s.contactRow}>
                                <Text style={s.contactBullet}>in</Text>
                                <Text style={s.contactText}>{personal.linkedin}</Text>
                            </View>
                        )}
                        {personal.github && (
                            <View style={s.contactRow}>
                                <Text style={s.contactBullet}>⊕</Text>
                                <Text style={s.contactText}>{personal.github}</Text>
                            </View>
                        )}
                    </View>

                    {/* Skills */}
                    {skillGroups.length > 0 && (
                        <View style={s.sidebarSection}>
                            <Text style={s.sidebarSectionLabel}>Skills</Text>
                            {skillGroups.map((sg) => (
                                <View key={sg.id}>
                                    <Text style={s.skillCat}>{sg.category}</Text>
                                    <View style={s.skillsWrap}>
                                        {sg.skills.map((sk, i) => (
                                            <View key={i} style={s.skillPill}>
                                                <Text style={s.skillPillText}>{sk}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* ── MAIN AREA ────────────────────────────────────────────────── */}
                <View style={s.main}>
                    {/* Summary */}
                    {personal.summary && (
                        <View style={s.mainSection}>
                            <Text style={s.mainSectionTitle}>Profile</Text>
                            <Text style={s.summaryText}>{personal.summary}</Text>
                        </View>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <View style={s.mainSection}>
                            <Text style={s.mainSectionTitle}>Experience</Text>
                            {experience.map((exp, idx) => (
                                <View key={exp.id}>
                                    {idx > 0 && <View style={s.divider} />}
                                    <View style={s.expItem}>
                                        <View style={s.expHeader}>
                                            <Text style={s.expRole}>{exp.role}</Text>
                                            <Text style={s.expDates}>{exp.dates}</Text>
                                        </View>
                                        <Text style={s.expCompany}>{exp.company}</Text>
                                        {exp.bullets.filter(Boolean).map((b, i) => (
                                            <View key={i} style={s.bulletRow}>
                                                <Text style={s.bulletDot}>•</Text>
                                                <Text style={s.bulletText}>{b}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <View style={s.mainSection}>
                            <Text style={s.mainSectionTitle}>Projects</Text>
                            {projects.map((proj, idx) => (
                                <View key={proj.id}>
                                    {idx > 0 && <View style={s.divider} />}
                                    <View style={s.projItem}>
                                        <View style={s.projHeader}>
                                            <Text style={s.projName}>{proj.name}</Text>
                                        </View>
                                        <Text style={s.projDesc}>{proj.description}</Text>
                                        <View style={s.projTags}>
                                            {proj.technologies.map((t, i) => (
                                                <View key={i} style={s.projTag}>
                                                    <Text style={s.projTagText}>{t}</Text>
                                                </View>
                                            ))}
                                        </View>
                                        {proj.bullets && proj.bullets.length > 0 && (
                                            <View style={{ marginTop: 4 }}>
                                                {proj.bullets.map((b, i) => (
                                                    <View key={i} style={s.bulletRow}>
                                                        <Text style={s.bulletDot}>•</Text>
                                                        <Text style={s.bulletText}>{b}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <View style={s.mainSection}>
                            <Text style={s.mainSectionTitle}>Education</Text>
                            {education.map((edu) => (
                                <View key={edu.id} style={s.eduItem}>
                                    <View style={s.eduHeader}>
                                        <Text style={s.eduDegree}>{edu.degree}</Text>
                                        <Text style={s.eduDates}>{edu.dates}</Text>
                                    </View>
                                    <Text style={s.eduInstitution}>{edu.institution}</Text>
                                    {edu.notes && <Text style={s.eduNotes}>{edu.notes}</Text>}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
}
