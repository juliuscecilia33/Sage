"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

export default function AuthForm() {
  const supabase = createClientComponentClient();

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      showLinks={false}
      providers={[]}
      redirectTo={`${process.env.DEV_URL}/auth/callback`}
      appearance={{ theme: ThemeSupa }}
    />
  );
}
