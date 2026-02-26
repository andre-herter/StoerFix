import { useState, useEffect, useMemo } from "react";
import { supabase } from "../supabaseClient";

export function useEntryFilter() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase
        .from("entries")
        .select(`*, profiles(username)`)
        .order("created_at", { ascending: false });

      if (!error) setData(data ?? []);
      setLoading(false);
    };

    loadData();
  }, []);

  const completed = useMemo(
    () => data.filter((e) => e.completed !== ""),
    [data],
  );

  const inProgress = useMemo(
    () => data.filter((e) => e.inProgress !== "" && e.completed === ""),
    [data],
  );

  const problem = useMemo(
    () =>
      data.filter(
        (e) => e.problem !== "" && e.inProgress === "" && e.completed === "",
      ),
    [data],
  );

  return {
    completed,
    inProgress,
    problem,
    total: data,
    loading,
  };
}
