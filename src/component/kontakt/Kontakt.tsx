function Kontakt() {
  return (
    <>
      <div className="flex justify-center items-center  p-4">
        <div className="bg-slate-400 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 text-white">
          <h3 className="text-3xl lg:text-4xl font-bold text-center">
            Kontakt
          </h3>

          <address className="not-italic space-y-2 text-lg">
            <p>
              <span className="font-semibold">E-Mail:</span>{" "}
              <a
                href="mailto:andre-herter@web.de"
                className="text-indigo-200 hover:text-white underline transition"
              >
                andre-herter@web.de
              </a>
            </p>
            <p>
              <span className="font-semibold">Telefon:</span>{" "}
              <a
                href="tel:+490301234567"
                className="text-indigo-200 hover:text-white underline transition"
              >
                +49 (0)30 1234567
              </a>
            </p>
            <p>
              <span className="font-semibold">Adresse:</span> Musterstraße 1,
              10115 Berlin
            </p>
          </address>
        </div>
      </div>
    </>
  );
}

export default Kontakt;
