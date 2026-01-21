interface ButtonLayoutProps {
  onCreate: () => void;
  showArchived: boolean;
  toggleArchived: () => void;
}

function ButtonLayout({
  onCreate,
  showArchived,
  toggleArchived,
}: ButtonLayoutProps) {
  return (
    <div className="flex flex-row justify-center items-center gap-2 mt-5">
      <button
        className="flex items-center gap-3 rounded-xl bg-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
        onClick={onCreate}
      >
        <span>Eintrag erstellen</span>

        <svg
          width="28"
          height="28"
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

      <button
        onClick={toggleArchived}
        className="flex items-center gap-3 rounded-xl bg-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
      >
        {showArchived ? "Aktive Einträge anzeigen" : "Archiv anzeigen"}
        <svg
          width="28"
          height="28"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="8" width="112" height="112" rx="24" fill="#4f46e5" />
          <rect x="36" y="32" width="56" height="64" rx="8" fill="#ffffff" />
          <rect x="44" y="46" width="40" height="6" rx="3" fill="#22c55e" />
          <rect x="44" y="60" width="40" height="6" rx="3" fill="#facc15" />
          <rect x="44" y="74" width="28" height="6" rx="3" fill="#3b82f6" />
          <rect x="82" y="76" width="4" height="16" rx="2" fill="#ffffff" />
          <rect x="76" y="82" width="16" height="4" rx="2" fill="#ffffff" />
        </svg>
      </button>
    </div>
  );
}

export default ButtonLayout;
