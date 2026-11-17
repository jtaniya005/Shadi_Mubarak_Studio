export const inr = (n) => "₹" + (n >= 100000 ? (n / 100000).toFixed(n % 100000 ? 1 : 0) + "L" : n.toLocaleString("en-IN"));
export const days = (d) => Math.max(0, Math.ceil((new Date(d) - new Date()) / 864e5));
let counter = Date.now();
export const newId = () => ++counter;
export const COL = ["#6B2D5C", "#E8A33D", "#1F7A6D", "#D8466F", "#4B5BA6", "#9AA0A6"];
