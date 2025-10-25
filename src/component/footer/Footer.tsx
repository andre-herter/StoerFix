function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">MeineFirma</h2>
          <p className="text-sm leading-relaxed">
            Wir entwickeln digitale Lösungen, die Menschen verbinden und Marken
            stärken.
          </p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white mb-3">Kontakt</h3>
          <ul className="space-y-1 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:info@meinefirma.de"
                className="hover:text-white transition"
              >
                info@meinefirma.de
              </a>
            </li>
            <li>
              Telefon:{" "}
              <a
                href="tel:+490301234567"
                className="hover:text-white transition"
              >
                +49 (0)30 1234567
              </a>
            </li>
            <li>Adresse: Musterstraße 1, 10115 Berlin</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}

export default Footer;
