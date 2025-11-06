import { useState } from "react";
import EntryForm from "../entryForm/EntryForm";
import EntryList from "../entryList/EntryList";

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

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.problem && !form.inProgress && !form.completed) return;

    const newEntry: Entry = {
      id: crypto.randomUUID(),
      ...form,
    };

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
