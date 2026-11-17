import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Arch from "./Arch";
import Icon from "./Icons";
import Stars from "./Stars";
import { inr } from "../utils/helpers";

function VendorCard({ v, compare, toggleCompare }) {
  const { s, set } = useStore();
  const saved = s.saved.includes(v.id);

  return (
    <article className="vendor">
      <Link to={`/vendors/${v.id}`} className="vendor-card-media">
        {v.image ? (
          <img src={v.image} alt={v.name} className="vendor-card-img" loading="lazy" />
        ) : (
          <Arch tone={["plum", "teal", "rose", "gold"][v.id % 4]} className="thumb">
            <span>{v.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
          </Arch>
        )}
        <span className="vendor-card-cat-badge">{v.cat}</span>
      </Link>
      <div className="vbody">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <small className="muted" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="mapPin" size={12} color="var(--mut)" />
            <span>{v.city}</span>
          </small>
          {v.verified ? (
            <span className="verified-tag" title="Audited Studio & Fixed Price Guarantee">
              <Icon name="shield" size={11} color="var(--emerald)" />
              Verified
            </span>
          ) : (
            <small style={{ fontSize: "0.72rem", color: "#888" }}>{v.exp || "5+ yrs"}</small>
          )}
        </div>

        <h4><Link to={`/vendors/${v.id}`}>{v.name}</Link></h4>
        
        {v.tagline && <p className="vendor-tagline">{v.tagline}</p>}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "6px 0 10px" }}>
          <Stars r={v.rating} />
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--plum)" }}>
            {v.cat === "Catering" ? `₹${v.base}/plate` : `from ${inr(v.base)}`}
          </span>
        </div>

        <div className="row">
          <button
            className={`btn ghost ${saved ? "on" : ""}`}
            onClick={() => set((o) => ({ saved: saved ? o.saved.filter((x) => x !== v.id) : [...o.saved, v.id] }))}
            aria-pressed={saved}
            style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <Icon name="heart" size={13} color={saved ? "var(--rose)" : "currentColor"} />
            <span>{saved ? "Shortlisted" : "Shortlist"}</span>
          </button>
          {toggleCompare && (
            <button
              className={`btn ghost ${compare ? "on" : ""}`}
              onClick={() => toggleCompare(v.id)}
              aria-pressed={compare}
              title="Add to comparison table"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5 }}
            >
              {compare && <Icon name="check" size={12} />}
              <span>{compare ? "Comparing" : "Compare"}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default VendorCard;
