import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface EntryCountProps {
  reloadFlag: number;
}

function EntryCount({ reloadFlag }: EntryCountProps) {
  const [problemCount, setProblemCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [
          { count: completed },
          { count: inProgress },
          { count: problem },
          { count: total },
        ] = await Promise.all([
          supabase
            .from("entries")
            .select("*", { count: "exact", head: true })
            .neq("completed", ""),

          supabase
            .from("entries")
            .select("*", { count: "exact", head: true })
            .neq("inProgress", "")
            .eq("completed", ""),
          supabase
            .from("entries")
            .select("*", { count: "exact", head: true })
            .neq("problem", "")
            .eq("inProgress", "")
            .eq("completed", ""),
          supabase.from("entries").select("*", { count: "exact", head: true }),
        ]);

        setCompletedCount(completed ?? 0);
        setInProgressCount(inProgress ?? 0);
        setProblemCount(problem ?? 0);
        setTotalCount(total ?? 0);
      } catch (err) {
        console.error("Fehler beim Laden der Counts:", err);
      }
    };

    loadCounts();
  }, [reloadFlag]);

  return (
    <div className="text-white border-[3px] border-indigo-500 rounded-xl p-2 flex justify-between w-full max-w-100 mx-auto">
      <div className="flex flex-col items-center">
        <span className="text-sm text-red-400">Problem</span>
        <span className="text-lg font-bold text-red-400">{problemCount}</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm text-yellow-300">In Bearbeitung</span>
        <span className="text-lg font-bold text-yellow-300">
          {inProgressCount}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm text-green-500">Erledigt</span>
        <span className="text-lg font-bold text-green-500">
          {completedCount}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-indigo-500">Gesamt</span>
        <span className="text-lg font-bold text-indigo-500">{totalCount}</span>
      </div>
    </div>
  );
}

export default EntryCount;
