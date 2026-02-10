import { useEntryCounts } from "../../hooks/useEntryCounts";

interface EntryCountProps {
  reloadFlag: number;
}

function EntryCount({ reloadFlag }: EntryCountProps) {
  const { completed, inProgress, problem, total } = useEntryCounts(reloadFlag);

  return (
    <div className="text-white border-[3px] border-indigo-500 rounded-xl p-2 flex justify-between w-full max-w-100 mx-auto">
      <div
        onClick={() => alert("klick")}
        className="flex flex-col items-center cursor-pointer"
      >
        <span className="text-sm text-red-400">Problem</span>
        <span className="text-lg font-bold text-red-400">{problem}</span>
      </div>

      <div
        onClick={() => alert("klick")}
        className="flex flex-col items-center cursor-pointer"
      >
        <span className="text-sm text-yellow-300">In Bearbeitung</span>
        <span className="text-lg font-bold text-yellow-300">{inProgress}</span>
      </div>

      <div
        onClick={() => alert("klick")}
        className="flex flex-col items-center cursor-pointer"
      >
        <span className="text-sm text-green-500">Erledigt</span>
        <span className="text-lg font-bold text-green-500">{completed}</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm text-indigo-500">Gesamt</span>
        <span className="text-lg font-bold text-indigo-500">{total}</span>
      </div>
    </div>
  );
}

export default EntryCount;
