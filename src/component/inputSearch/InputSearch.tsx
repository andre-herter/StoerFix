import { ChangeEvent, useEffect, useState } from "react";

export interface InputSearchProps {
  id?: string;
  query: string;
  setQuery: (value: string) => void;
  debounceMs?: number;
}

export default function InputSearch({
  id,
  query,
  setQuery,
  debounceMs = 500,
}: InputSearchProps) {
  const [value, setValue] = useState(query);

  // 1. Lokalen State beim Tippen sofort aktualisieren
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // 2. Debounce: Den Parent-State verzögert aktualisieren
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Nur updaten, wenn der Wert tatsächlich anders ist
      if (value !== query) {
        setQuery(value);
      }
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [value, query, setQuery, debounceMs]);

  // 3. Sync: Lokalen State anpassen, wenn query von außen geändert wird (z.B. "Filter löschen")
  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <input
      id={id}
      name="search"
      type="search"
      className="w-full rounded-lg px-3 py-2 bg-slate-300 text-black outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
      placeholder="Suche in Einträgen…"
      value={value}
      onChange={handleChange}
    />
  );
}
