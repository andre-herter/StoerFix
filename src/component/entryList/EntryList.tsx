import { useState } from "react";
import EntryCard from "../entryCard/EntryCard";
import ArchivedEntryList from "../archivedEntryList/ArchivedEntryList";
import FilterEntryList from "../filterEntryList/FilterEntryList";
import ButtonLayout from "../buttonLayout/ButtonLayout";
import EntryCount from "../entryCount/EntryCount";
import { Entry } from "../createEntry/CreateEntry";

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

  // Trennung aktive / archivierte Einträge
  const activeEntries = entries.filter((e) => !e.archived);
  const archivedEntries = entries.filter((e) => e.archived);

  // Suche über alle Einträge
  const searchFilter = (entry: Entry) => {
    const text = [
      entry.problem,
      entry.inProgress,
      entry.completed,
      entry.profiles?.username,
    ]
      .join(" ")
      .toLowerCase();
    return text.includes(query.toLowerCase());
  };

  const filteredActive = activeEntries.filter(searchFilter);
  const filteredArchived = archivedEntries.filter(searchFilter);

  // Filter-Handler
  const handleFilterToggle = (status: FilterStatus) => {
    setActiveFilter((prev) => (prev === status ? null : status));
  };

  // Welche Einträge sollen gerendert werden
  const getEntriesToRender = () => {
    // 1️⃣ Filter aktiv → FilterEntryList anzeigen
    if (activeFilter) {
      return <FilterEntryList filterStatus={activeFilter} />;
    }

    // 2️⃣ Archivansicht aktiv → Archivierte Einträge anzeigen
    if (showArchived) {
      return <ArchivedEntryList entries={filteredArchived} />;
    }

    // 3️⃣ Keine aktiven Einträge → Hinweis anzeigen
    if (filteredActive.length === 0) {
      return <p className="text-gray-500 text-4xl">Keine aktiven Einträge</p>;
    }

    // 4️⃣ Standard: alle aktiven Einträge anzeigen
    return filteredActive.map((entry: Entry) => (
      <EntryCard
        key={entry.id}
        entry={entry}
        onEdit={onEdit}
        onArchive={onArchive}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* Zähler & Filter */}
      <EntryCount
        reloadFlag={reloadFlag}
        setFilterStatus={handleFilterToggle}
        activeFilter={activeFilter}
      />

      {/* Buttons */}
      <ButtonLayout
        onCreate={onCreate}
        showArchived={showArchived}
        toggleArchived={toggleArchived}
      />

      {/* Einträge rendern */}
      {getEntriesToRender()}
    </div>
  );
};

export default EntryList;
