import { createContext, useContext, useEffect, useState } from "react";
import { INIT } from "../data/mockData";

const Ctx = createContext();
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [s, setS] = useState(() => {
    try { return { ...INIT, ...JSON.parse(localStorage.getItem("shadi_mubarak") || localStorage.getItem("subh_vivah") || localStorage.getItem("saptapadi") || "{}") }; } catch { return INIT; }
  });
  useEffect(() => { try { localStorage.setItem("shadi_mubarak", JSON.stringify(s)); } catch {} }, [s]);
  const set = (p) => setS((o) => ({ ...o, ...(typeof p === "function" ? p(o) : p) }));
  return <Ctx.Provider value={{ s, set }}>{children}</Ctx.Provider>;
}
