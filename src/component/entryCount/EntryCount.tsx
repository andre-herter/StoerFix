import { useEntryCounts } from "../../hooks/useEntryCounts";

type FilterStatus = "completed" | "inProgress" | "problem" | "total" | null;

interface EntryCountProps {
  reloadFlag: number;
  setFilterStatus: (status: FilterStatus) => void;
  activeFilter?: FilterStatus;
}

function EntryCount({
  reloadFlag,
  setFilterStatus,
  activeFilter,
}: EntryCountProps) {
  const { completed, inProgress, problem, total } = useEntryCounts(reloadFlag);

  const getActiveClass = (status: FilterStatus) => {
    return activeFilter === status
      ? "bg-white/20 ring-1 ring-white/30"
      : "hover:bg-white/5";
  };

  return (
    <div className="text-white border-[3px] border-indigo-500 rounded-xl p-2 flex justify-between w-full max-w-100 mx-auto bg-black/20">
      <div
        onClick={() => setFilterStatus("problem")}
        className={`flex flex-col items-center cursor-pointer p-1 px-1 sm:px-3 rounded-lg transition-all ${getActiveClass("problem")}`}
      >
        <span className="text-sm text-red-400">Problem</span>
        <span className="text-lg font-bold text-red-400">{problem}</span>
      </div>

      <div
        onClick={() => setFilterStatus("inProgress")}
        className={`flex flex-col items-center cursor-pointer p-1 px-1 sm:px-3 rounded-lg transition-all ${getActiveClass("inProgress")}`}
      >
        <span className="text-sm text-yellow-300">In Bearbeitung</span>
        <span className="text-lg font-bold text-yellow-300">{inProgress}</span>
      </div>

      <div
        onClick={() => setFilterStatus("completed")}
        className={`flex flex-col items-center cursor-pointer p-1 px-1 sm:px-3 rounded-lg transition-all ${getActiveClass("completed")}`}
      >
        <span className="text-sm text-green-500">Erledigt</span>
        <span className="text-lg font-bold text-green-500">{completed}</span>
      </div>

      <div
        onClick={() => setFilterStatus("total")}
        className={`flex flex-col items-center cursor-pointer p-1 px-1 sm:px-3 rounded-lg transition-all ${getActiveClass("total")}`}
      >
        <span className="text-sm text-indigo-500">Gesamt</span>
        <span className="text-lg font-bold text-indigo-500">{total}</span>
      </div>
    </div>
  );
}

export default EntryCount;
