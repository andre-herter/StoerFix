import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import Logout from "../logout/Logout";
import ButtonLink from "../buttonLink/ButtonLink";
import InputSearch, { InputSearchProps } from "../inputSearch/InputSearch";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";

export default function Header({ query, setQuery }: InputSearchProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header className="bg-gray-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 gap-5">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Dein Unternehmen</span>
            <img alt="Logo" src={logo} className="h-16 w-auto" />
          </Link>
        </div>

        <div className="hidden lg:block w-full max-w-md">
          {user && <InputSearch query={query} setQuery={setQuery} />}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2">
          {user && <ButtonLink text="Einträge anzeigen" to="create" />}
          {user && <Logout />}
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img alt="Logo" src={logo} className="h-8 w-auto" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {user && (
            <div className="mt-6">
              <InputSearch
                id="mobile-search"
                query={query}
                setQuery={setQuery}
              />
            </div>
          )}

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="my-6 grid gap-5">
                {user && <ButtonLink text="Einträge anzeigen" to="create" />}
                {user && <Logout />}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
