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

  // 🔹 Supabase: Einträge laden
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

    const newEntry: Entry = {
      id: crypto.randomUUID(),
      ...form,
    };

    // 🔹 Supabase: Speichern
    const { error } = await supabase.from("entries").insert([newEntry]);
    if (error) {
      console.error("Fehler beim Speichern:", error);
      return;
    }

    // 🔹 Lokal updaten
    setEntries((prev) => [...prev, newEntry]);
    setForm({ problem: "", inProgress: "", completed: "" });
  };

  return (
    <div className="flex flex-col text-black gap-6 p-6 min-h-screen">
      <EntryForm form={form} onChange={handleChange} onSave={handleSave} />
      <EntryList entries={entries} />
    </div>
  );
}

export default CreateEntry;
