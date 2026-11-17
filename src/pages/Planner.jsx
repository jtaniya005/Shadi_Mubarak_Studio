import { useState } from "react";
import { useStore } from "../context/StoreContext";
import Card from "../components/Card";
import Icon from "../components/Icons";
import Progress from "../components/Progress";
import Donut from "../components/Donut";
import { VENDORS, CAT_PLAN, TRADITIONS } from "../data/mockData";
import { inr, newId } from "../utils/helpers";

function Planner() {
  const { s, set } = useStore();
  const [tab, setTab] = useState("timeline");
  const [ev, setEv] = useState("");
  const [evd, setEvd] = useState("");
  const [g, setG] = useState("");
  const [ex, setEx] = useState({ item: "", cat: "Venue", amt: "" });
  const [packFeedback, setPackFeedback] = useState("");

  const spent = s.expenses.reduce((a, e) => a + e.amt, 0);
  const byCat = Object.keys(CAT_PLAN)
    .map((k) => ({ k, v: s.expenses.filter((e) => e.cat === k).reduce((a, e) => a + e.amt, 0) }))
    .filter((d) => d.v);

  const cycle = { Pending: "Yes", Yes: "No", No: "Pending" };
  const tables = [1, 2, 3, 4];
  const tabs = [
    ["timeline", "Ceremonies & Rituals"],
    ["guests", "Guests & Seating Studio"],
    ["budget", "Budget & Accounts"],
    ["quotes", `Vendor Quotes (${s.quotes.length})`]
  ];

  // Load a full cultural tradition ritual pack
  const loadTraditionPack = (traditionName) => {
    const pack = TRADITIONS[traditionName];
    if (!pack) return;

    const baseWeddingDate = new Date(s.date || "2027-02-14");

    const newEvents = pack.map((ceremony) => {
      const ceremonyDate = new Date(baseWeddingDate);
      ceremonyDate.setDate(ceremonyDate.getDate() - (ceremony.daysBefore || 0));
      const dateStr = ceremonyDate.toISOString().split("T")[0];

      return {
        id: newId(),
        name: ceremony.name,
        date: dateStr,
        tasks: ceremony.tasks.map((task) => ({
          id: newId(),
          t: task.t,
          who: task.who,
          done: false
        }))
      };
    });

    set((o) => ({
      tradition: traditionName,
      events: [...o.events, ...newEvents]
    }));

    setPackFeedback(`✨ Successfully loaded ${pack.length} traditional ceremonies for ${traditionName}!`);
    setTimeout(() => setPackFeedback(""), 4000);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ display: "inline-block", background: "rgba(214, 150, 35, 0.15)", color: "var(--plum-deep)", padding: "3px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px" }}>
            DETAILS, MANAGEMENT & WORKFLOW
          </div>
          <h1>Wedding Planner & Budget</h1>
          <p className="muted" style={{ margin: "2px 0 0", fontSize: "0.95rem" }}>
            Event timeline with ceremony schedules, tasks, responsibilities, guest-list RSVP seating previews, and expenditure breakdowns.
          </p>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {tabs.map(([k, l]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            className={tab === k ? "on" : ""}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Tab 1: Ceremonies & Cultural Rituals */}
      {tab === "timeline" && (
        <>
          {/* Tradition Pack Loader Card */}
          <div className="tradition-box">
            <div className="tradition-text">
              <b style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon name="diya" size={16} color="var(--gold-rich)" />
                <span>Cultural Ritual Pack Loader</span>
              </b>
              <p>
                Select your family heritage to auto-populate traditional ceremony milestones (Roka, Haldi, Chooda, Bhaat, Saat Phere) with designated family roles.
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <select
                aria-label="Select tradition"
                value={s.tradition || "North Indian / Punjabi"}
                onChange={(e) => set({ tradition: e.target.value })}
                style={{ background: "#fff", fontWeight: 600 }}
              >
                {Object.keys(TRADITIONS).map((tr) => (
                  <option key={tr} value={tr}>{tr}</option>
                ))}
              </select>
              <button
                className="btn"
                onClick={() => loadTraditionPack(s.tradition || "North Indian / Punjabi")}
              >
                + Load Tradition Rituals
              </button>
            </div>
          </div>

          {packFeedback && (
            <div className="ok" style={{ marginBottom: "18px" }}>
              {packFeedback}
            </div>
          )}

          {/* Add custom ceremony form */}
          <form
            className="inline"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ev || !evd) return;
              set((o) => ({
                events: [...o.events, { id: newId(), name: ev, date: evd, tasks: [] }]
              }));
              setEv("");
              setEvd("");
            }}
          >
            <input
              placeholder="Custom Ceremony (e.g. Sufi Night, Cocktail)"
              value={ev}
              onChange={(e) => setEv(e.target.value)}
              style={{ flex: 1, minWidth: "220px" }}
            />
            <input
              type="date"
              aria-label="Ceremony date"
              value={evd}
              onChange={(e) => setEvd(e.target.value)}
            />
            <button className="btn">Add Ceremony</button>
          </form>

          {/* Timeline of Ceremonies */}
          <div className="timeline">
            {[...s.events]
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((e) => {
                const d = e.tasks.filter((t) => t.done).length;
                return (
                  <Card
                    key={e.id}
                    title={e.name}
                    aside={
                      <small className="muted" style={{ fontWeight: 600 }}>
                        {new Date(e.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </small>
                    }
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <small className="muted">{d}/{e.tasks.length} rituals completed</small>
                    </div>
                    <Progress v={e.tasks.length ? (d / e.tasks.length) * 100 : 0} />

                    {e.tasks.map((t) => (
                      <label key={t.id} className="check">
                        <input
                          type="checkbox"
                          checked={t.done}
                          onChange={() =>
                            set((o) => ({
                              events: o.events.map((x) =>
                                x.id === e.id
                                  ? {
                                      ...x,
                                      tasks: x.tasks.map((y) => (y.id === t.id ? { ...y, done: !y.done } : y))
                                    }
                                  : x
                              )
                            }))
                          }
                        />
                        <span className={t.done ? "strike" : ""}>{t.t}</span>
                        <small className="muted">{t.who}</small>
                      </label>
                    ))}

                    <form
                      className="inline"
                      style={{ marginTop: "12px" }}
                      onSubmit={(x) => {
                        x.preventDefault();
                        const f = new FormData(x.target);
                        const t = f.get("t");
                        if (!t) return;
                        set((o) => ({
                          events: o.events.map((y) =>
                            y.id === e.id
                              ? {
                                  ...y,
                                  tasks: [
                                    ...y.tasks,
                                    { id: newId(), t, who: f.get("w") || "Me", done: false }
                                  ]
                                }
                              : y
                          )
                        }));
                        x.target.reset();
                      }}
                    >
                      <input name="t" placeholder="Add custom ritual/task" style={{ flex: 1 }} />
                      <input name="w" placeholder="Designated person" style={{ width: "130px" }} />
                      <button className="btn ghost">Add</button>
                    </form>
                  </Card>
                );
              })}
          </div>
        </>
      )}

      {/* Tab 2: Guests & Seating Studio */}
      {tab === "guests" && (
        <>
          <div className="grid g3">
            {["Yes", "Pending", "No"].map((r) => (
              <Card key={r} title={`RSVP: ${r}`}>
                <div className="num">
                  {s.guests.filter((x) => x.rsvp === r).length}{" "}
                  <small>guests</small>
                </div>
                <small className="muted">
                  {r === "Yes" && "Confirmed attendance"}
                  {r === "Pending" && "Awaiting follow-up call"}
                  {r === "No" && "Sent warm wishes"}
                </small>
              </Card>
            ))}
          </div>

          <form
            className="inline mt"
            onSubmit={(e) => {
              e.preventDefault();
              if (!g) return;
              set((o) => ({
                guests: [
                  ...o.guests,
                  { id: newId(), name: g, side: "Bride", rsvp: "Pending", table: 1 }
                ]
              }));
              setG("");
            }}
          >
            <input
              placeholder="Guest or Family Name (e.g. Sharma Family)"
              value={g}
              onChange={(e) => setG(e.target.value)}
              style={{ flex: 1, minWidth: "220px" }}
            />
            <button className="btn">Add to Guest List</button>
          </form>

          <Card title="Interactive Guest Directory" className="mt">
            {s.guests.map((x) => (
              <div key={x.id} className="guest">
                <span>
                  {x.name} <small className="muted">({x.side}'s Side)</small>
                </span>
                <button
                  className={`rsvp ${x.rsvp}`}
                  onClick={() =>
                    set((o) => ({
                      guests: o.guests.map((y) => (y.id === x.id ? { ...y, rsvp: cycle[y.rsvp] } : y))
                    }))
                  }
                  title="Click to toggle RSVP status"
                >
                  {x.rsvp}
                </button>
                <select
                  aria-label={`Table for ${x.name}`}
                  value={x.table}
                  onChange={(e) =>
                    set((o) => ({
                      guests: o.guests.map((y) => (y.id === x.id ? { ...y, table: +e.target.value } : y))
                    }))
                  }
                >
                  {tables.map((t) => (
                    <option key={t} value={t}>Round Table T{t}</option>
                  ))}
                </select>
              </div>
            ))}
          </Card>

          <Card title="Visual Seating Layout (Banqueting Tables T1-T4)" className="mt">
            <p className="muted" style={{ margin: "0 0 14px", fontSize: "0.85rem" }}>
              Round banqueting tables color-coded by RSVP confirmation status (Green = Confirmed, Gold = Pending).
            </p>
            <div className="seats">
              {tables.map((t) => (
                <div key={t} className="table">
                  <b>Table T{t}</b>
                  {s.guests
                    .filter((x) => x.table === t)
                    .map((x) => (
                      <span
                        key={x.id}
                        className={`dot ${x.rsvp}`}
                        title={`${x.name} (${x.rsvp})`}
                      >
                        {x.name[0]}
                      </span>
                    ))}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Tab 3: Budget & Accounts */}
      {tab === "budget" && (
        <>
          <div className="grid g2">
            <Card title="Expenditure Breakdown by Wedding Category">
              <Donut data={byCat} />
            </Card>
            <Card title="Overall Budget Health">
              <div className="num">
                {inr(spent)} <small>allocated of {inr(s.budget)}</small>
              </div>
              <Progress v={(spent / s.budget) * 100} />
              <div style={{ marginTop: "14px" }}>
                <label className="muted" style={{ display: "block", fontSize: "0.85rem", marginBottom: "4px" }}>
                  Adjust Total Wedding Budget Target:
                </label>
                <input
                  type="number"
                  value={s.budget}
                  onChange={(e) => set({ budget: +e.target.value || 0 })}
                  style={{ width: "100%", maxWidth: "260px" }}
                />
              </div>
            </Card>
          </div>

          <form
            className="inline mt"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ex.item || !ex.amt) return;
              set((o) => ({
                expenses: [
                  ...o.expenses,
                  { id: newId(), item: ex.item, cat: ex.cat, amt: +ex.amt, paid: false }
                ]
              }));
              setEx({ item: "", cat: "Venue", amt: "" });
            }}
          >
            <input
              placeholder="Expense description (e.g. Safa & Pagri booking)"
              value={ex.item}
              onChange={(e) => setEx({ ...ex, item: e.target.value })}
              style={{ flex: 1, minWidth: "220px" }}
            />
            <select
              aria-label="Expense category"
              value={ex.cat}
              onChange={(e) => setEx({ ...ex, cat: e.target.value })}
            >
              {Object.keys(CAT_PLAN).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Amount ₹"
              value={ex.amt}
              onChange={(e) => setEx({ ...ex, amt: e.target.value })}
              style={{ width: "150px" }}
            />
            <button className="btn">Add Expense</button>
          </form>

          <Card title="Itemized Wedding Accounts & Advances" className="mt">
            {s.expenses.map((e) => (
              <div key={e.id} className="guest">
                <span>
                  {e.item} <small className="muted">· {e.cat}</small>
                </span>
                <b>{inr(e.amt)}</b>
                <button
                  className={`rsvp ${e.paid ? "Yes" : "Pending"}`}
                  onClick={() =>
                    set((o) => ({
                      expenses: o.expenses.map((y) => (y.id === e.id ? { ...y, paid: !y.paid } : y))
                    }))
                  }
                  title="Click to toggle Paid/Due status"
                >
                  {e.paid ? "✓ Paid" : "⚠ Due"}
                </button>
              </div>
            ))}
          </Card>
        </>
      )}

      {/* Tab 4: Vendor Quotes */}
      {tab === "quotes" && (
        <Card title="Submitted Quotation Inquiries & Direct Studio Bids">
          {s.quotes.length === 0 ? (
            <div className="empty">
              <p>No quote inquiries yet.</p>
              <p className="muted">Visit the Vendor Explorer, open any partner profile, and request an official bid with 1 click.</p>
            </div>
          ) : (
            s.quotes.map((q) => (
              <div key={q.id} className="guest">
                <div>
                  <b>{VENDORS.find((v) => v.id === q.vid)?.name || "Vendor Partner"}</b>
                  <span className="muted" style={{ display: "block", fontSize: "0.85rem" }}>
                    Package: {q.pkg}
                  </span>
                  <small style={{ color: "var(--mut)", fontStyle: "italic" }}>
                    "{q.note}"
                  </small>
                </div>
                <span className="rsvp Pending">
                  Awaiting Partner Reply
                </span>
              </div>
            ))
          )}
        </Card>
      )}
    </>
  );
}

export default Planner;
