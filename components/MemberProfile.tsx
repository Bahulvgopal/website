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

/* ─── extract socials from bio ─── */
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
  { key: "linkedin",  Icon: FaLinkedin,  label: "LinkedIn"   },
  { key: "github",    Icon: FaGithub,    label: "GitHub"     },
  { key: "instagram", Icon: FaInstagram, label: "Instagram"  },
  { key: "facebook",  Icon: FaFacebook,  label: "Facebook"   },
  { key: "whatsapp",  Icon: FaWhatsapp,  label: "WhatsApp"   },
  { key: "x",         Icon: FaXTwitter,  label: "X / Twitter"},
  { key: "website",   Icon: FaGlobe,     label: "Website"    },
];

export default function MemberProfile({ member }: { member: any }) {
  const s = extractSocials(member?.bio);
  const cleanBio = member?.bio
    ?.replace(
      /#(instagram|linkedin|github|facebook|whatsapp|x|twitter|website)\s+https?:\/\/[^\s]+/gi,
      ""
    )
    .trim();

  const activeSocials = socialConfig.filter(({ key }) => s[key]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .mp-page {
          --gold: #f4b518;
          --gold-light: rgba(244,181,24,0.13);
          --gold-glow: rgba(244,181,24,0.45);
          --bg: #080808;
          --card: #101010;
          --card2: #181818;
          --border: rgba(244,181,24,0.2);
          --text: #f5f2eb;
          --muted: #7a7870;

          font-family: 'Outfit', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 60px 16px 80px;
          position: relative;
          overflow-x: hidden;
          color: var(--text);
        }

        /* ambient blobs */
        .mp-blob1, .mp-blob2 {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .mp-blob1 {
          top: -140px; left: -140px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(244,181,24,0.11) 0%, transparent 68%);
        }
        .mp-blob2 {
          bottom: -100px; right: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(244,181,24,0.07) 0%, transparent 68%);
        }

        /* card */
        .mp-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 780px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 28px;
          /* NO overflow:hidden — lets avatar float freely */
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 40px 80px rgba(0,0,0,0.7),
            0 0 120px rgba(244,181,24,0.05);
        }

        /* corner brackets */
        .mp-corner-tr {
          position: absolute;
          top: -1px; right: -1px;
          width: 72px; height: 72px;
          border-top: 2px solid rgba(244,181,24,0.4);
          border-right: 2px solid rgba(244,181,24,0.4);
          border-radius: 0 28px 0 0;
          pointer-events: none;
        }
        .mp-corner-bl {
          position: absolute;
          bottom: -1px; left: -1px;
          width: 52px; height: 52px;
          border-bottom: 2px solid rgba(244,181,24,0.2);
          border-left: 2px solid rgba(244,181,24,0.2);
          border-radius: 0 0 0 28px;
          pointer-events: none;
        }

        /* stripe — keeps border-radius, no overflow hidden */
        .mp-stripe {
          width: 100%;
          height: 150px;
          border-radius: 28px 28px 0 0;
          position: relative;
          overflow: hidden;         /* clip only inside stripe */
          background:
            repeating-linear-gradient(
              -48deg,
              transparent 0px, transparent 20px,
              rgba(244,181,24,0.03) 20px, rgba(244,181,24,0.03) 21px
            ),
            linear-gradient(135deg, #1c1500 0%, #0d0d0d 55%, #130f00 100%);
        }
        .mp-stripe-glow {
          position: absolute;
          top: -50px; right: -50px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244,181,24,0.22) 0%, transparent 65%);
        }
        .mp-stripe-tag {
          position: absolute;
          bottom: 16px; left: 24px;
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--gold); opacity: 0.55;
        }
        .mp-stripe-tag::before {
          content: '';
          width: 18px; height: 1px;
          background: var(--gold); opacity: 0.7;
          display: block;
        }

        /* avatar zone — sits BELOW stripe, pulls up with negative margin */
        .mp-avatar-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -64px;
          padding: 0 28px;
          position: relative;
          z-index: 10;  /* above stripe */
        }

        .mp-avatar-outer {
          width: 128px; height: 128px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(145deg, var(--gold) 0%, #c87d00 100%);
          box-shadow:
            0 0 0 5px var(--card),
            0 0 0 6px rgba(244,181,24,0.15),
            0 8px 40px rgba(244,181,24,0.45);
          position: relative;
          flex-shrink: 0;
        }
        .mp-avatar-outer::after {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1px dashed rgba(244,181,24,0.25);
          animation: mp-spin 20s linear infinite;
        }
        @keyframes mp-spin { to { transform: rotate(360deg); } }

        .mp-avatar {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        /* name & role */
        .mp-identity {
          margin-top: 18px;
          text-align: center;
          padding: 0 12px;
        }
        .mp-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 5.5vw, 46px);
          font-weight: 800;
          line-height: 1.05;
          color: var(--text);
          letter-spacing: -0.5px;
        }
        .mp-role-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 10px;
          background: var(--gold-light);
          border: 1px solid rgba(244,181,24,0.3);
          border-radius: 999px;
          padding: 5px 16px;
          font-size: 13px; font-weight: 500;
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
          50% { opacity: 0.4; transform: scale(0.65); }
        }

        /* content area */
        .mp-content {
          padding: 32px 36px 44px;
        }

        /* divider */
        .mp-rule {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 30px;
        }
        .mp-rule-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(244,181,24,0.18), transparent);
        }
        .mp-rule-diamond {
          width: 8px; height: 8px;
          background: var(--gold);
          transform: rotate(45deg);
          box-shadow: 0 0 10px var(--gold-glow);
          flex-shrink: 0;
        }

        /* bio */
        .mp-section-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--gold); opacity: 0.5;
          margin-bottom: 10px;
        }
        .mp-bio {
          font-size: 15.5px;
          line-height: 1.8;
          color: var(--muted);
          font-weight: 300;
          white-space: pre-line;
        }

        /* socials */
        .mp-socials-wrap { margin-top: 36px; }
        .mp-socials-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }
        .mp-soc {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 18px;
          border-radius: 12px;
          background: var(--card2);
          border: 1px solid rgba(244,181,24,0.12);
          color: var(--muted);
          font-size: 13.5px; font-weight: 500;
          text-decoration: none;
          transition: all 0.18s ease;
        }
        .mp-soc svg { font-size: 17px; flex-shrink: 0; }
        .mp-soc:hover {
          background: var(--gold-light);
          border-color: var(--gold);
          color: var(--gold);
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(244,181,24,0.18);
        }

        /* mobile */
        @media (max-width: 560px) {
          .mp-page { padding: 40px 10px 60px; }
          .mp-stripe { height: 110px; }
          .mp-avatar-outer { width: 106px; height: 106px; }
          .mp-avatar-zone { margin-top: -53px; }
          .mp-content { padding: 24px 18px 34px; }
          .mp-soc span { display: none; }
          .mp-soc { padding: 11px 13px; }
          .mp-soc svg { font-size: 20px; }
        }
      `}</style>

      <div className="mp-page -mt-4">
        <div className="mp-blob1" />
        <div className="mp-blob2" />

        <div className="mp-card">
          <div className="mp-corner-tr" />
          <div className="mp-corner-bl" />

          {/* Header stripe */}
          <div className="mp-stripe">
            <div className="mp-stripe-glow" />
            
          </div>

          {/* Avatar floats below stripe */}
          <div className="mp-avatar-zone">
            <div className="mp-avatar-outer">
              <img
                src={member?.image || "https://api.dicebear.com/7.x/lorelei/svg?seed=member"}
                alt={member?.name || "Member"}
                className="mp-avatar"
              />
            </div>

            <div className="mp-identity">
              <div className="mp-name">{member?.name || "Member Name"}</div>
              {member?.role && (
                <div className="mp-role-pill">
                  <span className="mp-role-dot" />
                  {member.role}
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="mp-content">
            <div className="mp-rule">
              <div className="mp-rule-line" />
              <div className="mp-rule-diamond" />
              <div className="mp-rule-line" />
            </div>

            {cleanBio && (
              <>
                <div className="mp-section-label">About</div>
                <p className="mp-bio">{cleanBio}</p>
              </>
            )}

            {activeSocials.length > 0 && (
              <div className="mp-socials-wrap">
                <div className="mp-section-label">Connect</div>
                <div className="mp-socials-grid">
                  {activeSocials.map(({ key, Icon, label }) => (
                    <a
                      key={key}
                      href={s[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mp-soc"
                      aria-label={label}
                    >
                      <Icon />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}