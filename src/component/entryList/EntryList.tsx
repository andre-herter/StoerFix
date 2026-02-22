import { useState } from "react";
import EntryCard from "../entryCard/EntryCard";
import ArchivedEntryList from "../archivedEntryList/ArchivedEntryList";
import FilterEntryList from "../filterEntryList/FilterEntryList";
import ButtonLayout from "../buttonLayout/ButtonLayout";
import EntryCount from "../entryCount/EntryCount";
import { Entry } from "../createEntry/CreateEntry"; // Wichtig: Importiere dein Entry-Interface

// 1. Das Interface muss hier definiert sein (oder importiert werden)
interface EntryListProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onArchive: (entry: Entry) => void;
  query: string;
  showArchived: boolean;
  toggleArchived: () => void;
  onCreate: () => void;
  reloadFlag: number;
}

// Typ für den Filter
export type FilterStatus =
  | "completed"
  | "inProgress"
  | "problem"
  | "total"
  | null;

const EntryList: React.FC<EntryListProps> = ({
  entries,
  onEdit,
  onArchive,
  query,
  showArchived,
  toggleArchived,
  onCreate,
  reloadFlag,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>(null);

  // 2. Typisierung der Parameter (e: Entry) löst die "implicit any" Fehler
  const activeEntries = entries.filter((e: Entry) => !e.archived);
  const archivedEntries = entries.filter((e: Entry) => e.archived);

  const filteredActive = activeEntries.filter((e: Entry) => {
    const text = [e.problem, e.inProgress, e.completed, e.profiles?.username]
      .join(" ")
      .toLowerCase();
    return text.includes(query.toLowerCase());
  });

  const handleFilterToggle = (status: FilterStatus) => {
    setActiveFilter((prev) => (prev === status ? null : status));
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <EntryCount
        reloadFlag={reloadFlag}
        setFilterStatus={handleFilterToggle}
        activeFilter={activeFilter}
      />

      <ButtonLayout
        onCreate={onCreate}
        showArchived={showArchived}
        toggleArchived={toggleArchived}
      />

      {activeFilter ? (
        <FilterEntryList filterStatus={activeFilter} />
      ) : showArchived ? (
        <ArchivedEntryList entries={archivedEntries} />
      ) : !filteredActive.length ? (
        <p className="text-gray-500 text-4xl">Keine aktiven Einträge</p>
      ) : (
        filteredActive.map(
          (
            entry: Entry, // Typ hier ebenfalls hinzufügen
          ) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onEdit={onEdit}
              onArchive={onArchive}
            />
          ),
        )
      )}
    </div>
  );
};

export default EntryList; // Vergiss den Export nicht!
