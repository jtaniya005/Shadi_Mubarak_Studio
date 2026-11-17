import { createContext, useContext, useEffect, useState } from "react";
import { INIT } from "../data/mockData";

const Ctx = createContext();
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [s, setS] = useState(() => {
    try {
      const raw = localStorage.getItem("shadi_mubarak") || localStorage.getItem("subh_vivah") || localStorage.getItem("saptapadi");
      if (!raw) return INIT;
      const parsed = JSON.parse(raw);
      // Auto-sanitize legacy couple names & assigned tasks
      if (!parsed.couple || parsed.couple.includes("Aarohi") || parsed.couple.includes("Kabir")) {
        parsed.couple = "Royal Wedding Celebration";
      }
      if (Array.isArray(parsed.events)) {
        parsed.events = parsed.events.map((ev) => ({
          ...ev,
          tasks: (ev.tasks || []).map((t) => ({
            ...t,
            who: t.who === "Aarohi" ? "Bride" : t.who === "Kabir" ? "Groom" : t.who
          }))
        }));
      }
      return { ...INIT, ...parsed };
    } catch {
      return INIT;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("shadi_mubarak", JSON.stringify(s));
    } catch {}
  }, [s]);
  const set = (p) => setS((o) => ({ ...o, ...(typeof p === "function" ? p(o) : p) }));
  return <Ctx.Provider value={{ s, set }}>{children}</Ctx.Provider>;
}
