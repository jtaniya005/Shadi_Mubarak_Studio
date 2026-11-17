import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Arch from "../components/Arch";
import Icon from "../components/Icons";
import VendorCard from "../components/VendorCard";
import { VENDORS, SHUBH_MUHURATS, REAL_STORIES, CATEGORY_CARDS, THEMES } from "../data/mockData";
import { inr, days } from "../utils/helpers";

function Home({ onOpenVip }) {
  const { s, set } = useStore();
  const navigate = useNavigate();

  // Hero Quick Search / Matcher states
  const [city, setCity] = useState(s.city || "Jaipur");
  const [cat, setCat] = useState("All");
  const [guests, setGuests] = useState(250);
  const [budgetTier, setBudgetTier] = useState(1500000);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    set({ city, budget: budgetTier });
    navigate(cat === "All" ? "/vendors" : `/vendors?cat=${cat}`);
  };

  const featuredVendors = VENDORS.filter((v) => v.verified).slice(0, 4);

  return (
    <div className="website-container">
      {/* Grand Website Hero Banner */}
      <section className="web-hero">
        <div className="web-hero-content">
          <div className="web-hero-badge">
            <span className="pulse-dot"></span>
            <Icon name="sparkles" size={14} color="var(--gold-soft)" style={{ marginRight: 6 }} />
            <span>India's Premier Royal Wedding Planning & Sourcing Studio</span>
          </div>

          <h1 className="web-hero-title">
            Where Sacred Indian Weddings<br />
            <span>Begin in Grandeur.</span>
          </h1>

          <p className="web-hero-subtitle">
            Curate your fairytale celebration with handpicked heritage palaces, verified master caterers, astrologically matched Vedic Shubh Muhurats, and stress-free ceremony timelines.
          </p>

          {/* Interactive Hero Quick-Planner & Filter Bar */}
          <form className="hero-search-card" onSubmit={handleHeroSearch}>
            <div className="search-field">
              <label>Destination City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                {["Jaipur", "Udaipur", "Delhi", "Goa", "Mumbai"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="search-field">
              <label>Service Category</label>
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="All">All Wedding Services</option>
                <option value="Venue">Palaces & Venues</option>
                <option value="Catering">Royal Catering</option>
                <option value="Decor">Bespoke Decor</option>
                <option value="Photography">Cinema & Photo</option>
              </select>
            </div>

            <div className="search-field">
              <label>Guest Capacity</label>
              <select value={guests} onChange={(e) => setGuests(+e.target.value)}>
                <option value={100}>Intimate (100 guests)</option>
                <option value={250}>Classic (250 guests)</option>
                <option value={400}>Grand (400 guests)</option>
                <option value={600}>Royal (600+ guests)</option>
              </select>
            </div>

            <div className="search-field">
              <label>Budget Tier</label>
              <select value={budgetTier} onChange={(e) => setBudgetTier(+e.target.value)}>
                <option value={1000000}>₹10 Lakhs (Curated)</option>
                <option value={1500000}>₹15 Lakhs (Balanced)</option>
                <option value={2500000}>₹25 Lakhs (Premium)</option>
                <option value={4500000}>₹45 Lakhs (Luxury Royal)</option>
              </select>
            </div>

            <div className="search-btn-wrap">
              <button type="submit" className="hero-search-btn">
                <span>Explore Partners</span>
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </form>

          {/* Studio Quick-Access Ticker */}
          <div className="couple-wedding-bar">
            <div className="couple-info">
              <b>Private Wedding Studio</b>
              <span>Personalized timelines, seating layouts &amp; live budget ledger</span>
            </div>
            <div className="countdown-pill" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon name="sparkles" size={14} color="var(--gold-soft)" />
              <span>Personalized for Your Ceremony</span>
            </div>
            <Link to="/dashboard" className="btn ghost" style={{ borderRadius: "999px", padding: "6px 14px", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span>Open Wedding Studio</span>
              <Icon name="arrowRight" size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Proof Numbers Strip */}
      <section className="trust-strip-container">
        <div className="trust-strip">
          <div className="trust-item">
            <div className="trust-icon"><Icon name="shield" size={24} color="var(--gold-rich)" /></div>
            <div className="trust-text">
              <b>ShadiMubarak Verified™</b>
              <span>Physical studio audit & locked pricing</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Icon name="diya" size={24} color="var(--gold-rich)" /></div>
            <div className="trust-text">
              <b>Vedic Muhurat Calendar</b>
              <span>Panchang & Nakshatra aligned dates</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Icon name="gem" size={24} color="var(--gold-rich)" /></div>
            <div className="trust-text">
              <b>Zero Hidden Markups</b>
              <span>Direct transparent rate cards</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><Icon name="crown" size={24} color="var(--gold-rich)" /></div>
            <div className="trust-text">
              <b>VIP Vivah Concierge</b>
              <span>Dedicated senior wedding directors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Categories */}
      <section className="section-wrap">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">CURATED PORTFOLIO</span>
            <h2 className="section-title">Explore by Wedding Categories</h2>
          </div>
          <Link to="/vendors" className="section-link">View All Categories →</Link>
        </div>

        <div className="category-grid">
          {CATEGORY_CARDS.map((c) => (
            <div key={c.cat} className="category-card" onClick={() => navigate(`/vendors?cat=${c.cat}`)}>
              <div className="cat-card-img-wrap">
                <img src={c.image} alt={c.title} className="cat-card-img" loading="lazy" />
                <div className="cat-icon-badge"><Icon name={c.icon} size={22} color="var(--gold-rich)" /></div>
              </div>
              <div className="cat-card-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="cat-price">{c.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verified Vendors Showcase */}
      <section className="section-wrap">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">HANDPICKED QUALITY</span>
            <h2 className="section-title">Featured ShadiMubarak Verified™ Partners</h2>
            <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.92rem" }}>
              Each partner is audited for on-ground performance, contract reliability, and transparent pricing.
            </p>
          </div>
          <Link to="/vendors" className="btn ghost" style={{ alignSelf: "flex-end" }}>
            Explore Full Directory ({VENDORS.length}) →
          </Link>
        </div>

        <div className="grid g4 mt">
          {featuredVendors.map((v) => (
            <VendorCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      {/* Shubh Muhurat Auspicious Calendar Showcase */}
      <section className="section-wrap">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">VEDIC ASTROLOGY</span>
            <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="diya" size={22} color="var(--gold-rich)" />
              <span>2027 Shubh Muhurat Auspicious Wedding Dates</span>
            </h2>
            <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.92rem" }}>
              Aligned with Hindu Panchang, sacred Nakshatras, and high Guna Milan. Select any date to sync your planning timeline.
            </p>
          </div>
          <Link to="/planner" className="section-link">Open Ceremony Calendar →</Link>
        </div>

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
                  <Icon name="sparkles" size={13} color="var(--gold)" />
                  <span>{m.nakshatra}</span>
                </div>
                <div className="muhurat-time">
                  <b>{m.tithi}</b><br />
                  <span>{m.muhuratTime}</span>
                </div>
                <small style={{ color: "var(--mut)", fontSize: "0.76rem", marginBottom: "12px" }}>{m.highlight}</small>
                <button
                  className={`muhurat-btn ${isCurrent ? "selected" : ""}`}
                  onClick={() => set({ date: m.date })}
                >
                  {isCurrent ? "Selected Wedding Date" : "Set as Our Wedding Date"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Couple Studio Suite Spotlight */}
      <section className="section-wrap">
        <div className="studio-spotlight-card">
          <div className="studio-spotlight-text">
            <span className="section-eyebrow" style={{ color: "var(--gold-soft)" }}>COUPLE'S COMMAND CENTER</span>
            <h2>The ShadiMubarak Wedding Studio</h2>
            <p>
              Leave the stress of chaotic notebooks behind. Our private studio puts your wedding countdown arch, cultural ceremony timelines (Roka, Haldi, Chooda, Sangeet, Saat Phere), visual table seating studio, and itemized budget donut in one serene place.
            </p>
            <div className="studio-features-list">
              <div><Icon name="check" size={13} color="var(--gold-soft)" style={{ marginRight: 8 }} /> Auspicious Ceremony Timelines &amp; Muhurats</div>
              <div><Icon name="check" size={13} color="var(--gold-soft)" style={{ marginRight: 8 }} /> Cultural Tradition Ritual Packs (North Indian, Marwari, South Indian)</div>
              <div><Icon name="check" size={13} color="var(--gold-soft)" style={{ marginRight: 8 }} /> Visual Banqueting Seating Studio (Tables T1–T4)</div>
              <div><Icon name="check" size={13} color="var(--gold-soft)" style={{ marginRight: 8 }} /> Itemized Budget Allocation &amp; Due Accounts Tracking</div>
              <div><Icon name="check" size={13} color="var(--gold-soft)" style={{ marginRight: 8 }} /> Private Rule-Based AI Styling Heuristics</div>
            </div>
            <Link to="/dashboard" className="btn" style={{ background: "linear-gradient(135deg, var(--gold-rich), #c5861b)", color: "var(--plum-deep)", marginTop: "12px", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
              <span>Enter Wedding Studio &amp; Planner</span>
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="studio-spotlight-preview">
            <div className="studio-mini-dashboard-card">
              <div className="mini-dash-header">
                <span className="mini-dash-dot"></span>
                <b>WEDDING COMMAND CENTER</b>
              </div>
              <div className="mini-dash-body">
                <div className="mini-dash-title">{s.couple || "Royal Wedding Celebration"}</div>
                <div className="mini-dash-date">
                  <span>📅 {new Date(s.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="mini-dash-days">{days(s.date)} days away</span>
                </div>
                <div className="mini-dash-stats">
                  <div className="mini-stat-item">
                    <small>Destination</small>
                    <b>{s.city || "Jaipur"}</b>
                  </div>
                  <div className="mini-stat-item">
                    <small>Theme</small>
                    <b>{s.theme}</b>
                  </div>
                  <div className="mini-stat-item">
                    <small>Budget Status</small>
                    <b>{inr(s.budget)}</b>
                  </div>
                </div>
                <div className="mini-dash-modules">
                  <span>✓ 5 Ceremony Timelines</span>
                  <span>✓ Seating Tables T1–T4</span>
                  <span>✓ VIP Concierge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Wedding Celebrations Showcase */}
      <section className="section-wrap">
        <div className="section-head">
          <div>
            <span className="section-eyebrow">AUTHENTIC STORIES</span>
            <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="heart" size={22} color="var(--gold-rich)" />
              <span>Real Celebrations with ShadiMubarak</span>
            </h2>
            <p className="muted" style={{ margin: "4px 0 0", fontSize: "0.92rem" }}>
              Couples who turned their wedding dreams into unforgettable memories.
            </p>
          </div>
        </div>

        <div className="grid g3 mt">
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
      </section>

      {/* VIP Concierge Banner */}
      <section className="section-wrap">
        <div className="vip-card-banner">
          <div className="vip-banner-content">
            <div className="vip-banner-text">
              <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="crown" size={22} color="var(--gold-rich)" />
                <span>ShadiMubarak VIP Wedding Director Service</span>
              </h3>
              <p>
                Require private haveli inspections, rare nakshatra pandit bookings, or bespoke menu curation? Our Senior Wedding Directors handle every negotiation and on-site protocol on your behalf.
              </p>
            </div>
            <button className="vip-btn" onClick={onOpenVip}>
              Schedule Free 1-on-1 Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
