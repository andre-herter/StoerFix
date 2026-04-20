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
  inProgress_by?: string;
  completed: string;
  completed_at: string;
  completed_by?: string;
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
        .select(`*, profiles(username)`)
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
      triggerReload();
    } else {
      console.error("Fehler beim Archivieren:", error);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const trimmedProblem = form.problem.trim();
    const trimmedInProgress = form.inProgress.trim();
    const trimmedCompleted = form.completed.trim();

    if (!trimmedProblem && !trimmedInProgress && !trimmedCompleted) return;

    if (trimmedCompleted && !trimmedInProgress) {
      alert(
        "Eintrag kann nur abgeschlossen werden, wenn er in Bearbeitung ist.",
      );
      return;
    }

    if (!trimmedProblem && (trimmedInProgress || trimmedCompleted)) {
      alert("Bitte zuerst ein Problem eintragen.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const now = new Date().toISOString();
    const currentUsername =
      user?.user_metadata?.username || user?.email || "Unbekannt";

    if (editId) {
      // --- EDIT MODUS ---
      const originalEntry = entries.find((e) => e.id === editId);

      const updateData: any = {
        problem: trimmedProblem,
        inProgress: trimmedInProgress,
        completed: trimmedCompleted,
      };

      if (originalEntry) {
        // Zeitstempel für "inProgress" NUR ändern, wenn der Text sich geändert hat
        if (trimmedInProgress !== (originalEntry.inProgress || "")) {
          updateData.inProgress_at = trimmedInProgress ? now : null;
          updateData.inProgress_by = trimmedInProgress ? currentUsername : null;
        }

        // Zeitstempel für "completed" NUR ändern, wenn der Text sich geändert hat
        if (trimmedCompleted !== (originalEntry.completed || "")) {
          updateData.completed_at = trimmedCompleted ? now : null;
          updateData.completed_by = trimmedCompleted ? currentUsername : null;
        }
      }

      const { error } = await supabase
        .from("entries")
        .update(updateData)
        .eq("id", editId);

      if (!error) triggerReload();
      else console.error("Update Fehler:", error.message);

      setEditId(null);
    } else {
      // --- INSERT MODUS (Neuer Eintrag) ---
      const insertData: any = {
        problem: trimmedProblem,
        inProgress: trimmedInProgress,
        completed: trimmedCompleted,
        user_id: user?.id,
        inProgress_at: trimmedInProgress ? now : null,
        inProgress_by: trimmedInProgress ? currentUsername : null,
        completed_at: trimmedCompleted ? now : null,
        completed_by: trimmedCompleted ? currentUsername : null,
      };

      const { error } = await supabase.from("entries").insert(insertData);

      if (!error) triggerReload();
      else console.error("Insert Fehler:", error.message);
    }

    setForm({ problem: "", inProgress: "", completed: "" });
    setOpen(false);
  };

  const handleEdit = (entry: Entry) => {
    setForm({
      problem: entry.problem || "",
      inProgress: entry.inProgress || "",
      completed: entry.completed || "",
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
          setForm({ problem: "", inProgress: "", completed: "" });
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
