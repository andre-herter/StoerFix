import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Gespeicherte Daten:", formData);
    alert("Daten gespeichert!");
  };

  return (
    <>
      <div className="flex justify-start">
        <Link to="/" className="flex flex-row-reverse gap-2 m-4">
          Zurück
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </div>
      <div className=" flex justify-center items-center min-h-[65vh] ">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-400 shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benutzername
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Dein Benutzername"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@email.de"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-400 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
