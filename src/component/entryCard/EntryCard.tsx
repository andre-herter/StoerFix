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

  // --- HILFSFUNKTIONEN FÜR DYNAMISCHE INFOS ---

  const getTimestamp = (key: keyof Entry) => {
    if (key === "inProgress") return entry.inProgress_at;
    if (key === "completed") return entry.completed_at;
    return entry.created_at;
  };

  const getCurrentuser = (key: keyof Entry) => {
    // Falls ein spezifischer Bearbeiter existiert, diesen nehmen
    if (key === "inProgress") return entry.inProgress_by;
    if (key === "completed") return entry.completed_by;
    // Standardmäßig den Ersteller aus der profiles-Relation
    return entry.profiles?.username ?? "System";
  };

  const canArchive = !!entry.completed?.trim() && !entry.archived;

  return (
    <div
      className={`flex flex-col items-center justify-center w-full lg:flex-row flex-wrap gap-4 p-4 rounded-lg shadow-md lg:items-end ${
        isArchived ? "bg-slate-100 opacity-60 w-full" : "bg-slate-300"
      }`}
    >
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:items-start">
        {textFields.map((key) => {
          const uniqueId = `field-${key}-${crypto.randomUUID()}`;
          const rawDate = getTimestamp(key);
          const username = getCurrentuser(key);

          return (
            <div key={uniqueId} className="flex flex-col items-center">
              <div className="flex flex-col gap-1 w-full px-1">
                <label
                  className="text-sm text-center font-bold text-slate-800"
                  htmlFor={uniqueId}
                >
                  {labelText[key] ?? key}
                </label>

                {/* Info-Zeile: Zeigt User und Zeitstempel */}
                <div className="flex items-center justify-center h-4 gap-2 text-[10px] sm:text-xs text-slate-600 mb-1">
                  <span className="font-semibold text-slate-700">
                    {username}
                  </span>

                  {rawDate && (
                    <>
                      <span>•</span>
                      <span>
                        {new Date(rawDate).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        {new Date(rawDate).toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <textarea
                id={uniqueId}
                className={`h-24 w-72 p-2 border border-slate-400 rounded shadow-inner resize-none text-sm font-medium leading-relaxed ${getBgColor()} text-slate-900 placeholder-slate-500`}
                value={entry[key] ? String(entry[key]) : ""}
                readOnly
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 ml-2">
        {onEdit && (
          <button
            className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors shadow-sm"
            onClick={() => onEdit(entry)}
            disabled={isArchived}
          >
            Ändern
          </button>
        )}

        {onArchive && !isArchived && (
          <button
            className={`h-10 px-5 rounded text-white font-medium transition-colors shadow-sm
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
