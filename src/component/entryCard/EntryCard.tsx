import { Entry } from "../createEntry/CreateEntry";

interface EntryCardProps {
  entry: Entry;
  onEdit?: (entry: Entry) => void;
  onArchive?: (entry: Entry) => void;
  isArchived?: boolean;
}

const EntryCard: React.FC<EntryCardProps> = ({
  entry,
  onEdit,
  onArchive,
  isArchived = false,
}) => {
  const getBgColor = () => {
    if (entry.problem && entry.inProgress && entry.completed)
      return "bg-green-500";
    if (entry.problem && entry.inProgress) return "bg-yellow-300";
    if (entry.problem) return "bg-red-400";
    return "bg-slate-200";
  };

  const textFields: (keyof Entry)[] = ["problem", "inProgress", "completed"];

  const labelText: Record<string, string> = {
    problem: "Problem",
    inProgress: "In Bearbeitung",
    completed: "Erledigt",
  };

  const canArchive = !!entry.completed?.trim() && !entry.archived;

  return (
    <div
      className={`flex flex-col items-center justify-center w-full lg:flex-row flex-wrap gap-4 p-4 rounded-lg shadow-md lg:items-end ${
        isArchived ? "bg-slate-100 opacity-60 w-full" : "bg-slate-300"
      }`}
    >
      <div className="h-24 px-6 flex flex-col items-center justify-center rounded-md bg-blue-500 text-white font-semibold">
        <span>{entry.profiles?.username}</span>
        <span>
          {new Date(entry.created_at).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
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

      <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:items-start">
        {textFields.map((key) => {
          const uniqueId = `field-${key}-${crypto.randomUUID()}`;

          return (
            <div key={uniqueId} className="flex flex-col items-center">
              <label
                className="text-sm font-medium text-slate-700 mb-2"
                htmlFor={uniqueId}
              >
                {labelText[key] ?? key}
              </label>

              <textarea
                id={uniqueId}
                className={`h-24 w-72 lg:w-72 p-2 border rounded resize-none ${getBgColor()}`}
                value={entry[key] ? String(entry[key]) : ""}
                readOnly
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {onEdit && (
          <button
            className="h-11 px-6 bg-blue-500 text-white rounded"
            onClick={() => onEdit(entry)}
            disabled={isArchived}
          >
            Ändern
          </button>
        )}

        {onArchive && !isArchived && (
          <button
            className={`h-11 px-6 rounded text-white
              ${
                canArchive
                  ? "bg-slate-600 hover:bg-slate-700"
                  : "bg-slate-400 cursor-not-allowed"
              }`}
            onClick={() => onArchive(entry)}
            disabled={!canArchive}
          >
            Archivieren
          </button>
        )}
      </div>
    </div>
  );
};

export default EntryCard;
