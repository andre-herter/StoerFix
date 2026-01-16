import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

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
