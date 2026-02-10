import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useEntryCounts(reloadFlag: number) {
  const [counts, setCounts] = useState({
    completed: 0,
    inProgress: 0,
    problem: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      setLoading(true);
      try {
        // 1. Erledigt abrufen
        const { count: completed } = await supabase
          .from("entries")
          .select("*", { count: "exact", head: true })
          .neq("completed", "");

        // 2. In Bearbeitung abrufen
        const { count: inProgress } = await supabase
          .from("entries")
          .select("*", { count: "exact", head: true })
          .neq("inProgress", "")
          .eq("completed", "");

        // 3. Problem abrufen
        const { count: problem } = await supabase
          .from("entries")
          .select("*", { count: "exact", head: true })
          .neq("problem", "")
          .eq("inProgress", "")
          .eq("completed", "");

        // 4. Gesamt abrufen
        const { count: total } = await supabase
          .from("entries")
          .select("*", { count: "exact", head: true });

        // Alle Werte gleichzeitig in den State schreiben
        setCounts({
          completed: completed ?? 0,
          inProgress: inProgress ?? 0,
          problem: problem ?? 0,
          total: total ?? 0,
        });
      } catch (err) {
        console.error("Fehler beim sequenziellen Laden:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, [reloadFlag]);

  return {
    completed: counts.completed,
    inProgress: counts.inProgress,
    problem: counts.problem,
    total: counts.total,
    loading,
  };
}
