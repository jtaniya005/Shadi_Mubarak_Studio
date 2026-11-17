import { useStore } from "../context/StoreContext";
import Card from "../components/Card";
import Bars from "../components/Bars";
import Icon from "../components/Icons";
import VendorCard from "../components/VendorCard";
import { VENDORS, CAT_PLAN } from "../data/mockData";
import { inr, COL } from "../utils/helpers";

function Insights() {
  const { s } = useStore();
  const spent = s.expenses.reduce((a, e) => a + e.amt, 0);

  const themeCount = {};
  s.saved.forEach((id) =>
    VENDORS.find((v) => v.id === id)?.themes.forEach((t) => (themeCount[t] = (themeCount[t] || 0) + 1))
  );
  themeCount[s.theme] = (themeCount[s.theme] || 0) + 2;
  const themes = Object.entries(themeCount)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v], i) => ({ k, v, c: COL[i % 6] }));

  const views = Object.entries(s.views)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ k, v, c: "#146B5A" }));

  const pattern = Object.keys(CAT_PLAN).map((k) => {
    const sp = s.expenses.filter((e) => e.cat === k).reduce((a, e) => a + e.amt, 0);
    return {
      k,
      plan: CAT_PLAN[k],
      act: Math.round((sp / Math.max(spent, 1)) * 100)
    };
  });

  const pop = {};
  s.quotes.forEach((q) => (pop[q.pkg] = (pop[q.pkg] || 0) + 1));
  const pkgs = [
    ...Object.entries(pop).map(([k, v]) => ({ k, v })),
    { k: "Full Venue", v: 4 },
    { k: "Photo + Video", v: 3 },
    { k: "Garden Evening", v: 2 }
  ]
    .sort((a, b) => b.v - a.v)
    .slice(0, 4)
    .map((d) => ({ ...d, c: "#D69623" }));

  const topType = views[0]?.k;
  const sugg = VENDORS.filter((v) => !s.saved.includes(v.id))
    .map((v) => ({
      v,
      sc: (v.themes.includes(s.theme) ? 3 : 0) + (v.cat === topType ? 2 : 0) + v.rating / 5 + (v.verified ? 1 : 0)
    }))
    .sort((a, b) => b.sc - a.sc)
    .slice(0, 3);

  const tips = [];
  pattern.forEach((p) => {
    if (p.act > p.plan + 10)
      tips.push(`${p.k} accounts for ${p.act}% of spend against our ${p.plan}% royal wedding benchmark. Consider reallocating towards Decor or Catering.`);
  });
  const pend = s.events.flatMap((e) =>
    e.tasks.filter((t) => !t.done).map((t) => `${t.t} (${e.name})`)
  );
  if (pend.length) tips.push(`${pend.length} ritual milestones are currently pending. Prioritize: "${pend[0]}".`);
  if (spent / s.budget > 0.6) tips.push("You've allocated over 60% of your total budget. Finalize quotes before booking extra optional services.");
  if (!tips.length) tips.push("Your wedding finances and rituals are gracefully aligned. Keep shortlisting verified vendors to refine recommendations.");

  return (
    <>
      <div>
        <div style={{ display: "inline-block", background: "rgba(214, 150, 35, 0.15)", color: "var(--plum-deep)", padding: "3px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px" }}>
          AI BEHAVIOR & DATA INSIGHTS
        </div>
        <h1>AI Styling & Vendor Insights</h1>
        <p className="muted" style={{ fontSize: "0.95rem", margin: "4px 0 16px" }}>
          Rule-based AI engine delivering intelligent suggestions based on sample budget categories, vendor comparisons and pending milestones.
        </p>
      </div>

      <div className="grid g2">
        <Card title="1. Preferred Wedding Themes">
          <Bars data={themes} />
          <small className="muted" style={{ display: "block", marginTop: "6px" }}>
            Derived from selected theme (<b>{s.theme}</b>) and shortlisted vendor styles
          </small>
        </Card>
        <Card title="2. Frequently Viewed Vendor Types">
          {views.length ? <Bars data={views} /> : <p className="empty">Open vendor profiles in Explorer to calibrate your browsing history matrix.</p>}
          <small className="muted" style={{ display: "block", marginTop: "6px" }}>
            Tracked in localStorage across vendor profile views
          </small>
        </Card>
        <Card title="3. Budget Allocation Patterns">
          <Bars
            max={50}
            data={pattern.map((p) => ({
              k: p.k,
              v: p.act,
              c: p.act > p.plan + 10 ? "#D93B5D" : "#4C1544",
              label: `${p.act}% / ${p.plan}%`
            }))}
          />
          <small className="muted" style={{ display: "block", marginTop: "6px" }}>
            Actual Spend % vs Recommended Benchmark %
          </small>
        </Card>
        <Card title="4. Popular Service Packages">
          <Bars data={pkgs} />
          <small className="muted" style={{ display: "block", marginTop: "6px" }}>
            Based on submitted quote requests and trending vendor packages
          </small>
        </Card>
      </div>

      <Card title={`5. Suggested Vendors by Preferences (${s.theme})`} className="mt">
        <p className="muted" style={{ margin: "0 0 14px", fontSize: "0.85rem" }}>
          Algorithmic vendor matching based on theme affinity, verified status, high ratings, and browsing frequency:
        </p>
        <div className="grid g3">
          {sugg.map(({ v }) => (
            <VendorCard key={v.id} v={v} />
          ))}
        </div>
      </Card>

      <Card title="AI Planning Suggestions (Budget, Vendor Comparisons & Milestones)" className="mt">
        <p className="muted" style={{ margin: "0 0 12px", fontSize: "0.85rem" }}>
          Automated rule-based heuristics evaluating budget variance, task milestones, and pending vendor decisions:
        </p>
        <ul className="tips">
          {tips.map((t, idx) => (
            <li key={idx} style={{ marginBottom: "10px" }}>
              <b style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--plum-deep)" }}>
                <Icon name="lightbulb" size={15} color="var(--gold-rich)" />
                <span>Advisory:</span>
              </b> {t}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

export default Insights;
