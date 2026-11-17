import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Card from "../components/Card";
import Arch from "../components/Arch";
import Icon from "../components/Icons";
import Progress from "../components/Progress";
import { THEMES, VENDORS, SHUBH_MUHURATS, REAL_STORIES } from "../data/mockData";
import { inr, days } from "../utils/helpers";

function Dashboard({ onOpenVip }) {
  const { s, set } = useStore();
  const spent = s.expenses.reduce((a, e) => a + e.amt, 0);
  const all = s.events.flatMap((e) => e.tasks);
  const done = all.filter((t) => t.done).length;
  const next = [...s.events].sort((a, b) => a.date.localeCompare(b.date))[0];

  // Dream Wedding Matcher states
  const [matchCity, setMatchCity] = useState(s.city || "Jaipur");
  const [matchVibe, setMatchVibe] = useState(s.theme || "Floral Pastel");
  const [matchGuests, setMatchGuests] = useState(250);
  const [matchBudget, setMatchBudget] = useState(1500000);

  // Match calculations
  const estVenue = Math.round(matchBudget * 0.35);
  const estCatering = Math.round(matchGuests * (matchCity === "Delhi" ? 1100 : 1400));
  const estDecor = Math.round(matchBudget * 0.18);
  const estPhoto = Math.round(matchBudget * 0.12);

  const applyMatcherToBudget = () => {
    set({
      budget: matchBudget,
      theme: matchVibe,
      city: matchCity
    });
  };

  return (
    <>
      {/* Studio Command Center Breadcrumb */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid var(--line)", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--plum)" }}>
            ← Back to Public Website
          </Link>
          <span className="muted">/</span>
          <span style={{ fontWeight: 600, color: "var(--plum-deep)", fontSize: "0.92rem" }}>
            Wedding Planning Studio
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link to="/planner" className="btn ghost" style={{ padding: "6px 14px", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="planner" size={14} />
            <span>Ceremony Planner & Seating</span>
          </Link>
          <Link to="/insights" className="btn ghost" style={{ padding: "6px 14px", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="insights" size={14} />
            <span>AI Styling Insights</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <Arch tone="plum" className="heroarch">
          <small>{s.couple}</small>
          <div className="big">{days(s.date)}</div>
          <p>days to the auspicious ceremony</p>
          <input
            type="date"
            aria-label="Wedding date"
            value={s.date}
            onChange={(e) => set({ date: e.target.value })}
          />
        </Arch>

        <div className="herotext">
          <div className="couple-header-edit">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <Icon name="sparkles" size={13} color="var(--gold)" />
              <span>Couple Names:</span>
            </span>
            <input
              type="text"
              value={s.couple}
              onChange={(e) => set({ couple: e.target.value })}
              title="Click to customize couple names"
            />
          </div>
          <div style={{ display: "inline-block", background: "rgba(214, 150, 35, 0.15)", color: "var(--plum-deep)", padding: "3px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, margin: "8px 0 6px" }}>
            WEDDING DASHBOARD
          </div>
          <h1>
            Wedding Planning &amp;<br />
            <span>Vendor Coordination Dashboard</span>
          </h1>
          <p className="muted" style={{ fontSize: "1.02rem", maxWidth: "620px", margin: "6px 0 12px" }}>
            Comprehensive wedding command center featuring live event countdown, ritual milestones, budget summary, and interactive ceremony checklists.
          </p>

          <div style={{ marginTop: "10px" }}>
            <small style={{ fontWeight: 700, color: "var(--plum)", textTransform: "uppercase", letterSpacing: "1px" }}>
              Signature Theme Vibe:
            </small>
            <div className="chips" role="radiogroup" aria-label="Wedding theme">
              {THEMES.map((t) => (
                <button
                  key={t}
                  role="radio"
                  aria-checked={s.theme === t}
                  className={`chip ${s.theme === t ? "on" : ""}`}
                  onClick={() => set({ theme: t })}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Verification Proof Strip */}
      <div className="trust-strip">
        <div className="trust-item">
          <div className="trust-icon"><Icon name="shield" size={24} color="var(--gold-rich)" /></div>
          <div className="trust-text">
            <b>ShadiMubarak Verified™</b>
            <span>Studio audited, price locked</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon"><Icon name="diya" size={24} color="var(--gold-rich)" /></div>
          <div className="trust-text">
            <b>Vedic Muhurat Engine</b>
            <span>Panchang & Nakshatra aligned</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon"><Icon name="gem" size={24} color="var(--gold-rich)" /></div>
          <div className="trust-text">
            <b>Zero Hidden Markups</b>
            <span>Direct transparent quotes</span>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon"><Icon name="crown" size={24} color="var(--gold-rich)" /></div>
          <div className="trust-text">
            <b>Vivah Concierge</b>
            <span>Dedicated director support</span>
          </div>
        </div>
      </div>

      {/* Dream Wedding Matcher & Cost Estimator */}
      <div className="matcher-box">
        <div className="matcher-header">
          <div>
            <h3 style={{ margin: 0, color: "var(--plum-deep)", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="sparkles" size={18} color="var(--gold-rich)" />
              <span>Dream Wedding Matcher & Cost Estimator</span>
            </h3>
            <p className="muted" style={{ margin: "2px 0 0", fontSize: "0.85rem" }}>
              Dial in your destination, vibe, and guest size to get instant budget benchmarks and vendor alignments.
            </p>
          </div>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--gold)", background: "var(--bg-warm)", padding: "4px 10px", borderRadius: "999px" }}>
            Instant AI Guidance
          </span>
        </div>

        <div className="matcher-fields">
          <div className="field-wrap">
            <label>Destination City</label>
            <select value={matchCity} onChange={(e) => setMatchCity(e.target.value)}>
              {["Jaipur", "Udaipur", "Delhi", "Goa", "Mumbai"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field-wrap">
            <label>Ceremony Vibe</label>
            <select value={matchVibe} onChange={(e) => setMatchVibe(e.target.value)}>
              {THEMES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field-wrap">
            <label>Guest Count</label>
            <select value={matchGuests} onChange={(e) => setMatchGuests(+e.target.value)}>
              <option value={100}>Intimate (100 guests)</option>
              <option value={250}>Classic (250 guests)</option>
              <option value={400}>Grand (400 guests)</option>
              <option value={600}>Royal (600+ guests)</option>
            </select>
          </div>
          <div className="field-wrap">
            <label>Budget Range</label>
            <select value={matchBudget} onChange={(e) => setMatchBudget(+e.target.value)}>
              <option value={1000000}>₹10 Lakhs (Curated)</option>
              <option value={1500000}>₹15 Lakhs (Balanced)</option>
              <option value={2500000}>₹25 Lakhs (Premium)</option>
              <option value={4500000}>₹45 Lakhs (Luxury Royal)</option>
            </select>
          </div>
        </div>

        <div className="matcher-result">
          <div className="matcher-result-text">
            <b>Recommended Allocation for {matchGuests} Guests in {matchCity}:</b>
            <p>
              Venue: ~{inr(estVenue)} · Catering: ~{inr(estCatering)} · Decor: ~{inr(estDecor)} · Photo & Film: ~{inr(estPhoto)}
            </p>
          </div>
          <button className="btn" onClick={applyMatcherToBudget}>
            Apply Benchmark to My Budget
          </button>
        </div>
      </div>

      {/* Shubh Muhurat Auspicious Calendar */}
      <Card
        title={
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="diya" size={20} color="var(--gold-rich)" />
            <span>Shubh Muhurat — Auspicious Vedic Wedding Dates</span>
          </span>
        }
        aside={<span className="muted" style={{ fontSize: "0.85rem" }}>Panchang 2027</span>}
        className="mb"
      >
        <p className="muted" style={{ margin: "0 0 10px", fontSize: "0.9rem" }}>
          Selected by renowned Vedic astrologers with high Guna and Nakshatra harmony. Click to sync your countdown arch directly!
        </p>
        <div className="muhurat-grid">
          {SHUBH_MUHURATS.map((m) => {
            const isCurrent = s.date === m.date;
            return (
              <div key={m.id} className={`muhurat-card ${isCurrent ? "active-date" : ""}`}>
                <span className="muhurat-badge">{m.season}</span>
                <div className="muhurat-date">
                  {new Date(m.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
                <div className="muhurat-nakshatra" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <Icon name="sparkles" size={12} color="var(--gold)" />
                  <span>{m.nakshatra}</span>
                </div>
                <div className="muhurat-time">
                  <b>{m.tithi}</b><br />
                  <span>{m.muhuratTime}</span>
                </div>
                <small style={{ color: "var(--mut)", fontSize: "0.76rem", marginBottom: "10px" }}>{m.highlight}</small>
                <button
                  className={`muhurat-btn ${isCurrent ? "selected" : ""}`}
                  onClick={() => set({ date: m.date })}
                >
                  {isCurrent ? "Active Wedding Date" : "Set as Wedding Date"}
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Core Planning Summary Grids */}
      <div className="grid g3">
        <Card title="Budget summary" aside={<Link to="/planner">Open Planner</Link>}>
          <div className="num">
            {inr(spent)} <small>of {inr(s.budget)}</small>
          </div>
          <Progress v={(spent / s.budget) * 100} />
          <p className="muted" style={{ margin: "6px 0 0" }}>
            {inr(s.budget - spent)} remaining to allocate
          </p>
        </Card>

        <Card title="Milestones & Rituals" aside={<Link to="/planner">View Timeline</Link>}>
          <div className="num">
            {done}/{all.length} <small>tasks done</small>
          </div>
          <Progress v={all.length ? (done / all.length) * 100 : 0} />
          <p className="muted" style={{ margin: "6px 0 0" }}>
            Next: {next ? `${next.name}, ${new Date(next.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : "add a ceremony"}
          </p>
        </Card>

        <Card title="Saved vendors" aside={<Link to="/vendors">Explore All</Link>}>
          <div className="num">
            {s.saved.length} <small>shortlisted</small>
          </div>
          <p className="muted" style={{ margin: "6px 0 0" }}>
            {s.saved.map((id) => VENDORS.find((v) => v.id === id)?.name).filter(Boolean).join(", ") || "Nothing shortlisted yet"}
          </p>
        </Card>
      </div>

      {/* Real Vivah Stories Showcase */}
      <Card
        title={
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="heart" size={20} color="var(--gold-rich)" />
            <span>Real Vivah Celebrations — Stories & Inspiration</span>
          </span>
        }
        aside={<span className="muted" style={{ fontSize: "0.85rem" }}>Curated by ShadiMubarak</span>}
        className="mt"
      >
        <p className="muted" style={{ margin: "0 0 14px", fontSize: "0.9rem" }}>
          Real couples who orchestrated their sacred union using ShadiMubarak verified partners and cultural ceremony tools.
        </p>
        <div className="grid g3">
          {REAL_STORIES.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-couple">
                <img src={story.image} alt={story.couple} className="story-avatar-img" />
                <div className="story-couple-meta">
                  <h4>{story.couple}</h4>
                  <span>{story.venue} · {story.date}</span>
                </div>
              </div>

              <div className="story-quote">
                "{story.quote}"
              </div>

              <div style={{ fontSize: "0.82rem", color: "var(--mut)", margin: "4px 0 10px" }}>
                <span>Guests: <b>{story.guests}</b></span> · <span>Spend: <b>{story.spendTier}</b></span>
              </div>

              <div className="story-tags">
                <span className="story-tag">{story.theme}</span>
                {story.vendorsUsed.slice(0, 2).map((vName) => (
                  <span key={vName} className="story-tag" style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                    <Icon name="check" size={11} color="var(--emerald)" /> {vName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Planning Checklist */}
      <Card title="Ceremony Checklist & Next Rituals" className="mt">
        {s.events.map((e) =>
          e.tasks.map((t) => (
            <label key={t.id} className="check">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() =>
                  set((o) => ({
                    events: o.events.map((x) =>
                      x.id === e.id
                        ? { ...x, tasks: x.tasks.map((y) => (y.id === t.id ? { ...y, done: !y.done } : y)) }
                        : x
                    )
                  }))
                }
              />
              <span className={t.done ? "strike" : ""}>{t.t}</span>
              <small className="muted">{e.name} · {t.who}</small>
            </label>
          ))
        )}
      </Card>

      {/* VIP Vivah Concierge Status / Promo Banner */}
      {s.conciergeRequested && s.conciergeDetails ? (
        <div className="vip-card-banner vip-active-banner">
          <div className="vip-banner-content">
            <div className="vip-banner-text">
              <span className="vip-active-tag">
                <span className="pulse-dot-green"></span>
                ACTIVE WHITE-GLOVE SUPPORT
              </span>
              <h3 style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0 4px" }}>
                <Icon name="crown" size={22} color="var(--gold-rich)" />
                <span>Assigned Director: {s.conciergeDetails.director?.name || "Gayatri Sen"}</span>
              </h3>
              <p style={{ margin: "2px 0 10px", fontSize: "0.92rem", color: "#e8d5e6" }}>
                {s.conciergeDetails.director?.title} · Reference: <b>{s.conciergeDetails.refCode || "#VIP-ROYAL-7892"}</b> · Priority Hotline: <b>{s.conciergeDetails.director?.phone || "+91 98200 48291"}</b>
              </p>
              <small style={{ color: "var(--gold-soft)", fontSize: "0.8rem" }}>
                ✓ Palace rate cards &amp; verified contract audits are being prepared for {s.conciergeDetails.city || "Jaipur"}.
              </small>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button className="vip-btn" onClick={onOpenVip}>
                View VIP Dossier
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="vip-card-banner">
          <div className="vip-banner-content">
            <div className="vip-banner-text">
              <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="crown" size={20} color="var(--gold-rich)" />
                <span>ShadiMubarak VIP Director Service</span>
              </h3>
              <p>
                Looking for bespoke palace sourcing, pandit alignment for rare nakshatras, or end-to-end luxury hospitality? Our Senior Wedding Directors handle every negotiation on your behalf.
              </p>
            </div>
            <button className="vip-btn" onClick={onOpenVip}>
              Schedule Private Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
