import { ChangeEvent } from "react";

export interface InputSearchProps {
  id?: string;
  query: string;
  setQuery: (value: string) => void;
}

export default function InputSearch({ id, query, setQuery }: InputSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <input
      id={id}
      name="id"
      className="w-full rounded-lg px-3 py-2 bg-white text-black"
      placeholder="Suche in Einträgen…"
      value={query}
      onChange={handleChange}
    />
  );
}
