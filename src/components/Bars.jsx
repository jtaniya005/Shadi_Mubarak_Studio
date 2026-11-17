

const Bars = ({ data, max }) => {
  const m = max || Math.max(...data.map((d) => d.v), 1);
  return <div className="bars">{data.map((d) => (
    <div key={d.k} className="barrow"><span>{d.k}</span><div className="track"><i style={{ width: `${(d.v / m) * 100}%`, background: d.c }} /></div><b>{d.label ?? d.v}</b></div>))}</div>;
};

export default Bars;
