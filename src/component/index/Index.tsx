function Index() {
  return (
    <>
      <div className="relative isolate px-6 p-5 lg:px-8">
        <div className="mx-auto max-w-2xl py-10 sm:py-15 lg:py-15">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              StörFix
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Willkommen bei Störfix – Ihrem Portal für Störungsmeldungen mit
              Störfix melden Sie technische Störungen, Ausfälle oder andere
              Probleme schnell, einfach und zentral – direkt über die App. Alle
              Meldungen werden übersichtlich erfasst und priorisiert, sodass Sie
              jederzeit den aktuellen Status im Blick behalten. So bleibt Ihr
              Betrieb transparent, effizient und bestens organisiert.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Log in <span>&rarr;</span>
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white">
                Registrieren <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
