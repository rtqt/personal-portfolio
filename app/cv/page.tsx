"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  /cv  — CV Builder admin page
//  Navigate to http://localhost:3000/cv to manage your CV content
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { CVBuilder } from "../_components/CVBuilder";
import { DownloadCVButton } from "../_components/DownloadCVButton";
import { defaultCVData } from "@/lib/cv-data";
import type { CVData } from "@/lib/cv-data";
import Link from "next/link";

export default function CVPage() {
    const [cvData, setCvData] = useState<CVData>(defaultCVData);

    return (
        <div className="cv-page">
            {/* Top bar */}
            <header className="cv-page-header">
                <div className="cv-page-header__inner container">
                    <Link href="/" className="cv-back-link">
                        ← Portfolio
                    </Link>
                    <h1 className="cv-page-title">CV Builder</h1>
                    <DownloadCVButton data={cvData} label="Download PDF" />
                </div>
            </header>

            {/* Builder */}
            <main className="cv-page-main container">
                <p className="cv-page-desc">
                    Edit your CV below. Changes are reflected instantly in the next PDF
                    you download — no page refresh needed.
                </p>
                <CVBuilder initialData={cvData} onUpdate={setCvData} />
            </main>
        </div>
    );
}
