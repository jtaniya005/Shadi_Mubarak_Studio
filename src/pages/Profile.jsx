import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Arch from "../components/Arch";
import Icon from "../components/Icons";
import Stars from "../components/Stars";
import { VENDORS } from "../data/mockData";
import { inr, newId } from "../utils/helpers";

function Profile() {
  const { id } = useParams();
  const { s, set } = useStore();
  const v = VENDORS.find((x) => x.id === +id);
  const [pk, setPk] = useState(0);
  const [note, setNote] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (v) {
      set((o) => ({
        views: { ...o.views, [v.cat]: (o.views[v.cat] || 0) + 1 }
      }));
    }
  }, [id]); // eslint-disable-line

  if (!v) {
    return (
      <div className="empty">
        <h2>Vendor Not Found</h2>
        <p>The vendor requested does not exist or has been relocated.</p>
        <Link to="/vendors" className="btn">Back to Vendor Directory</Link>
      </div>
    );
  }

  const isSaved = s.saved.includes(v.id);

  const submit = (e) => {
    e.preventDefault();
    set((o) => ({
      quotes: [
        ...o.quotes,
        {
          id: newId(),
          vid: v.id,
          pkg: v.pk[pk][0],
          note,
          date: new Date().toISOString()
        }
      ]
    }));
    setNote("");
    setOk(true);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <Link to="/vendors" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
          ← Back to Vendor Explorer
        </Link>
        <span style={{ background: "rgba(214, 150, 35, 0.15)", color: "var(--plum-deep)", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
          VENDOR PROFILES & QUOTES
        </span>
      </div>

      <div className="profile">
        <div className="profile-hero-media">
          {v.image ? (
            <img src={v.image} alt={v.name} className="profile-hero-img" />
          ) : (
            <Arch tone={["plum", "teal", "rose", "gold"][v.id % 4]} className="pArch">
              <span style={{ fontSize: "2rem", marginBottom: "8px" }}>
                {v.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <b style={{ fontSize: "1.4rem" }}>{v.name}</b>
            </Arch>
          )}
          <div className="profile-hero-overlay">
            <span className="profile-hero-cat">{v.cat} · {v.city}</span>
            <span className="profile-hero-exp">{v.exp || "10+ yrs"} Experience</span>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <small className="muted" style={{ textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
                  {v.cat} · {v.city}
                </small>
                {v.verified && (
                  <span className="verified-tag" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Icon name="shield" size={12} color="var(--emerald)" />
                    ShadiMubarak Verified™
                  </span>
                )}
              </div>
              <h1 style={{ margin: "4px 0 8px" }}>{v.name}</h1>
              {v.tagline && <p className="muted" style={{ fontSize: "1.05rem", margin: "0 0 10px" }}>{v.tagline}</p>}
            </div>

            <button
              className={`btn ghost ${isSaved ? "on" : ""}`}
              onClick={() => set((o) => ({ saved: isSaved ? o.saved.filter((x) => x !== v.id) : [...o.saved, v.id] }))}
              aria-pressed={isSaved}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Icon name="heart" size={14} color={isSaved ? "var(--rose)" : "currentColor"} />
              <span>{isSaved ? "Saved in Shortlist" : "Save to Shortlist"}</span>
            </button>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", margin: "8px 0 16px" }}>
            <Stars r={v.rating} />
            <span className="muted" style={{ fontSize: "0.9rem" }}>· High Guna & Theme Alignment with <b>{s.theme}</b></span>
          </div>

          {/* ShadiMubarak Verified Trust Box */}
          {v.verified && (
            <div className="verified-audit-box">
              <b style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="shield" size={16} color="var(--gold-rich)" />
                <span>ShadiMubarak Verified™ Guarantee & Audited Credentials</span>
              </b>
              <div className="verified-audit-list">
                {v.verifiedPoints?.map((p, idx) => (
                  <div key={idx} className="audit-item" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="check" size={12} color="var(--emerald)" />
                    <span>{p}</span>
                  </div>
                ))}
                <div className="audit-item" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="check" size={12} color="var(--emerald)" />
                  <span>Direct Booking Protection</span>
                </div>
              </div>
            </div>
          )}

          <p style={{ margin: "16px 0 8px", fontSize: "0.95rem" }}>
            <b>Themes & Aesthetics:</b> {v.themes.join(", ")}.
          </p>

          <h3 style={{ marginTop: "24px" }}>Available Packages & Service Tiers</h3>
          <div className="pkgs" role="radiogroup" aria-label="Packages">
            {v.pk.map((p, i) => (
              <button
                key={p[0]}
                role="radio"
                aria-checked={pk === i}
                className={`pkg ${pk === i ? "on" : ""}`}
                onClick={() => setPk(i)}
              >
                <b>{p[0]}</b>
                <span>{v.cat === "Catering" ? `₹${p[1]}/plate` : inr(p[1])}</span>
                <small>{p[2]}</small>
              </button>
            ))}
          </div>

          {/* Request Quote Card */}
          <form onSubmit={submit} className="quote">
            <h3 style={{ margin: 0 }}>Request Direct Quotation</h3>
            <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
              Selected Package: <b>{v.pk[pk][0]}</b> ({v.cat === "Catering" ? `₹${v.pk[pk][1]}/plate` : inr(v.pk[pk][1])}). Direct studio response within 4 hours.
            </p>
            <textarea
              required
              placeholder="E.g. Estimated guest count, dates of Sangeet & Saat Phere, dietary notes or special custom setup..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button className="btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon name="send" size={15} />
              <span>Submit Quote Request</span>
            </button>
            {ok && (
              <p className="ok" role="status" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="checkCircle" size={16} color="var(--emerald)" />
                <span>Quote request submitted for <b>{v.pk[pk][0]}</b>. You can track this and other bids inside the Wedding Planner!</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
