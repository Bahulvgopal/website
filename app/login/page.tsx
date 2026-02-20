"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .lp-root {
          --gold: #f4b518;
          --gold-dim: rgba(244,181,24,0.12);
          --gold-glow: rgba(244,181,24,0.4);
          --bg: #080808;
          --card: #0f0f0f;
          --card2: #181818;
          --border: rgba(244,181,24,0.18);
          --text: #f5f2eb;
          --muted: #6b6860;
          --error: #ff5a5a;

          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
          color: var(--text);
        }

        /* bg blobs */
        .lp-blob1 {
          position: fixed; top: -160px; left: -160px;
          width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(244,181,24,0.1) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        .lp-blob2 {
          position: fixed; bottom: -120px; right: -120px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(244,181,24,0.07) 0%, transparent 68%);
          pointer-events: none; z-index: 0;
        }
        /* subtle grid */
        .lp-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(244,181,24,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,181,24,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* card */
        .lp-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 440px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 48px 40px 44px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 32px 80px rgba(0,0,0,0.7),
            0 0 100px rgba(244,181,24,0.04);
        }

        /* corner brackets */
        .lp-tr {
          position: absolute; top: -1px; right: -1px;
          width: 60px; height: 60px;
          border-top: 2px solid rgba(244,181,24,0.45);
          border-right: 2px solid rgba(244,181,24,0.45);
          border-radius: 0 24px 0 0;
          pointer-events: none;
        }
        .lp-bl {
          position: absolute; bottom: -1px; left: -1px;
          width: 44px; height: 44px;
          border-bottom: 2px solid rgba(244,181,24,0.2);
          border-left: 2px solid rgba(244,181,24,0.2);
          border-radius: 0 0 0 24px;
          pointer-events: none;
        }

        /* icon */
        .lp-icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: var(--gold-dim);
          border: 1px solid rgba(244,181,24,0.28);
          display: grid; place-items: center;
          margin-bottom: 28px;
          box-shadow: 0 0 20px rgba(244,181,24,0.12);
        }
        .lp-icon svg { width: 24px; height: 24px; color: var(--gold); }

        /* heading */
        .lp-title {
          font-family: 'Syne', sans-serif;
          font-size: 30px; font-weight: 800;
          line-height: 1.1; letter-spacing: -0.4px;
          margin-bottom: 6px;
        }
        .lp-sub {
          font-size: 14px; color: var(--muted);
          font-weight: 400; margin-bottom: 36px;
        }

        /* fields */
        .lp-field {
          display: flex; flex-direction: column;
          gap: 6px; margin-bottom: 16px;
        }
        .lp-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--gold); opacity: 0.6;
        }
        .lp-input-wrap { position: relative; }
        .lp-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          width: 16px; height: 16px; color: var(--muted);
          pointer-events: none; flex-shrink: 0;
        }
        .lp-input {
          width: 100%; padding: 12px 14px 12px 40px;
          background: var(--card2);
          border: 1px solid rgba(244,181,24,0.12);
          border-radius: 12px;
          color: var(--text);
          font-family: 'Outfit', sans-serif;
          font-size: 14.5px; font-weight: 400;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          box-sizing: border-box;
        }
        .lp-input::placeholder { color: var(--muted); }
        .lp-input:focus {
          border-color: rgba(244,181,24,0.45);
          box-shadow: 0 0 0 3px rgba(244,181,24,0.08);
        }

        /* error */
        .lp-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,90,90,0.08);
          border: 1px solid rgba(255,90,90,0.25);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px; color: var(--error);
          margin-bottom: 20px;
        }
        .lp-error svg { width: 15px; height: 15px; flex-shrink: 0; }

        /* divider */
        .lp-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 28px 0 24px;
        }
        .lp-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(244,181,24,0.15), transparent);
        }
        .lp-divider-dot {
          width: 6px; height: 6px;
          background: var(--gold); opacity: 0.5;
          transform: rotate(45deg); flex-shrink: 0;
        }

        /* button */
        .lp-btn {
          width: 100%; padding: 13px;
          border-radius: 12px;
          border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 600;
          letter-spacing: 0.2px;
          background: linear-gradient(135deg, var(--gold) 0%, #d9960a 100%);
          color: #000;
          transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 4px 24px rgba(244,181,24,0.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .lp-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(244,181,24,0.4);
        }
        .lp-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* spinner */
        .lp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: #000;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }
        @keyframes lp-spin { to { transform: rotate(360deg); } }

        /* footer */
        .lp-footer {
          margin-top: 24px; text-align: center;
          font-size: 12px; color: var(--muted);
        }

        @media (max-width: 480px) {
          .lp-card { padding: 36px 24px 36px; }
          .lp-title { font-size: 26px; }
        }
      `}</style>

      <div className="lp-root -mt-4">
        <div className="lp-blob1" />
        <div className="lp-blob2" />
        <div className="lp-grid" />

        <div className="lp-card">
          <div className="lp-tr" />
          <div className="lp-bl" />

          {/* Lock icon */}
          <div className="lp-icon">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 10.5V7a4.5 4.5 0 00-9 0v3.5M5 10.5h14a1 1 0 011 1V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-8.5a1 1 0 011-1z" />
            </svg>
          </div>

          <div className="lp-title">Admin Login</div>
          <div className="lp-sub">Restricted access — authorised personnel only</div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="lp-field">
              <label className="lp-label">Email</label>
              <div className="lp-input-wrap">
                <svg className="lp-input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                </svg>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  required
                  className="lp-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="lp-field">
              <label className="lp-label">Password</label>
              <div className="lp-input-wrap">
                <svg className="lp-input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="lp-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="lp-error">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            <div className="lp-divider">
              <div className="lp-divider-line" />
              <div className="lp-divider-dot" />
              <div className="lp-divider-line" />
            </div>

            <button type="submit" className="lp-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="lp-spinner" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="lp-footer">
            Secured · Admin Portal
          </div>
        </div>
      </div>
    </>
  );
}