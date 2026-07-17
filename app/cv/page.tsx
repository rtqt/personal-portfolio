"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  /cv  — CV Builder admin page
//  Navigate to http://localhost:3000/cv to manage your CV content
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { CVBuilder } from "../_components/CVBuilder";
import { DownloadCVButton } from "../_components/DownloadCVButton";
import { defaultCVData } from "@/lib/cv-data";
import type { CVData } from "@/lib/cv-data";
import Link from "next/link";

export default function CVPage() {
    const [cvData, setCvData] = useState<CVData>(defaultCVData);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("cv_builder_data");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Merge default data keys in case new properties were added in schemas
                const merged = {
                    ...defaultCVData,
                    ...parsed,
                    personal: { ...defaultCVData.personal, ...(parsed.personal || {}) },
                };
                setCvData(merged);
            } catch (e) {
                console.error("Failed to parse stored CV data:", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    const handleUpdate = (nextData: CVData) => {
        setCvData(nextData);
        localStorage.setItem("cv_builder_data", JSON.stringify(nextData));
    };

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
                {isLoaded ? (
                    <CVBuilder initialData={cvData} onUpdate={handleUpdate} />
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
                        <span className="cv-spinner" style={{ width: 28, height: 28 }} />
                    </div>
                )}
            </main>
        </div>
    );
}
