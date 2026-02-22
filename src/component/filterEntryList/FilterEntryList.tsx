import { useEntryFilter } from "../../hooks/useEntryFilter";
import { Entry } from "../createEntry/CreateEntry";
import EntryCard from "../entryCard/EntryCard";

interface FilterEntryListProps {
  filterStatus: "completed" | "inProgress" | "problem" | "total";
}

const STATUS_LABELS: Record<FilterEntryListProps["filterStatus"], string> = {
  total: "Alle",
  completed: "Abgeschlossene",
  inProgress: "In bearbeitung",
  problem: "Problem",
};

const FilterEntryList = ({ filterStatus }: FilterEntryListProps) => {
  const { loading, ...entryData } = useEntryFilter();

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <p className="text-gray-500 text-2xl animate-pulse">Lade Einträge...</p>
      </div>
    );
  }

  const currentEntries: Entry[] = entryData[filterStatus] || [];
  const displayTitle = STATUS_LABELS[filterStatus];

  if (currentEntries.length === 0) {
    return (
      <div className="flex justify-center p-10 text-center">
        <p className="text-gray-400 text-xl font-light">
          Keine Einträge in der Kategorie <br />
          <span className="font-bold text-indigo-400">
            "{displayTitle}"
          </span>{" "}
          gefunden.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full px-4">
      <h1 className="text-3xl text-white capitalize mb-4">
        {displayTitle === "total" ? "Alle" : displayTitle} Einträge
      </h1>
      {currentEntries.map((entry: Entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default FilterEntryList;
