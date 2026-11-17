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

const ROYAL_TIERS = [
  {
    id: "heritage",
    icon: "palace",
    title: "Royal Heritage",
    range: "₹20L - ₹35L",
    highlight: "Heritage Palaces & Auspicious Muhurats",
    perks: ["Direct Palace Access", "Vedic Pandit Selection", "Audit Rate Protection"]
  },
  {
    id: "imperial",
    icon: "crown",
    title: "Imperial Vivah",
    range: "₹35L - ₹75L",
    badge: "Most Selected",
    highlight: "Couture Mandaps & Live Khansama Tastings",
    perks: ["3D Mandap Previews", "Private Menu Tastings", "Vendor Rate Lock", "Personal Vivah Director"]
  },
  {
    id: "maharaja",
    icon: "sparkles",
    title: "Maharaja Signature",
    range: "₹75L - ₹2Cr+",
    highlight: "End-to-End Red-Carpet Management",
    perks: ["24/7 Red-Carpet Concierge", "Charter & Royal Doli Logistics", "Celebrity Artist Booking", "Zero Hidden Surcharges"]
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

  const [selectedTier, setSelectedTier] = useState("imperial");
  const [services, setServices] = useState(["venues", "decor"]);
  const [coupleName, setCoupleName] = useState(
    s.couple && !s.couple.includes("Aarohi") ? s.couple : ""
  );
  const [city, setCity] = useState(s.city || "Jaipur");
  const [budgetTier, setBudgetTier] = useState("₹35 - ₹75 Lakhs (Imperial Vivah)");
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

  const handleTierSelect = (tier) => {
    setSelectedTier(tier.id);
    if (tier.id === "heritage") setBudgetTier("₹15 - ₹35 Lakhs (Royal Heritage)");
    else if (tier.id === "imperial") setBudgetTier("₹35 - ₹75 Lakhs (Imperial Vivah)");
    else setBudgetTier("₹75 Lakhs - ₹2 Cr+ (Maharaja Signature)");
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
        selectedTier,
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
              <span>DEDICATED VIVAH DIRECTOR ACTIVE &bull; ALLOCATION CONFIRMED</span>
            </div>

            {/* Director Profile Card */}
            <div className="vip-director-card">
              <img
                src={s.conciergeDetails.director.image}
                alt={s.conciergeDetails.director.name}
                className="director-photo-img"
              />
              <div className="director-info">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 style={{ margin: 0 }}>{s.conciergeDetails.director.name}</h3>
                  <span className="director-status-pill">Active on Speed Dial</span>
                </div>
                <span className="director-role">{s.conciergeDetails.director.title}</span>
                <p className="director-exp">{s.conciergeDetails.director.exp}</p>
                <div className="director-phone-tag">
                  <span>Priority Direct Hotline:</span>
                  <b>{s.conciergeDetails.director.phone}</b>
                </div>
              </div>
            </div>

            {/* Consultation Summary Grid */}
            <div className="vip-summary-grid">
              <div className="vip-summary-item">
                <small>Consultation Code</small>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
                <small>Preferred Contact</small>
                <b>{s.conciergeDetails.contactMode} ({s.conciergeDetails.phone || "+91 Priority"})</b>
              </div>
              <div className="vip-summary-item">
                <small>Services Selected</small>
                <b>{s.conciergeDetails.services.length} Bespoke Modules</b>
              </div>
            </div>

            {/* Quick Action: Direct WhatsApp Chat */}
            <div className="vip-action-ribbon">
              <a
                href={`https://wa.me/919820048291?text=${encodeURIComponent(
                  `Namaste ShadiMubarak VIP Concierge! Inquiring about wedding planning for ${s.conciergeDetails.coupleName || "our wedding"} in ${s.conciergeDetails.city}. Ref: ${s.conciergeDetails.refCode}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="vip-whatsapp-action-btn"
              >
                <span>💬 Chat Directly with {s.conciergeDetails.director.name} on WhatsApp</span>
              </a>
            </div>

            {/* 4-Step Royal Progress Tracker */}
            <div className="vip-progress-tracker">
              <div className="tracker-step done">
                <div className="step-circle">✓</div>
                <span>1. Request Received</span>
              </div>
              <div className="tracker-step active">
                <div className="step-circle">2</div>
                <span>2. Director Assigned</span>
              </div>
              <div className="tracker-step">
                <div className="step-circle">3</div>
                <span>3. Rate Card Audit</span>
              </div>
              <div className="tracker-step">
                <div className="step-circle">4</div>
                <span>4. Menu & Decor Tasting</span>
              </div>
            </div>

            <div className="vip-guarantee-note">
              <Icon name="shield" size={16} color="var(--emerald)" />
              <span>
                Your Vivah Director is reviewing vetted palace slots and audited pricing. Expect a priority connection within 2 business hours.
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
          /* New Consultation Form */
          <form onSubmit={handleSubmit} className="vip-consultation-form">
            {/* Step 1: Select Royal Experience Tier */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="vip-field-label">
                <span>1. Choose Your Royal Experience Tier</span>
                <small>(Select preferred service tier)</small>
              </label>
              <div className="vip-tier-grid">
                {ROYAL_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      className={`vip-tier-card ${isSelected ? "selected" : ""}`}
                      onClick={() => handleTierSelect(tier)}
                    >
                      {tier.badge && <span className="tier-badge-pill">{tier.badge}</span>}
                      <div className="tier-header">
                        <Icon name={tier.icon} size={18} color="var(--gold-rich)" />
                        <b>{tier.title}</b>
                      </div>
                      <div className="tier-budget">{tier.range}</div>
                      <p className="tier-desc">{tier.highlight}</p>
                      <ul className="tier-perks-list">
                        {tier.perks.map((p, idx) => (
                          <li key={idx}>✓ {p}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Specific Services of Interest */}
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="vip-field-label">
                <span>2. Select Services You Need Guidance On</span>
                <small>(Choose one or multiple)</small>
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

            {/* Step 3: Key Wedding Details */}
            <div className="vip-form-grid">
              <div className="form-group">
                <label className="vip-field-label">Couple / Family Names</label>
                <input
                  type="text"
                  required
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  placeholder="e.g. Royal Wedding / Enter Couple Names"
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
                  <option>₹15 - ₹35 Lakhs (Royal Heritage)</option>
                  <option>₹35 - ₹75 Lakhs (Imperial Vivah)</option>
                  <option>₹75 Lakhs - ₹1.5 Cr+ (Maharaja Signature)</option>
                  <option>₹1.5 Cr+ (Ultra Luxury Palatial)</option>
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

            {/* Step 4: Contact Reachout */}
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

              <div className="form-group" style={{ width: "180px" }}>
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