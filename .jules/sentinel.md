# Sentinel Security Journal 🛡️

Your daily journal for critical security learnings in this codebase.

## 2026-07-22 - Server-Side Input and URL Protocol Validation
**Vulnerability:** Next.js Server Actions allowed arbitrary user input without server-side validation. This permitted bypassing client-side validation schema (React Hook Form + Zod) to execute Stored XSS via `javascript:` URIs in link fields (`liveUrl`, `githubUrl`) or arbitrary file uploads (HTML/SVG executable files) in image file fields.
**Learning:** Next.js Server Actions are public HTTP POST endpoints. Relying solely on client-side Zod validation exposes the application to severe injection, XSS, and remote script execution risks if the endpoints are targeted directly.
**Prevention:** Validate all inputs server-side within the Server Actions directly, including URL protocol white-listing (`http:`/`https:`) and checking uploaded file MIME types against a safe, restrictive list (`image/jpeg`, `image/png`, `image/gif`, `image/webp`).
