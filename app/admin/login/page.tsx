"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../auth-actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/add";
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("from", from);

    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
    // On success, loginAction redirects — no need to handle here
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,220,150,0.12)",
          borderRadius: "20px",
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "rgba(255,220,150,0.1)",
              border: "1px solid rgba(255,220,150,0.25)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              margin: "0 auto 1rem",
            }}
          >
            🔐
          </div>
          <h1 className="section-title" style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>
            Admin <span className="accent">Login</span>
          </h1>
          <p style={{ color: "#a09080", fontSize: "0.9rem" }}>
            Enter your admin password to continue.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              color: "#ef4444",
              padding: "0.85rem 1rem",
              borderRadius: "10px",
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ color: "#a09080", fontSize: "0.85rem", fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="••••••••"
              style={{
                padding: "0.85rem 1rem",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.05)",
                color: "#faf5eb",
                border: "1px solid rgba(255,220,150,0.16)",
                outline: "none",
                fontSize: "1rem",
                letterSpacing: "0.2em",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
            style={{
              marginTop: "0.5rem",
              width: "100%",
              justifyContent: "center",
              fontSize: "1rem",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
