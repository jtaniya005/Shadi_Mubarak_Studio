import { COL, inr } from "../utils/helpers";

const Donut = ({ data }) => {
  const tot = data.reduce((a, d) => a + d.v, 0) || 1; let acc = 0; const R = 15.9;
  return <div className="donutwrap"><svg viewBox="0 0 42 42" className="donut" role="img" aria-label="Spend by category">
    <circle cx="21" cy="21" r={R} fill="none" stroke="#efe3ea" strokeWidth="6" />
    {data.map((d, i) => { const p = (d.v / tot) * 100, o = 25 - acc; acc += p;
      return <circle key={d.k} cx="21" cy="21" r={R} fill="none" stroke={COL[i % 6]} strokeWidth="6" strokeDasharray={`${p} ${100 - p}`} strokeDashoffset={o} />; })}
  </svg><ul>{data.map((d, i) => <li key={d.k}><i style={{ background: COL[i % 6] }} />{d.k} <b>{inr(d.v)}</b></li>)}</ul></div>;
};

export default Donut;
