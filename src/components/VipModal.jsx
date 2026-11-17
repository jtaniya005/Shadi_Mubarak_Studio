import { useState } from "react";
import { useStore } from "../context/StoreContext";
import Icon from "./Icons";

const VIP_DIRECTORS = [
  {
    name: "Gayatri Sen",
    title: "Senior Vivah Director",
    exp: "14+ years in Palace & Royal Weddings",
    phone: "+91 98200 48291",
    specialty: "Heritage Palaces & Royal Rate Negotiations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80"
  },
  {
    name: "Raghavendra Singh",
    title: "Director of Royal Hospitality",
    exp: "12+ years in Destination Weddings",
    phone: "+91 98110 39281",
    specialty: "Catering Menus & Auspicious Vedic Muhurats",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80"
  }
];

const SERVICE_PILLS = [
  { id: "venues", label: "🏰 Palaces & Venues", desc: "Heritage forts, havelis & lakefront decks" },
  { id: "catering", label: "🍽️ Royal Catering", desc: "Awadhi khansamas & bespoke gourmet tasting" },
  { id: "decor", label: "🌸 Mandap & Floral Decor", desc: "3D visual sketches & couture mandaps" },
  { id: "muhurat", label: "🪔 Vedic Pandits", desc: "Nakshatra alignment & cultural priests" },
  { id: "full", label: "👑 Full White-Glove", desc: "End-to-end luxury management & guest care" }
];

export default function VipModal({ isOpen, onClose }) {
  const { s, set } = useStore();

  const [services, setServices] = useState(["venues", "decor"]);
  const [coupleName, setCoupleName] = useState(
    s.couple && !s.couple.includes("Aarohi") && s.couple !== "Royal Wedding Celebration" ? s.couple : ""
  );
  const [city, setCity] = useState(s.city || "Jaipur");
  const [budgetTier, setBudgetTier] = useState("₹25 - ₹40 Lakhs (Balanced Royal)");
  const [guests, setGuests] = useState("250 Guests (Classic)");
  const [phone, setPhone] = useState("");
  const [contactMode, setContactMode] = useState("WhatsApp");
  const [copiedCode, setCopiedCode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (id) => {
    setServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignedDirector = VIP_DIRECTORS[city === "Jaipur" || city === "Udaipur" ? 0 : 1];
    const refCode = `VIP-ROYAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const effectiveCouple = coupleName.trim() || s.couple || "Royal Wedding Celebration";

    set({
      couple: effectiveCouple,
      conciergeRequested: true,
      conciergeDetails: {
        director: assignedDirector,
        refCode,
        services,
        city,
        budgetTier,
        guests,
        phone,
        contactMode,
        coupleName: effectiveCouple,
        requestedAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      }
    });

    setSubmitted(true);
  };

  const handleResetConcierge = () => {
    set({ conciergeRequested: false, conciergeDetails: null });
    setSubmitted(false);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="luxury-vip-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="vip-modal-close" onClick={onClose} aria-label="Close modal">
          <Icon name="x" size={18} />
        </button>

        {/* Modal Top Crest Header */}
        <div className="vip-modal-crest">
          <div className="crest-halo">
            <Icon name="crown" size={30} color="var(--gold-rich)" />
          </div>
          <h2>ShadiMubarak VIP Vivah Concierge</h2>
          <span className="vip-crest-tagline">
            White-Glove Royal Wedding Management &bull; Direct Rate Protection
          </span>
          <p className="vip-crest-desc">
            Direct 1-on-1 access to a dedicated senior Vivah Director for palace sourcing, vendor negotiations, locked wholesale pricing, and flawless execution.
          </p>
        </div>

        {/* Active Consultation Status View */}
        {(submitted || s.conciergeRequested) && s.conciergeDetails ? (
          <div className="vip-success-container">
            <div className="vip-assigned-badge">
              <span className="pulse-dot-green"></span>
              <span>DEDICATED VIVAH DIRECTOR ASSIGNED</span>
            </div>

            {/* Director Profile Card */}
            <div className="vip-director-card">
              <img
                src={s.conciergeDetails.director.image}
                alt={s.conciergeDetails.director.name}
                className="director-photo-img"
              />
              <div className="director-info">
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <h3 style={{ margin: 0 }}>{s.conciergeDetails.director.name}</h3>
                  <span className="director-status-pill">Active on Speed Dial</span>
                </div>
                <span className="director-role">{s.conciergeDetails.director.title}</span>
                <p className="director-exp">{s.conciergeDetails.director.exp}</p>
                <div className="director-phone-tag">
                  <span>Priority Hotline:</span>
                  <b>{s.conciergeDetails.director.phone}</b>
                </div>
              </div>
            </div>

            {/* Consultation Summary Grid */}
            <div className="vip-summary-grid">
              <div className="vip-summary-item">
                <small>Consultation Code</small>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <b>{s.conciergeDetails.refCode}</b>
                  <button
                    type="button"
                    className="copy-code-mini-btn"
                    onClick={() => handleCopyCode(s.conciergeDetails.refCode)}
                  >
                    {copiedCode ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="vip-summary-item">
                <small>Destination Target</small>
                <b>{s.conciergeDetails.city} Palaces</b>
              </div>
              <div className="vip-summary-item">
                <small>Preferred Reachout</small>
                <b>{s.conciergeDetails.contactMode} ({s.conciergeDetails.phone || "+91 Priority"})</b>
              </div>
              <div className="vip-summary-item">
                <small>Services Selected</small>
                <b>{s.conciergeDetails.services.length} Bespoke Modules</b>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="vip-action-ribbon">
              <a
                href={`https://wa.me/919820048291?text=${encodeURIComponent(
                  `Namaste Gayatri ji! Inquiring about wedding planning for ${s.conciergeDetails.coupleName || "our wedding"} in ${s.conciergeDetails.city}. Ref: ${s.conciergeDetails.refCode}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="vip-whatsapp-action-btn"
              >
                <span>💬 Chat Directly with Vivah Director on WhatsApp</span>
              </a>
            </div>

            <div className="vip-guarantee-note">
              <Icon name="shield" size={16} color="var(--emerald)" />
              <span>
                Your Vivah Director is currently reviewing negotiated palace dates &amp; audited rate cards. Expect a priority response within 2 hours.
              </span>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "18px", justifyContent: "center" }}>
              <button className="vip-btn" onClick={onClose} style={{ padding: "10px 24px" }}>
                Done / Back to Studio
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={handleResetConcierge}
                style={{ padding: "10px 18px", fontSize: "0.84rem" }}
              >
                Modify Consultation Request
              </button>
            </div>
          </div>
        ) : (
          /* Consultation Request Form */
          <form onSubmit={handleSubmit} className="vip-consultation-form">
            {/* Step 1: Select Services */}
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label className="vip-field-label">
                <span>1. Select Services You Need Guidance On</span>
                <small>(Select one or multiple)</small>
              </label>
              <div className="vip-service-chips">
                {SERVICE_PILLS.map((p) => {
                  const active = services.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className={`vip-service-pill ${active ? "active" : ""}`}
                      onClick={() => toggleService(p.id)}
                    >
                      <b>{p.label}</b>
                      <small>{p.desc}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wedding Specifics (Clean 2-Column Grid) */}
            <div className="vip-form-grid">
              <div className="form-group">
                <label className="vip-field-label">Couple / Family Names</label>
                <input
                  type="text"
                  required
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  placeholder="e.g. Royal Wedding Celebration"
                />
              </div>

              <div className="form-group">
                <label className="vip-field-label">Preferred Destination City</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  {["Jaipur", "Udaipur", "Delhi NCR", "Goa", "Mumbai", "Jodhpur"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="vip-field-label">Target Wedding Budget</label>
                <select value={budgetTier} onChange={(e) => setBudgetTier(e.target.value)}>
                  <option>₹15 - ₹25 Lakhs (Curated Boutique)</option>
                  <option>₹25 - ₹40 Lakhs (Balanced Royal)</option>
                  <option>₹40 - ₹75 Lakhs (Grand Heritage)</option>
                  <option>₹75 Lakhs - ₹1.5 Cr+ (Luxury Palatial)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="vip-field-label">Estimated Guest Count</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  <option>100 - 150 Guests (Intimate Heritage)</option>
                  <option>250 Guests (Classic Royal)</option>
                  <option>400 Guests (Grand Palatial)</option>
                  <option>600+ Guests (Maharaja Vivah)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="vip-contact-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label className="vip-field-label">WhatsApp Number / Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ width: "190px" }}>
                <label className="vip-field-label">Preferred Reachout</label>
                <select value={contactMode} onChange={(e) => setContactMode(e.target.value)}>
                  <option value="WhatsApp">WhatsApp Chat</option>
                  <option value="Phone Call">Direct Phone Call</option>
                  <option value="Virtual Meeting">Google Meet Video</option>
                </select>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="vip-trust-badges">
              <span className="badge-item">
                <Icon name="shield" size={13} color="var(--emerald)" /> 100% Rate Lock Guarantee
              </span>
              <span className="badge-item">
                <Icon name="check" size={13} color="var(--emerald)" /> Zero Commission Markups
              </span>
              <span className="badge-item">
                <Icon name="diya" size={13} color="var(--gold-rich)" /> Free 1-on-1 Consultation
              </span>
            </div>

            {/* Submit CTA */}
            <button type="submit" className="vip-modal-submit-btn">
              <Icon name="crown" size={16} />
              <span>Confirm 1-on-1 VIP Director Allocation (Complimentary)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}