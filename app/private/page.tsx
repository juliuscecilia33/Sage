import { redirect } from "next/navigation";

import { createClient } from "@/lib/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <p className="text-black">Hello {data.user.email}</p>;
}
