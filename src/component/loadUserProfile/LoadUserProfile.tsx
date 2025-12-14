import { supabase } from "../../supabaseClient";

export const LoadUserProfile = async () => {
  // 1. Eingeloggten User holen
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    console.error("User konnte nicht geladen werden:", authError);
    return { user: null, username: null };
  }

  const user = authData.user;
  // 2. Username aus profiles Tabelle holen
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Profile Ladefehler:", error);
    return { user, username: null };
  }

  return { user, username: data.username };
};
