import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function useEntryFilter() {
  const [entries, setEntries] = useState({
    completed: [] as any[],
    inProgress: [] as any[],
    problem: [] as any[],
    total: [] as any[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { data: completedData } = await supabase
          .from("entries")
          .select(`*,profiles(username)`)
          .neq("completed", "")
          .order("created_at", { ascending: false });

        const { data: inProgressData } = await supabase
          .from("entries")
          .select(`*,profiles(username)`)
          .neq("inProgress", "")
          .eq("completed", "")
          .order("created_at", { ascending: false });

        const { data: problemData } = await supabase
          .from("entries")
          .select(`*,profiles(username)`)
          .neq("problem", "")
          .eq("inProgress", "")
          .eq("completed", "")
          .order("created_at", { ascending: false });

        const { data: allData } = await supabase
          .from("entries")
          .select(`*,profiles(username)`)
          .order("created_at", { ascending: false });

        setEntries({
          completed: completedData ?? [],
          inProgress: inProgressData ?? [],
          problem: problemData ?? [],
          total: allData ?? [],
        });
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    ...entries,
    loading,
  };
}
