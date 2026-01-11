import React, { useEffect, useState } from "react";
import { LoadUserProfile } from "../loadUserProfile/LoadUserProfile";

interface EntryFormProps {
  form: {
    problem: string;
    inProgress: string;
    completed: string;
  };
  onChange: (field: keyof EntryFormProps["form"], value: string) => void;
  onSave: () => void;
  isEditing: boolean;
  open: boolean;
  onClose: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({
  form,
  onChange,
  onSave,
  isEditing,
  open,
  onClose,
}) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { username } = await LoadUserProfile();
      setUsername(username);
    };

    fetchProfile();
  }, []);

  const fields = [
    {
      key: "problem" as const,
      label: "Problem",
      colorClasses: {
        text: "text-red-500",
        bg: "bg-red-300",
        ring: "focus:ring-red-400",
      },
      placeholder: "Beschreibe das Problem oder die Aufgabe...",
    },
    {
      key: "inProgress" as const,
      label: "In Bearbeitung",
      colorClasses: {
        text: "text-yellow-500",
        bg: "bg-yellow-200",
        ring: "focus:ring-yellow-400",
      },
      placeholder: "Was wird gerade bearbeitet?",
    },
    {
      key: "completed" as const,
      label: "Erledigt",
      colorClasses: {
        text: "text-green-500",
        bg: "bg-green-200",
        ring: "focus:ring-green-400",
      },
      placeholder: "Was wurde abgeschlossen?",
    },
  ];

  const isEmpty = !form.problem && !form.inProgress && !form.completed;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-200 rounded-lg p-6 shadow-lg max-w-6xl w-full
             flex flex-col           
             items-center justify-center
             xl:flex-row
             xl:items-end lg:justify-center
             flex-wrap gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-24 px-6 flex items-center justify-center rounded-md bg-blue-500 text-white font-semibold">
          {username || "Lade Username..."}
        </div>

        {fields.map(({ key, label, colorClasses, placeholder }) => (
          <div key={key} className="flex flex-col">
            <label
              className={`block mb-2 font-medium text-center ${colorClasses.text}`}
              htmlFor={key}
            >
              {label}
            </label>
            <textarea
              id={key}
              className={`w-72 h-24 rounded-md resize-none ${colorClasses.bg} p-2 border border-gray-400 focus:outline-none focus:ring-2 ${colorClasses.ring}`}
              placeholder={placeholder}
              value={form[key]}
              onChange={(e) => onChange(key, e.target.value)}
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onSave}
            disabled={isEmpty}
            className={`h-24 px-6 flex items-center justify-center ${
              isEmpty
                ? "bg-gray-400 cursor-not-allowed"
                : isEditing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded-lg shadow-md transition-all duration-200`}
          >
            Speichern
          </button>

          <button
            onClick={onClose}
            className="h-10 px-6 bg-gray-300 hover:bg-gray-400 rounded-md font-medium"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryForm;
