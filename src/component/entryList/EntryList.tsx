import { useEffect } from "react";
import { Entry } from "../createEntry/CreateEntry";
import { LoadUserProfile } from "../loadUserProfile/LoadUserProfile";

interface EntryListProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onEdit }) => {
  useEffect(() => {
    const fetchUsers = async () => {
      const profiles = await LoadUserProfile();
      console.log(profiles);
    };

    fetchUsers();
  }, []);
  if (entries.length === 0) return null;

  const getBgColor = (entry: Entry) => {
    if (entry.problem && entry.inProgress && entry.completed)
      return "bg-green-500";
    if (entry.problem && entry.inProgress) return "bg-yellow-300";
    if (entry.problem) return "bg-red-400";
    return "";
  };

  const textFields: (keyof Entry)[] = ["problem", "inProgress", "completed"];

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {entries.map((entry) => {
        const bgColor = getBgColor(entry);

        return (
          <div
            key={entry.id}
            className="flex flex-row flex-wrap items-end gap-4 bg-slate-300 p-4 rounded-lg shadow-md"
          >
            <div className="h-24 px-6 flex items-center justify-center rounded-md bg-blue-500 text-white font-semibold">
              Benutzer
            </div>
            <div className="flex flex-wrap gap-4">
              {textFields.map((key) => (
                <div key={key} className="flex flex-col items-center">
                  <textarea
                    className={`h-24 w-72 p-2 border rounded resize-none ${bgColor}`}
                    value={entry[key] ? String(entry[key]) : ""}
                    readOnly
                  />
                </div>
              ))}
            </div>

            <button
              className="h-24 px-6 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => onEdit(entry)}
            >
              Ändern
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EntryList;
