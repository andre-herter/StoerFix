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
      console.log("Daten:", data);
      console.log("Fehler:", error);

      if (!error && data) {
        setEntries((prev) => [...prev, data[0]]);
      }
    }

    setForm({ problem: "", inProgress: "", completed: "" });
  };

  const handleEdit = (entry: Entry) => {
    setForm({
      problem: entry.problem,
      inProgress: entry.inProgress,
      completed: entry.completed,
    });
    setEditId(entry.id);
  };

  return (
    <div className="flex flex-col text-black gap-6 p-6 min-h-screen">
      <EntryForm
        form={form}
        onChange={handleChange}
        onSave={handleSave}
        isEditing={!!editId}
      />
      <EntryList entries={entries} onEdit={handleEdit} />
    </div>
  );
}

export default CreateEntry;
