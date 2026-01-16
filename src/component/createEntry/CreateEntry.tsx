import { useState, useEffect } from "react";
import EntryForm from "../entryForm/EntryForm";
import EntryList from "../entryList/EntryList";
import { supabase } from "../../supabaseClient";
import { InputSearchProps } from "../inputSearch/InputSearch";

export interface Entry {
  id: string;
  problem: string;
  inProgress: string;
  completed: string;
  created_at: string;
  profiles?: {
    username: string;
  };
  archived: boolean;
}

function CreateEntry({ query }: InputSearchProps) {
  const [form, setForm] = useState({
    problem: "",
    inProgress: "",
    completed: "",
  });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("entries")
        .select(`*,profiles(username)`)
        .order("created_at", { ascending: false });

      if (error) console.error("Fehler beim Laden:", error);
      else setEntries(data as Entry[]);
    };

    fetchEntries();
  }, []);

  const handleArchive = async (entry: Entry) => {
    const { error } = await supabase
      .from("entries")
      .update({ archived: true })
      .eq("id", entry.id);

    if (!error) {
      setEntries((prev) =>
        prev.map((e) => (e.id === entry.id ? { ...e, archived: true } : e))
      );
    } else {
      console.error("Fehler beim Archivieren:", error);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.problem && !form.inProgress && !form.completed) return;

    if (form.completed && !form.inProgress) {
      alert(
        "Eintrag kann nur abgeschlossen werden, wenn er in Bearbeitung ist."
      );
      return;
    }

    if (!form.problem && (form.inProgress || form.completed)) {
      alert(
        "Bitte zuerst ein Problem eintragen, bevor du etwas in Bearbeitung setzt."
      );
      return;
    }

    if (editId) {
      const { error } = await supabase
        .from("entries")
        .update({
          problem: form.problem,
          inProgress: form.inProgress,
          completed: form.completed,
        })
        .eq("id", editId);

      if (!error) {
        setEntries((prev) =>
          prev.map((e) => (e.id === editId ? { ...e, ...form } : e))
        );
      }
      setEditId(null);
    } else {
      const { data, error } = await supabase
        .from("entries")
        .insert({
          problem: form.problem,
          inProgress: form.inProgress,
          completed: form.completed,
        })
        .select(`*, profiles(username)`);

      if (!error && data) {
        setEntries((prev) =>
          [...prev, data[0]].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
      }
    }

    setForm({ problem: "", inProgress: "", completed: "" });
    setOpen(false);
  };

  const handleEdit = (entry: Entry) => {
    setForm({
      problem: entry.problem,
      inProgress: entry.inProgress,
      completed: entry.completed,
    });
    setEditId(entry.id);
    setOpen(true);
  };

  return (
    <div className="flex flex-col items-center text-black min-h-screen">
      <button
        className="flex items-center gap-3 mt-5 rounded-xl bg-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
        onClick={() => setOpen(true)}
      >
        <span>Eintrag erstellen</span>

        <svg
          width="40"
          height="40"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="8" width="112" height="112" rx="24" fill="#4f46e5" />
          <rect x="36" y="32" width="56" height="64" rx="8" fill="#ffffff" />
          <rect x="44" y="46" width="40" height="6" rx="3" fill="#22c55e" />
          <rect x="44" y="60" width="40" height="6" rx="3" fill="#facc15" />
          <rect x="44" y="74" width="28" height="6" rx="3" fill="#3b82f6" />
          <circle cx="84" cy="84" r="16" fill="#22c55e" />
          <rect x="82" y="76" width="4" height="16" rx="2" fill="#ffffff" />
          <rect x="76" y="82" width="16" height="4" rx="2" fill="#ffffff" />
        </svg>
      </button>

      <EntryForm
        form={form}
        onChange={handleChange}
        onSave={handleSave}
        isEditing={!!editId}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditId(null);
          setForm({
            problem: "",
            inProgress: "",
            completed: "",
          });
        }}
      />

      <div className="p-6">
        <EntryList
          entries={entries}
          onEdit={handleEdit}
          onArchive={handleArchive}
          showArchived={false}
          query={query}
        />
      </div>
    </div>
  );
}

export default CreateEntry;
