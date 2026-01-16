import { useState } from "react";
import EntryCard from "../../component/entryCard/EntryCard";
import ArchivedEntryList from "../archivedEntryList/ArchivedEntryList";
import { Entry } from "../createEntry/CreateEntry";

interface EntryListProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onArchive: (entry: Entry) => void;
  query: string;
  showArchived: boolean;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  onEdit,
  onArchive,
  query,
}) => {
  const [showArchived, setShowArchived] = useState(false);

  const activeEntries = entries.filter((e) => !e.archived);
  const archivedEntries = entries.filter((e) => e.archived);

  const filteredActive = activeEntries.filter((e) => {
    const text = [e.problem, e.inProgress, e.completed, e.profiles?.username]
      .join(" ")
      .toLowerCase();

    return text.includes(query.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <button
        onClick={() => setShowArchived((prev) => !prev)}
        className="mb-2 px-4 py-2 rounded-lg bg-indigo-500 text-white shadow-md hover:bg-indigo-400"
      >
        {showArchived ? "Aktive Einträge anzeigen" : "Archiv anzeigen"}
      </button>

      {showArchived ? (
        <ArchivedEntryList entries={archivedEntries} />
      ) : !filteredActive.length ? (
        <p className="text-gray-500 text-4xl">Keine aktiven Einträge</p>
      ) : (
        filteredActive.map((entry) => (
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
