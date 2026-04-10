"use client";

import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaXTwitter,
  FaGlobe,
} from "react-icons/fa6";

function extractSocials(text: string = "") {
  const socials: Record<string, string> = {};
  const regexMap: Record<string, RegExp> = {
    linkedin:  /#linkedin\s+(https?:\/\/[^\s]+)/i,
    github:    /#github\s+(https?:\/\/[^\s]+)/i,
    instagram: /#instagram\s+(https?:\/\/[^\s]+)/i,
    facebook:  /#facebook\s+(https?:\/\/[^\s]+)/i,
    whatsapp:  /#whatsapp\s+(https?:\/\/[^\s]+)/i,
    x:         /#(x|twitter)\s+(https?:\/\/[^\s]+)/i,
    website:   /#website\s+(https?:\/\/[^\s]+)/i,
  };
  for (const key in regexMap) {
    const match = text.match(regexMap[key]);
    if (match) socials[key] = key === "x" ? match[2] : match[1];
  }
  return socials;
}

const socialConfig = [
  { key: "linkedin",  Icon: FaLinkedin,  label: "LinkedIn"    },
  { key: "github",    Icon: FaGithub,    label: "GitHub"      },
  { key: "instagram", Icon: FaInstagram, label: "Instagram"   },
  { key: "facebook",  Icon: FaFacebook,  label: "Facebook"    },
  { key: "whatsapp",  Icon: FaWhatsapp,  label: "WhatsApp"    },
  { key: "x",         Icon: FaXTwitter,  label: "X / Twitter" },
  { key: "website",   Icon: FaGlobe,     label: "Website"     },
];

export default function MemberProfile({ member }: { member: any }) {
  const s = extractSocials(member?.bio);
  const cleanBio = member?.bio
    ?.replace(/#(instagram|linkedin|github|facebook|whatsapp|x|twitter|website)\s+https?:\/\/[^\s]+/gi, "")
    .trim();

  const activeSocials = socialConfig.filter(({ key }) => s[key]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .mp-root {
          --gold: #f4b518;
          --gold-dim: rgba(244,181,24,0.55);
          --gold-light: rgba(244,181,24,0.10);
          --gold-glow: rgba(244,181,24,0.40);
          --bg: #060606;
          --card: #0e0e0e;
          --card2: #161616;
          --border: rgba(244,181,24,0.15);
          --text: #f0ece2;
          --muted: #6e6b63;
          --muted2: #3a3830;
          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 16px 72px;
          color: var(--text);
          position: relative;
          overflow-x: hidden;
        }

        .mp-ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .mp-ambient::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%; transform: translateX(-50%);
          width: 700px; height: 500px;
          background: radial-gradient(ellipse, rgba(244,181,24,0.07) 0%, transparent 65%);
        }
        .mp-ambient::after {
          content: '';
          position: absolute;
          bottom: -150px; right: -150px;
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(244,181,24,0.05) 0%, transparent 65%);
        }

        .mp-layout {
          position: relative; z-index: 1;
          width: 100%; max-width: 900px;
          display: grid;
          grid-template-columns: 320px 1fr;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.025) inset, 0 48px 100px rgba(0,0,0,0.75), 0 0 160px rgba(244,181,24,0.04);
          overflow: hidden;
        }

        .mp-left {
          background:
            repeating-linear-gradient(-55deg, transparent 0, transparent 18px, rgba(244,181,24,0.025) 18px, rgba(244,181,24,0.025) 19px),
            linear-gradient(180deg, #130f00 0%, #0a0a0a 60%, #0d0b00 100%);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 48px 28px 40px;
          position: relative;
          overflow: hidden;
        }
        .mp-left::before {
          content: '';
          position: absolute;
          top: 80px; bottom: 80px; left: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, var(--gold-dim), transparent);
        }

        .mp-left-glow {
          position: absolute;
          top: 20px; left: 50%; transform: translateX(-50%);
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244,181,24,0.18) 0%, transparent 65%);
          pointer-events: none;
        }

        .mp-avatar-wrap {
          position: relative;
          width: 185px; height: 185px;
          flex-shrink: 0;
        }
        .mp-avatar-wrap::before {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px dashed rgba(244,181,24,0.3);
          animation: mp-spin 18s linear infinite;
        }
        .mp-avatar-wrap::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 1px solid rgba(244,181,24,0.12);
        }
        .mp-avatar-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(145deg, var(--gold), #9a5f00);
          box-shadow: 0 0 0 5px var(--card), 0 0 50px rgba(244,181,24,0.5);
        }
        .mp-avatar {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        @keyframes mp-spin { to { transform: rotate(360deg); } }

        .mp-name-block { margin-top: 26px; text-align: center; }
        .mp-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(20px, 3.5vw, 27px);
          font-weight: 800;
          letter-spacing: -0.3px;
          line-height: 1.1;
          color: var(--text);
        }
        .mp-role-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          background: var(--gold-light);
          border: 1px solid rgba(244,181,24,0.28);
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 11.5px; font-weight: 500;
          color: var(--gold);
        }
        .mp-role-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 6px var(--gold);
          animation: mp-pulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes mp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.6); }
        }

        .mp-divider { width: 100%; display: flex; align-items: center; gap: 10px; margin: 28px 0; }
        .mp-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(244,181,24,0.2), transparent);
        }
        .mp-divider-gem {
          width: 7px; height: 7px;
          background: var(--gold);
          transform: rotate(45deg);
          box-shadow: 0 0 8px var(--gold-glow);
          flex-shrink: 0;
        }

        .mp-soc-stack { display: flex; flex-direction: column; gap: 8px; width: 100%; }
        .mp-soc-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(244,181,24,0.08);
          color: var(--muted);
          font-size: 13px; font-weight: 500;
          text-decoration: none;
          transition: all 0.18s ease;
        }
        .mp-soc-item svg { font-size: 16px; flex-shrink: 0; }
        .mp-soc-item:hover {
          background: var(--gold-light);
          border-color: rgba(244,181,24,0.4);
          color: var(--gold);
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(244,181,24,0.12);
        }

        .mp-right { display: flex; flex-direction: column; overflow: hidden; }
        .mp-top-bar {
          height: 4px;
          background: linear-gradient(90deg, var(--gold), rgba(244,181,24,0.0));
          flex-shrink: 0;
        }
        .mp-right-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 40px 36px 40px;
        }

        .mp-label {
          font-size: 9.5px; font-weight: 600;
          letter-spacing: 3.5px; text-transform: uppercase;
          color: var(--gold); opacity: 0.5;
          margin-bottom: 14px;
          display: flex; align-items: center; gap: 10px;
        }
        .mp-label::after {
          content: '';
          flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(244,181,24,0.15), transparent);
        }

        .mp-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 5vw, 50px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -1px;
          color: var(--text);
          margin-bottom: 6px;
        }

        .mp-bio-section { margin-top: 32px; }
        .mp-bio {
          font-size: 15px;
          line-height: 1.85;
          color: var(--muted);
          font-weight: 300;
          white-space: pre-line;
        }

        .mp-tag-strip {
          margin-top: auto;
          padding-top: 36px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .mp-tag {
          font-size: 10px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: var(--muted2);
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid var(--muted2);
        }
        .mp-tag-gold {
          color: rgba(244,181,24,0.4);
          border-color: rgba(244,181,24,0.18);
          background: var(--gold-light);
        }

        .mp-corner-tr {
          position: absolute; top: -1px; right: -1px;
          width: 60px; height: 60px;
          border-top: 2px solid rgba(244,181,24,0.35);
          border-right: 2px solid rgba(244,181,24,0.35);
          border-radius: 0 24px 0 0;
          pointer-events: none;
        }
        .mp-corner-bl {
          position: absolute; bottom: -1px; left: -1px;
          width: 44px; height: 44px;
          border-bottom: 2px solid rgba(244,181,24,0.18);
          border-left: 2px solid rgba(244,181,24,0.18);
          border-radius: 0 0 0 24px;
          pointer-events: none;
        }

        @media (max-width: 660px) {
          .mp-root { padding: 28px 10px 56px; }
          .mp-layout { grid-template-columns: 1fr; }
          .mp-left {
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding: 36px 20px 32px;
          }
          .mp-avatar-wrap { width: 160px; height: 160px; }
          .mp-soc-stack { flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .mp-soc-item { padding: 10px 12px; transform: none !important; }
          .mp-soc-item span { display: none; }
          .mp-right-inner { padding: 28px 20px 32px; }
          .mp-headline { font-size: clamp(28px, 8vw, 40px); }
        }
      `}</style>

      <div className="mp-root -mt-4">
        <div className="mp-ambient" />
        <div className="mp-layout" style={{ position: "relative" }}>
          <div className="mp-corner-tr" />
          <div className="mp-corner-bl" />

          {/* LEFT PANEL */}
          <div className="mp-left">
            <div className="mp-left-glow" />
            <div className="mp-avatar-wrap">
              <div className="mp-avatar-ring">
                <img
                  src={member?.image || "https://api.dicebear.com/7.x/lorelei/svg?seed=member"}
                  alt={member?.name || "Member"}
                  className="mp-avatar"
                />
              </div>
            </div>
            <div className="mp-name-block">
              <div className="mp-name">{member?.name || "Member Name"}</div>
              {member?.role && (
                <div className="mp-role-pill">
                  <span className="mp-role-dot" />
                  {member.role}
                </div>
              )}
            </div>
            <div className="mp-divider">
              <div className="mp-divider-line" />
              <div className="mp-divider-gem" />
              <div className="mp-divider-line" />
            </div>
            {activeSocials.length > 0 && (
              <div className="mp-soc-stack">
                {activeSocials.map(({ key, Icon, label }) => (
                  <a key={key} href={s[key]} target="_blank" rel="noopener noreferrer" className="mp-soc-item" aria-label={label}>
                    <Icon />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="mp-right">
            <div className="mp-top-bar" />
            <div className="mp-right-inner">
              <div className="mp-label">Member Profile</div>
              <div className="mp-headline">
                {member?.name
                  ? (() => {
                      const words = member.name.split(" ");
                      return (
                        <>
                          <span style={{ color: "var(--gold)" }}>{words[0]}</span>
                          {words.length > 1 && (
                            <><br /><span style={{ color: "var(--text)" }}>{words.slice(1).join(" ")}</span></>
                          )}
                        </>
                      );
                    })()
                  : <><span style={{ color: "var(--gold)" }}>Member</span><br /><span>Name</span></>
                }
              </div>
              {cleanBio && (
                <div className="mp-bio-section">
                  <div className="mp-label">About</div>
                  <p className="mp-bio">{cleanBio}</p>
                </div>
              )}
              <div className="mp-tag-strip">
                <span className="mp-tag mp-tag-gold">✦ Member</span>
                {/* {member?.role && <span className="mp-tag">{member.role}</span>} */}
                {activeSocials.length > 0 && <span className="mp-tag">{activeSocials.length} Links</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}