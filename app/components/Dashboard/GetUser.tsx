import { ReactNode } from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";

interface ServerComponentProps {
  children: (props: { user: User | null }) => ReactNode;
}

export default async function ServerComponent({
  children,
}: ServerComponentProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <>{children({ user })}</>;
}
