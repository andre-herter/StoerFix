import React from "react";
import { Entry } from "../createEntry/CreateEntry";

interface EntryListProps {
  entries: Entry[];
}

const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center">
      {entries.map((entry, index) => (
        <div key={index} className="flex flex-row items-end gap-2">
          <div className="h-24 px-6 flex items-center  rounded-md bg-blue-500 text-white">
            Benutzer
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { key: "problem", className: "bg-red-100" },
              {
                key: "inProgress",
                className: "bg-yellow-100",
              },
              {
                key: "completed",
                className: "bg-green-100",
              },
            ].map(({ key, className }) => (
              <div key={key} className="flex flex-col items-center">
                <textarea
                  className={`h-24 w-72 p-2 border rounded resize-none ${className}`}
                  value={entry[key as keyof typeof entry] || ""}
                  readOnly
                />
              </div>
            ))}
          </div>

          <button className="h-24 px-6 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Ändern
          </button>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
