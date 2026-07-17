"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  CVPDF.tsx  –  @react-pdf/renderer document template
//  Supports 3 styles: Modern Sidebar, Minimalist Executive, Creative Bento
// ─────────────────────────────────────────────────────────────────────────────

import {
    Document,
    Page,
    View,
    Text,
    Image,
    StyleSheet,
} from "@react-pdf/renderer";
import type { CVData } from "@/lib/cv-data";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInitials(name: string) {
    if (!name) return "";
    return name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────────────
//  STYLE SHEET 1: MODERN SIDEBAR (Default)
// ─────────────────────────────────────────────────────────────────────────────
const AMBER = "#f59e0b";
const DARK = "#1a1612";
const SIDEBAR_BG = "#231f1b";
const WHITE = "#ffffff";
const MUTED = "#9ca3af";
const BODY_TEXT = "#374151";
const LIGHT_LINE = "#e5e7eb";

const sModern = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: WHITE,
        fontFamily: "Helvetica",
        fontSize: 9,
        color: BODY_TEXT,
    },
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
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: AMBER,
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
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: AMBER,
    },
    initialsText: {
        color: AMBER,
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        lineHeight: 1.2,
    },
    sidebarName: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: WHITE,
        textAlign: "center",
        marginBottom: 2,
        lineHeight: 1.2,
    },
    sidebarTitle: {
        fontSize: 9,
        color: AMBER,
        textAlign: "center",
        marginBottom: 16,
        fontFamily: "Helvetica-Oblique",
        lineHeight: 1.3,
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
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: AMBER,
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
        lineHeight: 1.4,
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
        lineHeight: 1.3,
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
        lineHeight: 1.2,
    },
    skillsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 3,
    },
    main: {
        width: "70%",
        paddingTop: 22,
        paddingRight: 26,
        paddingBottom: 22,
        paddingLeft: 22,
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
        borderBottomWidth: 1.5,
        borderBottomStyle: "solid",
        borderBottomColor: AMBER,
        textTransform: "uppercase",
        letterSpacing: 1,
        lineHeight: 1.3,
    },
    summaryText: {
        fontSize: 9,
        color: BODY_TEXT,
        lineHeight: 1.6,
    },
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
        lineHeight: 1.3,
        maxWidth: "70%",
    },
    expDates: {
        fontSize: 8,
        color: MUTED,
        fontFamily: "Helvetica-Oblique",
        lineHeight: 1.3,
        maxWidth: "30%",
        textAlign: "right",
    },
    expCompany: {
        fontSize: 8.5,
        color: AMBER,
        marginBottom: 4,
        fontFamily: "Helvetica-Bold",
        lineHeight: 1.3,
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
        lineHeight: 1.5,
    },
    bulletText: {
        flex: 1,
        fontSize: 8.5,
        color: BODY_TEXT,
        lineHeight: 1.5,
    },
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
        lineHeight: 1.3,
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
        lineHeight: 1.2,
    },
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
        lineHeight: 1.3,
        maxWidth: "70%",
    },
    eduDates: {
        fontSize: 8,
        color: MUTED,
        fontFamily: "Helvetica-Oblique",
        lineHeight: 1.3,
        maxWidth: "30%",
        textAlign: "right",
    },
    eduInstitution: {
        fontSize: 8.5,
        color: AMBER,
        fontFamily: "Helvetica-Bold",
        marginBottom: 3,
        lineHeight: 1.3,
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

// ─────────────────────────────────────────────────────────────────────────────
//  STYLE SHEET 2: MINIMALIST EXECUTIVE
// ─────────────────────────────────────────────────────────────────────────────
const EXEC_PRIMARY = "#0f172a"; // Navy/Slate 900
const EXEC_SECONDARY = "#475569"; // Slate 600
const EXEC_TEXT = "#334155"; // Slate 700
const EXEC_LINE = "#cbd5e1"; // Slate 300

const sExecutive = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: WHITE,
        fontFamily: "Helvetica",
        fontSize: 8.5,
        color: EXEC_TEXT,
    },
    header: {
        alignItems: "center",
        marginBottom: 16,
        borderBottomWidth: 2.5,
        borderBottomStyle: "solid",
        borderBottomColor: EXEC_PRIMARY,
        paddingBottom: 10,
    },
    photoWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "#f1f5f9",
        marginBottom: 8,
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: EXEC_PRIMARY,
    },
    photo: {
        width: 60,
        height: 60,
        objectFit: "cover",
    },
    photoInitials: {
        width: 60,
        height: 60,
        backgroundColor: "#f1f5f9",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: EXEC_PRIMARY,
    },
    initialsText: {
        color: EXEC_PRIMARY,
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        lineHeight: 1.2,
    },
    name: {
        fontSize: 20,
        fontFamily: "Helvetica-Bold",
        color: EXEC_PRIMARY,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        marginBottom: 2,
        lineHeight: 1.2,
    },
    title: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: EXEC_SECONDARY,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 8,
        lineHeight: 1.2,
    },
    contactRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 6,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    contactText: {
        fontSize: 7.5,
        color: EXEC_SECONDARY,
        lineHeight: 1.3,
    },
    contactDot: {
        marginHorizontal: 3,
        color: EXEC_LINE,
        fontSize: 7.5,
        lineHeight: 1.3,
    },
    body: {
        flexDirection: "row",
    },
    leftCol: {
        width: "63%",
        marginRight: 12,
    },
    rightCol: {
        width: "35%",
        marginLeft: 12,
    },
    section: {
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 9.5,
        fontFamily: "Helvetica-Bold",
        color: EXEC_PRIMARY,
        borderBottomWidth: 1.5,
        borderBottomStyle: "solid",
        borderBottomColor: EXEC_LINE,
        paddingBottom: 3,
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 1,
        lineHeight: 1.3,
    },
    summaryText: {
        fontSize: 8.5,
        lineHeight: 1.5,
        color: EXEC_TEXT,
    },
    item: {
        marginBottom: 8,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: EXEC_PRIMARY,
        lineHeight: 1.3,
        maxWidth: "70%",
    },
    itemSub: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: EXEC_SECONDARY,
        marginBottom: 3,
        lineHeight: 1.3,
    },
    itemDate: {
        fontSize: 7.5,
        fontFamily: "Helvetica-Oblique",
        color: "#64748b",
        lineHeight: 1.3,
        maxWidth: "30%",
        textAlign: "right",
    },
    itemDesc: {
        fontSize: 8,
        lineHeight: 1.4,
        color: EXEC_TEXT,
    },
    bulletRow: {
        flexDirection: "row",
        marginBottom: 2,
        paddingLeft: 4,
    },
    bulletDot: {
        color: EXEC_PRIMARY,
        marginRight: 4,
        fontSize: 10,
        lineHeight: 1.4,
    },
    bulletText: {
        flex: 1,
        fontSize: 8,
        lineHeight: 1.4,
        color: EXEC_TEXT,
    },
    skillGroup: {
        marginBottom: 6,
    },
    skillGroupTitle: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: EXEC_PRIMARY,
        marginBottom: 3,
        lineHeight: 1.3,
    },
    skillsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 3,
    },
    skillPill: {
        backgroundColor: "#f8fafc",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#e2e8f0",
        paddingHorizontal: 4,
        paddingVertical: 1.5,
        borderRadius: 2,
        marginBottom: 3,
    },
    skillPillText: {
        fontSize: 7.5,
        color: EXEC_TEXT,
        lineHeight: 1.2,
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 6,
    },
});

// ─────────────────────────────────────────────────────────────────────────────
//  STYLE SHEET 3: CREATIVE BENTO
// ─────────────────────────────────────────────────────────────────────────────
const BENTO_TEAL = "#0d9488";
const BENTO_INDIGO = "#6366f1";
const BENTO_DARK = "#0f172a";
const BENTO_BG = "#f8fafc";
const BENTO_BORDER = "#e2e8f0";

const sCreative = StyleSheet.create({
    page: {
        backgroundColor: BENTO_BG,
        fontFamily: "Helvetica",
        fontSize: 8.5,
        color: "#334155",
    },
    topBanner: {
        height: 6,
        width: "100%",
        backgroundColor: BENTO_TEAL,
    },
    container: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerCard: {
        backgroundColor: WHITE,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: BENTO_BORDER,
        borderRadius: 8,
        padding: 14,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerLeft: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        color: BENTO_DARK,
        marginBottom: 2,
        lineHeight: 1.2,
    },
    title: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: BENTO_TEAL,
        textTransform: "uppercase",
        letterSpacing: 1,
        lineHeight: 1.2,
    },
    photoWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: "hidden",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: BENTO_INDIGO,
        marginLeft: 15,
    },
    photo: {
        width: 60,
        height: 60,
        objectFit: "cover",
    },
    photoInitials: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#e0f2fe",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: BENTO_INDIGO,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
    },
    initialsText: {
        color: BENTO_INDIGO,
        fontSize: 16,
        fontFamily: "Helvetica-Bold",
        lineHeight: 1.2,
    },
    body: {
        flexDirection: "row",
    },
    leftCol: {
        width: "57%",
        marginRight: 6,
        flexDirection: "column",
        gap: 10,
    },
    rightCol: {
        width: "41%",
        marginLeft: 6,
        flexDirection: "column",
        gap: 10,
    },
    card: {
        backgroundColor: WHITE,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: BENTO_BORDER,
        borderRadius: 8,
        padding: 12,
    },
    cardTitle: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: BENTO_INDIGO,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#f1f5f9",
        paddingBottom: 4,
        marginBottom: 6,
        lineHeight: 1.3,
    },
    summaryText: {
        fontSize: 8,
        lineHeight: 1.45,
        color: "#475569",
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    contactLabel: {
        fontFamily: "Helvetica-Bold",
        color: BENTO_INDIGO,
        width: 12,
        marginRight: 4,
        fontSize: 7.5,
        lineHeight: 1.3,
    },
    contactText: {
        color: "#475569",
        flex: 1,
        fontSize: 7.5,
        lineHeight: 1.3,
    },
    item: {
        marginBottom: 6,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 1,
    },
    itemTitle: {
        fontSize: 8.5,
        fontFamily: "Helvetica-Bold",
        color: BENTO_DARK,
        lineHeight: 1.3,
        maxWidth: "70%",
    },
    itemSub: {
        fontSize: 7.5,
        fontFamily: "Helvetica-Bold",
        color: BENTO_TEAL,
        marginBottom: 2,
        lineHeight: 1.3,
    },
    itemDate: {
        fontSize: 7,
        color: "#64748b",
        fontFamily: "Helvetica-Oblique",
        lineHeight: 1.3,
        maxWidth: "30%",
        textAlign: "right",
    },
    itemDesc: {
        fontSize: 7.5,
        lineHeight: 1.3,
        color: "#475569",
    },
    bulletRow: {
        flexDirection: "row",
        marginBottom: 1.5,
        paddingLeft: 2,
    },
    bulletDot: {
        color: BENTO_TEAL,
        marginRight: 4,
        fontSize: 10,
        lineHeight: 1.3,
    },
    bulletText: {
        flex: 1,
        fontSize: 7.5,
        lineHeight: 1.3,
        color: "#475569",
    },
    skillGroup: {
        marginBottom: 5,
    },
    skillGroupTitle: {
        fontSize: 7.5,
        fontFamily: "Helvetica-Bold",
        color: BENTO_DARK,
        marginBottom: 2,
        lineHeight: 1.3,
    },
    skillsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 3,
    },
    skillTag: {
        backgroundColor: "#f0fdfa", // Teal tint
        borderRadius: 3,
        paddingHorizontal: 4,
        paddingVertical: 1.5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccfbf1",
        marginBottom: 3,
    },
    skillText: {
        color: BENTO_TEAL,
        fontSize: 7,
        lineHeight: 1.2,
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 5,
    },
});

// ─────────────────────────────────────────────────────────────────────────────
//  TEMPLATE 1: MODERN SIDEBAR (RENDERER)
// ─────────────────────────────────────────────────────────────────────────────
function ModernSidebarTemplate({ data }: { data: CVData }) {
    const { personal, experience, projects, education, skillGroups } = data;

    return (
        <Page size="A4" style={sModern.page}>
            {/* Sidebar */}
            <View style={sModern.sidebar}>
                {personal.photoPath ? (
                    <View style={sModern.photoWrapper}>
                        <Image src={personal.photoPath} style={sModern.photo} />
                    </View>
                ) : (
                    <View style={sModern.photoInitials}>
                        <Text style={sModern.initialsText}>{getInitials(personal.name)}</Text>
                    </View>
                )}

                <Text style={sModern.sidebarName}>{personal.name}</Text>
                <Text style={sModern.sidebarTitle}>{personal.title}</Text>

                {/* Contact */}
                <View style={sModern.sidebarSection}>
                    <Text style={sModern.sidebarSectionLabel}>Contact</Text>
                    {personal.email && (
                        <View style={sModern.contactRow}>
                            <Text style={sModern.contactBullet}>✉</Text>
                            <Text style={sModern.contactText}>{personal.email}</Text>
                        </View>
                    )}
                    {personal.phone && (
                        <View style={sModern.contactRow}>
                            <Text style={sModern.contactBullet}>☎</Text>
                            <Text style={sModern.contactText}>{personal.phone}</Text>
                        </View>
                    )}
                    {personal.location && (
                        <View style={sModern.contactRow}>
                            <Text style={sModern.contactBullet}>⌖</Text>
                            <Text style={sModern.contactText}>{personal.location}</Text>
                        </View>
                    )}
                    {personal.website && (
                        <View style={sModern.contactRow}>
                            <Text style={sModern.contactBullet}>⬡</Text>
                            <Text style={sModern.contactText}>{personal.website}</Text>
                        </View>
                    )}
                    {personal.linkedin && (
                        <View style={sModern.contactRow}>
                            <Text style={sModern.contactBullet}>in</Text>
                            <Text style={sModern.contactText}>{personal.linkedin}</Text>
                        </View>
                    )}
                    {personal.github && (
                        <View style={sModern.contactRow}>
                            <Text style={sModern.contactBullet}>⊕</Text>
                            <Text style={sModern.contactText}>{personal.github}</Text>
                        </View>
                    )}
                </View>

                {/* Skills */}
                {skillGroups.length > 0 && (
                    <View style={sModern.sidebarSection}>
                        <Text style={sModern.sidebarSectionLabel}>Skills</Text>
                        {skillGroups.map((sg) => (
                            <View key={sg.id} wrap={false}>
                                <Text style={sModern.skillCat}>{sg.category}</Text>
                                <View style={sModern.skillsWrap}>
                                    {sg.skills.map((sk, i) => (
                                        <View key={i} style={sModern.skillPill}>
                                            <Text style={sModern.skillPillText}>{sk}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* Main Area */}
            <View style={sModern.main}>
                {personal.summary && (
                    <View style={sModern.mainSection}>
                        <Text style={sModern.mainSectionTitle}>Profile</Text>
                        <Text style={sModern.summaryText}>{personal.summary}</Text>
                    </View>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <View style={sModern.mainSection}>
                        <Text style={sModern.mainSectionTitle}>Experience</Text>
                        {experience.map((exp, idx) => (
                            <View key={exp.id} wrap={false}>
                                {idx > 0 && <View style={sModern.divider} />}
                                <View style={sModern.expItem}>
                                    <View style={sModern.expHeader}>
                                        <Text style={sModern.expRole}>{exp.role}</Text>
                                        <Text style={sModern.expDates}>{exp.dates}</Text>
                                    </View>
                                    <Text style={sModern.expCompany}>{exp.company}</Text>
                                    {exp.bullets.filter(Boolean).map((b, i) => (
                                        <View key={i} style={sModern.bulletRow}>
                                            <Text style={sModern.bulletDot}>•</Text>
                                            <Text style={sModern.bulletText}>{b}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <View style={sModern.mainSection}>
                        <Text style={sModern.mainSectionTitle}>Projects</Text>
                        {projects.map((proj, idx) => (
                            <View key={proj.id} wrap={false}>
                                {idx > 0 && <View style={sModern.divider} />}
                                <View style={sModern.projItem}>
                                    <View style={sModern.projHeader}>
                                        <Text style={sModern.projName}>{proj.name}</Text>
                                    </View>
                                    <Text style={sModern.projDesc}>{proj.description}</Text>
                                    <View style={sModern.projTags}>
                                        {proj.technologies.map((t, i) => (
                                            <View key={i} style={sModern.projTag}>
                                                <Text style={sModern.projTagText}>{t}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    {proj.bullets && proj.bullets.length > 0 && (
                                        <View style={{ marginTop: 4 }}>
                                            {proj.bullets.map((b, i) => (
                                                <View key={i} style={sModern.bulletRow}>
                                                    <Text style={sModern.bulletDot}>•</Text>
                                                    <Text style={sModern.bulletText}>{b}</Text>
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
                    <View style={sModern.mainSection}>
                        <Text style={sModern.mainSectionTitle}>Education</Text>
                        {education.map((edu) => (
                            <View key={edu.id} style={sModern.eduItem} wrap={false}>
                                <View style={sModern.eduHeader}>
                                    <Text style={sModern.eduDegree}>{edu.degree}</Text>
                                    <Text style={sModern.eduDates}>{edu.dates}</Text>
                                </View>
                                <Text style={sModern.eduInstitution}>{edu.institution}</Text>
                                {edu.notes && <Text style={sModern.eduNotes}>{edu.notes}</Text>}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </Page>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
//  TEMPLATE 2: MINIMALIST EXECUTIVE (RENDERER)
// ─────────────────────────────────────────────────────────────────────────────
function ExecutiveTemplate({ data }: { data: CVData }) {
    const { personal, experience, projects, education, skillGroups } = data;

    return (
        <Page size="A4" style={sExecutive.page}>
            {/* Header */}
            <View style={sExecutive.header}>
                {personal.photoPath ? (
                    <View style={sExecutive.photoWrapper}>
                        <Image src={personal.photoPath} style={sExecutive.photo} />
                    </View>
                ) : (
                    <View style={sExecutive.photoInitials}>
                        <Text style={sExecutive.initialsText}>{getInitials(personal.name)}</Text>
                    </View>
                )}
                <Text style={sExecutive.name}>{personal.name}</Text>
                <Text style={sExecutive.title}>{personal.title}</Text>

                {/* Contact Bar */}
                <View style={sExecutive.contactRow}>
                    {personal.email && (
                        <View style={sExecutive.contactItem}>
                            <Text style={sExecutive.contactText}>{personal.email}</Text>
                        </View>
                    )}
                    {personal.phone && (
                        <View style={sExecutive.contactItem}>
                            <Text style={sExecutive.contactDot}>•</Text>
                            <Text style={sExecutive.contactText}>{personal.phone}</Text>
                        </View>
                    )}
                    {personal.location && (
                        <View style={sExecutive.contactItem}>
                            <Text style={sExecutive.contactDot}>•</Text>
                            <Text style={sExecutive.contactText}>{personal.location}</Text>
                        </View>
                    )}
                    {personal.website && (
                        <View style={sExecutive.contactItem}>
                            <Text style={sExecutive.contactDot}>•</Text>
                            <Text style={sExecutive.contactText}>{personal.website}</Text>
                        </View>
                    )}
                    {personal.linkedin && (
                        <View style={sExecutive.contactItem}>
                            <Text style={sExecutive.contactDot}>•</Text>
                            <Text style={sExecutive.contactText}>{personal.linkedin}</Text>
                        </View>
                    )}
                    {personal.github && (
                        <View style={sExecutive.contactItem}>
                            <Text style={sExecutive.contactDot}>•</Text>
                            <Text style={sExecutive.contactText}>{personal.github}</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Columns Body */}
            <View style={sExecutive.body}>
                {/* Left Column: Profile, Experience, Projects */}
                <View style={sExecutive.leftCol}>
                    {personal.summary && (
                        <View style={sExecutive.section}>
                            <Text style={sExecutive.sectionTitle}>Professional Profile</Text>
                            <Text style={sExecutive.summaryText}>{personal.summary}</Text>
                        </View>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <View style={sExecutive.section}>
                            <Text style={sExecutive.sectionTitle}>Experience</Text>
                            {experience.map((exp, idx) => (
                                <View key={exp.id} style={sExecutive.item} wrap={false}>
                                    {idx > 0 && <View style={sExecutive.divider} />}
                                    <View style={sExecutive.itemHeader}>
                                        <Text style={sExecutive.itemTitle}>{exp.role}</Text>
                                        <Text style={sExecutive.itemDate}>{exp.dates}</Text>
                                    </View>
                                    <Text style={sExecutive.itemSub}>{exp.company}</Text>
                                    {exp.bullets.filter(Boolean).map((b, i) => (
                                        <View key={i} style={sExecutive.bulletRow}>
                                            <Text style={sExecutive.bulletDot}>•</Text>
                                            <Text style={sExecutive.bulletText}>{b}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <View style={sExecutive.section}>
                            <Text style={sExecutive.sectionTitle}>Key Projects</Text>
                            {projects.map((proj, idx) => (
                                <View key={proj.id} style={sExecutive.item} wrap={false}>
                                    {idx > 0 && <View style={sExecutive.divider} />}
                                    <View style={sExecutive.itemHeader}>
                                        <Text style={sExecutive.itemTitle}>{proj.name}</Text>
                                    </View>
                                    <Text style={[sExecutive.itemDesc, { marginBottom: 3 }]}>{proj.description}</Text>
                                    {proj.bullets && proj.bullets.length > 0 ? (
                                        proj.bullets.map((b, i) => (
                                            <View key={i} style={sExecutive.bulletRow}>
                                                <Text style={sExecutive.bulletDot}>•</Text>
                                                <Text style={sExecutive.bulletText}>{b}</Text>
                                            </View>
                                        ))
                                    ) : null}
                                    <View style={[sExecutive.skillsWrap, { marginTop: 4 }]}>
                                        {proj.technologies.map((t, i) => (
                                            <View key={i} style={sExecutive.skillPill}>
                                                <Text style={[sExecutive.skillPillText, { fontSize: 6.5 }]}>
                                                    {t}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Right Column: Education & Skills */}
                <View style={sExecutive.rightCol}>
                    {/* Education */}
                    {education.length > 0 && (
                        <View style={sExecutive.section}>
                            <Text style={sExecutive.sectionTitle}>Education</Text>
                            {education.map((edu) => (
                                <View key={edu.id} style={sExecutive.item} wrap={false}>
                                    <View style={sExecutive.itemHeader}>
                                        <Text style={sExecutive.itemTitle}>{edu.degree}</Text>
                                    </View>
                                    <Text style={sExecutive.itemSub}>{edu.institution}</Text>
                                    <Text style={[sExecutive.itemDate, { marginBottom: 3 }]}>{edu.dates}</Text>
                                    {edu.notes && <Text style={[sExecutive.itemDesc, { fontSize: 7.5 }]}>{edu.notes}</Text>}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Skills */}
                    {skillGroups.length > 0 && (
                        <View style={sExecutive.section}>
                            <Text style={sExecutive.sectionTitle}>Expertise</Text>
                            {skillGroups.map((sg) => (
                                <View key={sg.id} style={sExecutive.skillGroup} wrap={false}>
                                    <Text style={sExecutive.skillGroupTitle}>{sg.category}</Text>
                                    <View style={sExecutive.skillsWrap}>
                                        {sg.skills.map((sk, i) => (
                                            <View key={i} style={sExecutive.skillPill}>
                                                <Text style={sExecutive.skillPillText}>
                                                    {sk}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </Page>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
//  TEMPLATE 3: CREATIVE BENTO (RENDERER)
// ─────────────────────────────────────────────────────────────────────────────
function CreativeBentoTemplate({ data }: { data: CVData }) {
    const { personal, experience, projects, education, skillGroups } = data;

    return (
        <Page size="A4" style={sCreative.page}>
            <View style={sCreative.topBanner} />
            <View style={sCreative.container}>
                {/* Header Card */}
                <View style={sCreative.headerCard}>
                    <View style={sCreative.headerLeft}>
                        <Text style={sCreative.name}>{personal.name}</Text>
                        <Text style={sCreative.title}>{personal.title}</Text>
                    </View>
                    {personal.photoPath ? (
                        <View style={sCreative.photoWrapper}>
                            <Image src={personal.photoPath} style={sCreative.photo} />
                        </View>
                    ) : (
                        <View style={sCreative.photoInitials}>
                            <Text style={sCreative.initialsText}>{getInitials(personal.name)}</Text>
                        </View>
                    )}
                </View>

                {/* Bento Body Grid */}
                <View style={sCreative.body}>
                    {/* Left Asymmetric Column */}
                    <View style={sCreative.leftCol}>
                        {/* Profile Bento */}
                        {personal.summary && (
                            <View style={sCreative.card} wrap={false}>
                                <Text style={sCreative.cardTitle}>About Me</Text>
                                <Text style={sCreative.summaryText}>{personal.summary}</Text>
                            </View>
                        )}

                        {/* Experience Bento */}
                        {experience.length > 0 && (
                            <View style={sCreative.card}>
                                <Text style={sCreative.cardTitle}>Work Experience</Text>
                                {experience.map((exp, idx) => (
                                    <View key={exp.id} style={sCreative.item} wrap={false}>
                                        {idx > 0 && <View style={sCreative.divider} />}
                                        <View style={sCreative.itemHeader}>
                                            <Text style={sCreative.itemTitle}>{exp.role}</Text>
                                            <Text style={sCreative.itemDate}>{exp.dates}</Text>
                                        </View>
                                        <Text style={sCreative.itemSub}>{exp.company}</Text>
                                        {exp.bullets.filter(Boolean).map((b, i) => (
                                            <View key={i} style={sCreative.bulletRow}>
                                                <Text style={sCreative.bulletDot}>•</Text>
                                                <Text style={sCreative.bulletText}>{b}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Projects Bento */}
                        {projects.length > 0 && (
                            <View style={sCreative.card}>
                                <Text style={sCreative.cardTitle}>Featured Projects</Text>
                                {projects.map((proj, idx) => (
                                    <View key={proj.id} style={sCreative.item} wrap={false}>
                                        {idx > 0 && <View style={sCreative.divider} />}
                                        <View style={sCreative.itemHeader}>
                                            <Text style={sCreative.itemTitle}>{proj.name}</Text>
                                        </View>
                                        <Text style={[sCreative.itemDesc, { marginBottom: 3 }]}>{proj.description}</Text>
                                        {proj.bullets && proj.bullets.length > 0 ? (
                                            proj.bullets.map((b, i) => (
                                                <View key={i} style={sCreative.bulletRow}>
                                                    <Text style={sCreative.bulletDot}>•</Text>
                                                    <Text style={sCreative.bulletText}>{b}</Text>
                                                </View>
                                            ))
                                        ) : null}
                                        <View style={[sCreative.skillsWrap, { marginTop: 4 }]}>
                                            {proj.technologies.map((t, i) => (
                                                <View key={i} style={sCreative.skillTag}>
                                                    <Text style={sCreative.skillText}>{t}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Right Bento Column */}
                    <View style={sCreative.rightCol}>
                        {/* Contact Card */}
                        <View style={sCreative.card} wrap={false}>
                            <Text style={sCreative.cardTitle}>Get In Touch</Text>
                            {personal.email && (
                                <View style={sCreative.contactItem}>
                                    <Text style={sCreative.contactLabel}>@</Text>
                                    <Text style={sCreative.contactText}>{personal.email}</Text>
                                </View>
                            )}
                            {personal.phone && (
                                <View style={sCreative.contactItem}>
                                    <Text style={sCreative.contactLabel}>#</Text>
                                    <Text style={sCreative.contactText}>{personal.phone}</Text>
                                </View>
                            )}
                            {personal.location && (
                                <View style={sCreative.contactItem}>
                                    <Text style={sCreative.contactLabel}>*</Text>
                                    <Text style={sCreative.contactText}>{personal.location}</Text>
                                </View>
                            )}
                            {personal.website && (
                                <View style={sCreative.contactItem}>
                                    <Text style={sCreative.contactLabel}>w</Text>
                                    <Text style={sCreative.contactText}>{personal.website}</Text>
                                </View>
                            )}
                            {personal.linkedin && (
                                <View style={sCreative.contactItem}>
                                    <Text style={sCreative.contactLabel}>l</Text>
                                    <Text style={sCreative.contactText}>{personal.linkedin}</Text>
                                </View>
                            )}
                            {personal.github && (
                                <View style={sCreative.contactItem}>
                                    <Text style={sCreative.contactLabel}>g</Text>
                                    <Text style={sCreative.contactText}>{personal.github}</Text>
                                </View>
                            )}
                        </View>

                        {/* Education Card */}
                        {education.length > 0 && (
                            <View style={sCreative.card}>
                                <Text style={sCreative.cardTitle}>Education</Text>
                                {education.map((edu) => (
                                    <View key={edu.id} style={sCreative.item} wrap={false}>
                                        <View style={sCreative.itemHeader}>
                                            <Text style={sCreative.itemTitle}>{edu.degree}</Text>
                                        </View>
                                        <Text style={sCreative.itemSub}>{edu.institution}</Text>
                                        <Text style={[sCreative.itemDate, { marginBottom: 3 }]}>{edu.dates}</Text>
                                        {edu.notes && <Text style={sCreative.itemDesc}>{edu.notes}</Text>}
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Skills Bento Card */}
                        {skillGroups.length > 0 && (
                            <View style={sCreative.card} wrap={false}>
                                <Text style={sCreative.cardTitle}>Skills Matrix</Text>
                                {skillGroups.map((sg) => (
                                    <View key={sg.id} style={sCreative.skillGroup}>
                                        <Text style={sCreative.skillGroupTitle}>{sg.category}</Text>
                                        <View style={sCreative.skillsWrap}>
                                            {sg.skills.map((sk, i) => (
                                                <View key={i} style={sCreative.skillTag}>
                                                    <Text style={sCreative.skillText}>{sk}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Page>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN DOCUMENT ENTRY POINT
// ─────────────────────────────────────────────────────────────────────────────
export function CVPDF({ data }: { data: CVData }) {
    const { personal, selectedTemplate = "modern" } = data;

    return (
        <Document
            title={`${personal.name} — CV`}
            author={personal.name}
            subject="Curriculum Vitae"
        >
            {selectedTemplate === "executive" ? (
                <ExecutiveTemplate data={data} />
            ) : selectedTemplate === "creative" ? (
                <CreativeBentoTemplate data={data} />
            ) : (
                <ModernSidebarTemplate data={data} />
            )}
        </Document>
    );
}
