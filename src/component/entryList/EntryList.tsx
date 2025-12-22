import { Entry } from "../createEntry/CreateEntry";

interface EntryListProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onEdit }) => {
  if (entries.length === 0) return null;

  const getBgColor = (entry: Entry) => {
    if (entry.problem && entry.inProgress && entry.completed)
      return "bg-green-500";
    if (entry.problem && entry.inProgress) return "bg-yellow-300";
    if (entry.problem) return "bg-red-400";
    return "";
  };

  const textFields: (keyof Entry)[] = ["problem", "inProgress", "completed"];
  const labelText: Record<string, string> = {
    problem: "Problem",
    inProgress: "In Bearbeitung",
    completed: "Erledigt",
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {entries.map((entry) => {
        const bgColor = getBgColor(entry);

        return (
          <>
            <div
              key={entry.id}
              className="flex flex-row flex-wrap items-end gap-4 bg-slate-300 p-4 rounded-lg shadow-md"
            >
              <div className="h-24 px-6 flex flex-col items-center justify-center rounded-md bg-blue-500 text-white font-semibold">
                <span>{entry.profiles?.username}</span>
                <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                <span className="flex items-center justify-center gap-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {new Date(entry.created_at).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                {textFields.map((key) => (
                  <div key={key} className="flex flex-col items-center">
                    <label className="text-sm font-medium text-slate-700">
                      {labelText[key] ?? key}
                    </label>
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
          </>
        );
      })}
    </div>
  );
};

export default EntryList;
