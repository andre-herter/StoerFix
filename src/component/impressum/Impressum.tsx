function Impressum() {
  return (
    <>
      <div className="flex justify-center items-center w-screen">
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
