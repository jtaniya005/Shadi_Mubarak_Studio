import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Card from "../components/Card";
import Icon from "../components/Icons";
import VendorCard from "../components/VendorCard";
import { VENDORS, CATS } from "../data/mockData";
import { inr } from "../utils/helpers";

function Explorer() {
  const { s } = useStore();
  const [searchParams] = useSearchParams();
  const paramCat = searchParams.get("cat");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(paramCat || "All");
  const [city, setCity] = useState("All");
  const [sort, setSort] = useState("rating");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [cmp, setCmp] = useState([]);

  useEffect(() => {
    if (paramCat) setCat(paramCat);
  }, [paramCat]);

  const list = useMemo(
    () =>
      VENDORS.filter(
        (v) =>
          (cat === "All" || v.cat === cat) &&
          (city === "All" || v.city === city) &&
          (!verifiedOnly || v.verified) &&
          (v.name.toLowerCase().includes(q.toLowerCase()) ||
            v.tagline?.toLowerCase().includes(q.toLowerCase()) ||
            v.themes.some((t) => t.toLowerCase().includes(q.toLowerCase())))
      ).sort((a, b) => (sort === "rating" ? b.rating - a.rating : a.base - b.base)),
    [q, cat, city, sort, verifiedOnly]
  );

  const toggle = (id) =>
    setCmp((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < 3 ? [...c, id] : c));
  const chosen = VENDORS.filter((v) => cmp.includes(v.id));

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ display: "inline-block", background: "rgba(214, 150, 35, 0.15)", color: "var(--plum-deep)", padding: "3px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px" }}>
            CURATED VENDOR DIRECTORY
          </div>
          <h1>Vendor Explorer</h1>
          <p className="muted" style={{ margin: "2px 0 0", fontSize: "0.95rem" }}>
            Vendor directory for decor, photography, venues and catering with search, filters and comparison interface.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            className={`btn ghost ${verifiedOnly ? "on" : ""}`}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            style={{ borderRadius: "999px", display: "inline-flex", alignItems: "center" }}
          >
            <Icon name="shield" size={14} style={{ marginRight: 6 }} />
            <span>{verifiedOnly ? "Showing Verified Only" : "Filter Verified Partners"}</span>
          </button>
        </div>
      </div>

      <div className="filters">
        <input
          placeholder="Search by vendor name, style or cuisine..."
          aria-label="Search vendors"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select aria-label="Category" value={cat} onChange={(e) => setCat(e.target.value)}>
          {["All", ...CATS].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select aria-label="City" value={city} onChange={(e) => setCity(e.target.value)}>
          {["All", "Jaipur", "Udaipur", "Delhi"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">★ Highest Rating</option>
          <option value="price">₹ Starting Price</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0", flexWrap: "wrap", gap: "8px" }}>
        <p className="muted" style={{ margin: 0, fontSize: "0.88rem" }}>
          Showing <b>{list.length}</b> vetted vendors · Tuned for your <b>{s.theme}</b> theme
        </p>
        {verifiedOnly && (
          <small style={{ color: "var(--teal)", fontWeight: 600 }}>
            ✓ Verified audit includes physical location inspection & price locking
          </small>
        )}
      </div>

      <div className="grid g4">
        {list.map((v) => (
          <VendorCard key={v.id} v={v} compare={cmp.includes(v.id)} toggleCompare={toggle} />
        ))}
      </div>

      {list.length === 0 && (
        <div className="empty">
          <p>No vendors match the active search or filters.</p>
          <button className="btn ghost" onClick={() => { setQ(""); setCat("All"); setCity("All"); setVerifiedOnly(false); }}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Comparison Matrix with ShadiMubarak Verified indicators */}
      <Card title={`Side-by-Side Comparison Matrix (${chosen.length}/3)`} className="mt">
        {chosen.length < 2 ? (
          <p className="muted" style={{ margin: 0 }}>
            Select 2 or 3 vendors using the <b>Compare</b> button on any vendor card to inspect pricing, packages, verified status, and themes side by side.
          </p>
        ) : (
          <div className="scroll">
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  {chosen.map((v) => (
                    <th key={v.id}>{v.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Verification Status</td>
                  {chosen.map((v) => (
                    <td key={v.id}>
                      {v.verified ? (
                        <span className="verified-tag">✓ ShadiMubarak Verified™</span>
                      ) : (
                        <span style={{ color: "var(--mut)" }}>Standard Partner</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Category</td>
                  {chosen.map((v) => (
                    <td key={v.id}><b>{v.cat}</b></td>
                  ))}
                </tr>
                <tr>
                  <td>City</td>
                  {chosen.map((v) => (
                    <td key={v.id}>{v.city}</td>
                  ))}
                </tr>
                <tr>
                  <td>Experience</td>
                  {chosen.map((v) => (
                    <td key={v.id}>{v.exp || "5+ yrs"}</td>
                  ))}
                </tr>
                <tr>
                  <td>Rating</td>
                  {chosen.map((v) => (
                    <td key={v.id}>★ {v.rating} / 5.0</td>
                  ))}
                </tr>
                <tr>
                  <td>Starting Price</td>
                  {chosen.map((v) => (
                    <td key={v.id} style={{ color: "var(--plum)", fontWeight: 700 }}>
                      {v.cat === "Catering" ? `₹${v.base}/plate` : inr(v.base)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Key Themes</td>
                  {chosen.map((v) => (
                    <td key={v.id}>{v.themes.join(", ")}</td>
                  ))}
                </tr>
                <tr>
                  <td>Verified Audit Points</td>
                  {chosen.map((v) => (
                    <td key={v.id} style={{ fontSize: "0.82rem" }}>
                      {v.verifiedPoints?.join(" · ") || "Standard inspection"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}

export default Explorer;
