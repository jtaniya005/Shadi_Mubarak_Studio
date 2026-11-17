import { useState } from "react";
import { HashRouter, Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { StoreProvider, useStore } from "./context/StoreContext";
import Arch from "./components/Arch";
import Icon from "./components/Icons";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Explorer from "./pages/Explorer";
import Profile from "./pages/Profile";
import Planner from "./pages/Planner";
import Insights from "./pages/Insights";
import { VIP_CONCIERGE_FEATURES, INIT } from "./data/mockData";
import { days } from "./utils/helpers";

const NAV_LINKS = [
  ["/", "Home", "sparkles"],
  ["/dashboard", "Dashboard", "palace"],
  ["/vendors", "Vendor Explorer", "ring"],
  ["/planner", "Planner & Budget", "planner"],
  ["/insights", "AI Insights", "insights"]
];

function SiteHeader({ onOpenVip }) {
  const { s } = useStore();
  const location = useLocation();
  const isDashboardActive = location.pathname === "/dashboard" || location.pathname === "/studio";

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="logo-arch-wrap">
            <Arch tone="gold" className="mini" />
          </div>
          <div className="brand-text">
            <span className="brand-name">ShadiMubarak</span>
            <span className="brand-sub">WEDDING STUDIO</span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="site-nav">
          {NAV_LINKS.map(([to, label, iconName]) => {
            const isDashLink = to === "/dashboard";
            const isActive = isDashLink ? isDashboardActive : location.pathname === to;

            return (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={isActive ? "active" : ""}
              >
                <span className="nav-icon"><Icon name={iconName} size={15} /></span>
                <span className="nav-label">{label}</span>
                {isDashLink && (
                  <span className="nav-days-badge">
                    {days(s.date)}d
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="header-actions">
          <Link to="/vendors" className="header-shortlist-btn" title="View Shortlisted Vendors">
            <Icon name="heart" size={14} color="var(--rose)" />
            <span>Shortlist ({s.saved.length})</span>
          </Link>

          <button className="vip-action-btn" onClick={onOpenVip}>
            <Icon name="crown" size={14} />
            <span>VIP Concierge</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function SiteFooter({ onOpenVip }) {
  return (
    <footer className="web-footer">
      <div className="footer-cols">
        <div className="footer-col brand-col">
          <div className="logo" style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Arch tone="gold" className="mini" />
            <div>
              <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", display: "block" }}>ShadiMubarak</span>
              <span style={{ fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gold-rich)" }}>Wedding Planning Studio</span>
            </div>
          </div>
          <p className="muted" style={{ fontSize: "0.86rem", lineHeight: 1.6 }}>
            India's premier wedding planning and vendor coordination platform, uniting heritage palaces, verified caterers, cultural ceremony timelines, and rule-based AI styling intelligence.
          </p>
          <div className="footer-rating-strip" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <Icon name="star" size={14} color="var(--gold-rich)" />
              <b>4.9/5 Rating</b>
            </span>
            <span>·</span>
            <span>10,000+ Dream Weddings Coordinated</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore &amp; Plan</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Wedding Dashboard</Link></li>
            <li><Link to="/vendors">Vendor Explorer</Link></li>
            <li><Link to="/planner">Ceremony Planner &amp; Budget</Link></li>
            <li><Link to="/insights">AI Styling Insights</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Royal Services</h4>
          <ul>
            <li><Link to="/vendors">Heritage Palaces &amp; Venues</Link></li>
            <li><Link to="/vendors">Master Caterers &amp; Menus</Link></li>
            <li><button onClick={onOpenVip} style={{ background: "none", border: 0, padding: 0, color: "var(--gold)", cursor: "pointer", font: "inherit", fontSize: "0.88rem" }}>VIP Vivah Concierge</button></li>
            <li><span className="muted" style={{ fontSize: "0.84rem" }}>Direct Line: +91 800-SHADI-MUBARAK</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; 2026-2027 ShadiMubarak Wedding Studio. All rights reserved.</div>
        <div style={{ color: "var(--mut)", fontSize: "0.8rem" }}>
          Transparent Pricing · Verified Credentials · Auspicious Vedic Muhurats
        </div>
      </div>
    </footer>
  );
}

function ShellInner() {
  const { s, set } = useStore();
  const [showVipModal, setShowVipModal] = useState(false);
  const [vipSuccess, setVipSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [cityChoice, setCityChoice] = useState(s.city || "Jaipur");

  const handleBookVip = (e) => {
    e.preventDefault();
    set({ conciergeRequested: true });
    setVipSuccess(true);
    setTimeout(() => {
      setVipSuccess(false);
      setShowVipModal(false);
    }, 2500);
  };

  return (
    <div className="website-shell">
      <SiteHeader onOpenVip={() => setShowVipModal(true)} />

      <main className="website-main">
        <Routes>
          <Route path="/" element={<Home onOpenVip={() => setShowVipModal(true)} />} />
          <Route path="/dashboard" element={<Dashboard onOpenVip={() => setShowVipModal(true)} />} />
          <Route path="/studio" element={<Dashboard onOpenVip={() => setShowVipModal(true)} />} />
          <Route path="/vendors" element={<Explorer />} />
          <Route path="/vendors/:id" element={<Profile />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </main>

      <SiteFooter onOpenVip={() => setShowVipModal(true)} />

      {/* Global VIP Concierge Modal */}
      {showVipModal && (
        <div className="modal-overlay" onClick={() => setShowVipModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowVipModal(false)} aria-label="Close modal">
              <Icon name="x" size={18} />
            </button>
            
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ display: "inline-flex", padding: 12, borderRadius: "50%", background: "rgba(212,175,55,0.15)", color: "var(--gold-rich)", marginBottom: 8 }}>
                <Icon name="crown" size={32} />
              </div>
              <h2 style={{ margin: "6px 0 4px", color: "var(--plum-deep)" }}>ShadiMubarak VIP Concierge</h2>
              <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
                Inspired by elite royal weddings — your dedicated Vivah Director oversees palace sourcing, vendor negotiations, auspicious pandits, and flawless execution.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              {VIP_CONCIERGE_FEATURES.map((f, i) => (
                <div key={i} style={{ background: "var(--bg-warm)", padding: "12px", borderRadius: "12px", border: "1px solid var(--line)" }}>
                  <div style={{ color: "var(--gold-rich)", marginBottom: "6px" }}>
                    <Icon name={f.icon} size={22} />
                  </div>
                  <b style={{ display: "block", fontSize: "0.88rem", color: "var(--plum-deep)" }}>{f.title}</b>
                  <small style={{ color: "var(--mut)", fontSize: "0.78rem" }}>{f.desc}</small>
                </div>
              ))}
            </div>

            {vipSuccess ? (
              <div className="ok" style={{ textAlign: "center", padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Icon name="checkCircle" size={20} color="var(--emerald)" />
                <span>Consultation Confirmed! Your dedicated Vivah Director will reach out on WhatsApp/Call within 2 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleBookVip} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Couple Names</label>
                  <input type="text" value={s.couple} onChange={(e) => set({ couple: e.target.value })} required style={{ width: "100%" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Destination City</label>
                    <select value={cityChoice} onChange={(e) => setCityChoice(e.target.value)} style={{ width: "100%" }}>
                      {["Jaipur", "Udaipur", "Delhi", "Goa", "Mumbai"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>WhatsApp / Phone</label>
                    <input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: "100%" }} />
                  </div>
                </div>
                <button type="submit" className="vip-btn" style={{ width: "100%", marginTop: "8px" }}>
                  Confirm 1-on-1 Consultation (Complimentary)
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <ShellInner />
      </HashRouter>
    </StoreProvider>
  );
}
