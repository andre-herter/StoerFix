import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Logout fehlgeschlagen");
    } else {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleLogout}
      className="text-sm/6 cursor-pointer px-2 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Logout
    </button>
  );
}

export default Logout;
