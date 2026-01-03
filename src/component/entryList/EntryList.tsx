import { useState } from "react";
import EntryCard from "../../component/entryCard/EntryCard";
import ArchivedEntryList from "../archivedEntryList/ArchivedEntryList";
import { Entry } from "../createEntry/CreateEntry";

interface EntryListProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onArchive: (entry: Entry) => void;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  onEdit,
  onArchive,
}) => {
  const [showArchived, setShowArchived] = useState(false);

  const activeEntries = entries.filter((e) => !e.archived);
  const archivedEntries = entries.filter((e) => e.archived);

  return (
    <div className="flex flex-col gap-4 items-center">
      <button
        onClick={() => setShowArchived((prev) => !prev)}
        className="mb-4 px-4 py-2 rounded-lg border bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {showArchived ? "Aktive Einträge anzeigen" : "Archiv anzeigen"}
      </button>

      {showArchived ? (
        <ArchivedEntryList entries={archivedEntries} />
      ) : !activeEntries.length ? (
        <p className="text-gray-500">Keine aktiven Einträge</p>
      ) : (
        activeEntries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onEdit={onEdit}
            onArchive={onArchive}
          />
        ))
      )}
    </div>
  );
};

export default EntryList;
