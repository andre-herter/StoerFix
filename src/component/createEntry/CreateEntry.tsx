import { useState, useEffect } from "react";
import EntryForm from "../entryForm/EntryForm";
import EntryList from "../entryList/EntryList";
import { supabase } from "../../supabaseClient";
import { InputSearchProps } from "../inputSearch/InputSearch";

export interface Entry {
  id: string;
  problem: string;
  inProgress: string;
  inProgress_at: string;
  completed: string;
  completed_at: string;
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
  const [showArchived, setShowArchived] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  const triggerReload = () => setReloadFlag((v) => v + 1);

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
  }, [reloadFlag]);

  const handleArchive = async (entry: Entry) => {
    const { error } = await supabase
      .from("entries")
      .update({ archived: true })
      .eq("id", entry.id);

    if (!error) {
      setEntries((prev) =>
        prev.map((e) => (e.id === entry.id ? { ...e, archived: true } : e)),
      );
      triggerReload();
    } else {
      console.error("Fehler beim Archivieren:", error);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (
      !form.problem.trim() &&
      !form.inProgress.trim() &&
      !form.completed.trim()
    )
      return;

    if (form.completed.trim() && !form.inProgress.trim()) {
      alert(
        "Eintrag kann nur abgeschlossen werden, wenn er in Bearbeitung ist.",
      );
      return;
    }

    if (
      !form.problem.trim() &&
      (form.inProgress.trim() || form.completed.trim())
    ) {
      alert("Bitte zuerst ein Problem eintragen.");
      return;
    }

    const now = new Date().toISOString();

    if (editId) {
      const updateData: any = {
        problem: form.problem,
        inProgress: form.inProgress,
        completed: form.completed,
      };

      updateData.inProgress_at = form.inProgress.trim() ? now : null;
      updateData.completed_at = form.completed.trim() ? now : null;

      const { error } = await supabase
        .from("entries")
        .update(updateData)
        .eq("id", editId);

      if (!error) {
        triggerReload();
      } else {
        console.error("Update Fehler:", error.message);
      }
      setEditId(null);
    } else {
      const insertData: any = {
        problem: form.problem,
        inProgress: form.inProgress,
        completed: form.completed,
        inProgress_at: form.inProgress.trim() ? now : null,
        completed_at: form.completed.trim() ? now : null,
      };

      const { data, error } = await supabase
        .from("entries")
        .insert(insertData)
        .select(`*, profiles(username)`);

      if (!error && data) {
        triggerReload();
      } else {
        console.error("Insert Fehler:", error.message);
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
          showArchived={showArchived}
          query={query}
          toggleArchived={() => setShowArchived((prev) => !prev)}
          onCreate={() => setOpen(true)}
          reloadFlag={reloadFlag}
        />
      </div>
    </div>
  );
}

export default CreateEntry;
