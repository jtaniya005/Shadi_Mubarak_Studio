import Icon from "./Icons";

const Stars = ({ r }) => {
  const rounded = Math.round(r);
  return (
    <span className="stars" aria-label={`${r} out of 5`} style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {[...Array(rounded)].map((_, i) => (
        <Icon key={i} name="star" size={13} color="var(--gold-rich)" />
      ))}
      <small style={{ marginLeft: 4, fontWeight: 700, color: "var(--plum-deep)" }}>{r}</small>
    </span>
  );
};

export default Stars;
