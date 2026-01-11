import EntryCard from "../../component/entryCard/EntryCard";
import { Entry } from "../createEntry/CreateEntry";

interface ArchivedEntryListProps {
  entries: Entry[];
}

const ArchivedEntryList: React.FC<ArchivedEntryListProps> = ({ entries }) => {
  if (!entries.length)
    return <p className="text-gray-500 text-4xl">Keine Einträge vorhanden</p>;

  return (
    <div className="flex flex-col gap-4 items-center">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} isArchived />
      ))}
    </div>
  );
};

export default ArchivedEntryList;
