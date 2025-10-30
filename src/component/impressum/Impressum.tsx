import { Link } from "react-router-dom";

function Impressum() {
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
      <div className="flex justify-center items-center min-h-[65vh]">
        <div className="bg-slate-400 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 text-white">
          <div className="text-center">
            <h2 className="text-3xl lg:4xl font-bold mt-5">Impressum</h2>
            <h3 className="text-xl lg:text-2xl font-bold mt-8">
              Angaben gemäß § 5 TMG
            </h3>
            <p>Vorname Nachname</p>
            <p>Straße Hausnummer</p>
            <p>PLZ Ortsname</p>
            <h3 className="text-xl lg:text-2xl font-bold mt-8">Kontakt</h3>
            <p>Telefon: 0123/456789</p>
            <p>E-Mail: andre-herter@web.de</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Impressum;
