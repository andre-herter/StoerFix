import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            StörFix
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed sm:text-xl">
            Willkommen bei{" "}
            <span className="font-semibold text-indigo-400">StörFix</span> –
            Ihrem Portal für Störungsmeldungen. Melden Sie technische Störungen,
            Ausfälle oder andere Probleme schnell, einfach und zentral – direkt
            über die App. Alle Meldungen werden übersichtlich erfasst und
            priorisiert, sodass Sie jederzeit den aktuellen Status im Blick
            behalten. So bleibt Ihr Betrieb transparent, effizient und bestens
            organisiert.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="rounded-xl bg-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              to="/register"
              className="text-base font-semibold text-gray-200 hover:text-indigo-400 transition"
            >
              Registrieren <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
