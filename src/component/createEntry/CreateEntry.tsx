import { useState, useEffect } from "react";
import EntryForm from "../entryForm/EntryForm";
import EntryList from "../entryList/EntryList";
import { supabase } from "../../supabaseClient";

export interface Entry {
  id: string;
  problem: string;
  inProgress: string;
  completed: string;
}

function CreateEntry() {
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
      const { data, error } = await supabase.from("entries").select("*");
      if (error) console.error("Fehler beim Laden:", error);
      else setEntries(data as Entry[]);
    };

    fetchEntries();
  }, []);

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
        .select();

      if (!error && data) {
        setEntries((prev) => [...prev, data[0]]);
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
        className="flex justify-center mt-5 rounded-xl bg-indigo-500 w-50  px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
        onClick={() => setOpen(true)}
      >
        Neuen Eintrag erstellen
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
        <EntryList entries={entries} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default CreateEntry;
