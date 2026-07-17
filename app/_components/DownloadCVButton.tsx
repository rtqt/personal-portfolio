"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  DownloadCVButton — Static PDF download
// ─────────────────────────────────────────────────────────────────────────────

import type { CVData } from "@/lib/cv-data";

interface Props {
    data: CVData;
    className?: string;
    label?: string;
}

export function DownloadCVButton({
    data,
    className = "",
    label = "Download CV (PDF)",
}: Props) {
    return (
        <div className={`cv-download-wrapper ${className}`}>
            <a
                href="/images/profile/Adam_Wondale_CV.pdf"
                download={`${data.personal.name.replace(/\s+/g, "_")}_CV.pdf`}
                className={`cv-download-btn`}
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
                <span className="cv-icon" aria-hidden="true">
                    ↓
                </span>
                <span>{label}</span>
            </a>
        </div>
    );
}
