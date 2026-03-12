// lib/nanoid.ts  — lightweight ID generator (no extra dependency)
export function nanoid(): string {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
