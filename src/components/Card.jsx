

const Card = ({ title, aside, children, className = "" }) => (
  <section className={`card ${className}`}>{(title || aside) && <header><h3>{title}</h3>{aside}</header>}{children}</section>
);

export default Card;
