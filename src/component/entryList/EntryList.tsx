import EntryCard from "../../component/entryCard/EntryCard";
import ArchivedEntryList from "../archivedEntryList/ArchivedEntryList";
import { Entry } from "../createEntry/CreateEntry";
import ButtonLayout from "../buttonLayout/ButtonLayout";

interface EntryListProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onArchive: (entry: Entry) => void;
  query: string;
  showArchived: boolean;
  toggleArchived: () => void;
  onCreate: () => void;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  onEdit,
  onArchive,
  query,
  showArchived,
  toggleArchived,
  onCreate,
}) => {
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
      <ButtonLayout
        onCreate={onCreate}
        showArchived={showArchived}
        toggleArchived={toggleArchived}
      />

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
