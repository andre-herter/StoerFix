import { supabase } from "../../supabaseClient";

export const LoadUserProfile = async () => {
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    console.error("User konnte nicht geladen werden:", authError);
    return { user: null, username: null };
  }

  const user = authData.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (!profileError && profile) {
    return { user, username: profile.username };
  }

  if (profileError?.code === "PGRST116") {
    const username = user.user_metadata?.username;

    if (!username) {
      console.error("Kein Username in user_metadata gefunden");
      return { user, username: null };
    }

    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      username,
    });

    if (insertError) {
      console.error("Profil konnte nicht erstellt werden:", insertError);
      return { user, username: null };
    }

    return { user, username };
  }

  console.error("Profile Ladefehler:", profileError);
  return { user, username: null };
};
