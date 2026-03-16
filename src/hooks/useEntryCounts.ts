import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";

export function useEntryCounts(reloadFlag: number) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("entries")
          .select("completed, inProgress, problem");

        if (error) throw error;

        setEntries(data ?? []);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [reloadFlag]);

  const counts = useMemo(() => {
    const completed = entries.filter((e) => e.completed !== "").length;

    const inProgress = entries.filter(
      (e) => e.inProgress !== "" && e.completed === "",
    ).length;

    const problem = entries.filter(
      (e) => e.problem !== "" && e.inProgress === "" && e.completed === "",
    ).length;

    const total = entries.length;

    return { completed, inProgress, problem, total };
  }, [entries]);

  return {
    ...counts,
    loading,
  };
}
