import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface EntryFormProps {
  form: {
    problem: string;
    inProgress: string;
    completed: string;
  };
  onChange: (field: keyof EntryFormProps["form"], value: string) => void;
  onSave: () => void;
  isEditing: boolean;
}

const EntryForm: React.FC<EntryFormProps> = ({
  form,
  onChange,
  onSave,
  isEditing,
}) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsername(user?.user_metadata?.username ?? "Benutzer");
    };

    fetchUser();
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

  return (
    <div className="flex flex-wrap justify-center items-end gap-4">
      <div className="h-24 px-6 flex items-center justify-center rounded-md bg-blue-500 text-white font-semibold">
        {username}
      </div>

      {fields.map(({ key, label, colorClasses, placeholder }) => (
        <div key={key} className="flex flex-col">
          <label
            className={`block mb-2 font-medium text-center ${colorClasses.text}`}
          >
            {label}
          </label>
          <textarea
            className={`w-72 h-24 rounded-md resize-none ${colorClasses.bg} p-2 border border-gray-400 focus:outline-none focus:ring-2 ${colorClasses.ring}`}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => onChange(key, e.target.value)}
          />
        </div>
      ))}

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
        {isEditing ? "Speichern" : "Speichern"}
      </button>
    </div>
  );
};

export default EntryForm;
