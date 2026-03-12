"use client";
// ─────────────────────────────────────────────────────────────────────────────
//  DownloadCVButton — lazy PDF generation + download
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
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
    const [state, setState] = useState<"idle" | "loading" | "done">("idle");

    async function handleDownload() {
        if (state === "loading") return;
        setState("loading");

        try {
            // Lazy-load the heavy PDF libraries so they don't hit the main bundle
            const [{ pdf }, { CVPDF }] = await Promise.all([
                import("@react-pdf/renderer"),
                import("./CVPDF"),
            ]);

            // Clone data to avoid mutating original state
            const pdfData = JSON.parse(JSON.stringify(data)) as CVData;

            // Fetch image and convert to base64 if it exists, to prevent react-pdf CORS/path issues
            if (pdfData.personal.photoPath && !pdfData.personal.photoPath.startsWith("data:")) {
                try {
                    let imgUrl = pdfData.personal.photoPath;
                    if (!imgUrl.startsWith("http")) {
                        imgUrl = window.location.origin + (imgUrl.startsWith("/") ? "" : "/") + imgUrl;
                    }
                    const res = await fetch(imgUrl, { cache: "no-store" });

                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status} when fetching photo`);
                    }

                    const blob = await res.blob();
                    const reader = new FileReader();
                    const base64data = await new Promise<string>((resolve, reject) => {
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                    pdfData.personal.photoPath = base64data;
                } catch (imgErr) {
                    console.warn("Failed to load CV profile photo for PDF", imgErr);
                    // Fallback to initials
                    pdfData.personal.photoPath = "";
                }
            }

            const blob = await pdf(<CVPDF data={pdfData} />).toBlob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${data.personal.name.replace(/\s+/g, "_")}_CV.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setState("done");
            setTimeout(() => setState("idle"), 3000);
        } catch (err) {
            console.error("PDF generation failed:", err);
            setState("idle");
        }
    }

    return (
        <div className={`cv-download-wrapper ${className}`}>
            <button
                onClick={handleDownload}
                disabled={state === "loading"}
                className={`cv-download-btn ${state === "done" ? "cv-download-btn--done" : ""}`}
                aria-label={
                    state === "loading"
                        ? "Generating PDF…"
                        : state === "done"
                            ? "Downloaded!"
                            : label
                }
            >
                {state === "loading" && (
                    <span className="cv-spinner" aria-hidden="true" />
                )}
                {state === "done" && (
                    <span className="cv-check" aria-hidden="true">
                        ✓
                    </span>
                )}
                {state === "idle" && (
                    <span className="cv-icon" aria-hidden="true">
                        ↓
                    </span>
                )}
                <span>
                    {state === "loading"
                        ? "Generating…"
                        : state === "done"
                            ? "Downloaded!"
                            : label}
                </span>
            </button>

            {state === "done" && (
                <div className="cv-toast" role="status" aria-live="polite">
                    ✓ CV downloaded successfully!
                </div>
            )}
        </div>
    );
}
