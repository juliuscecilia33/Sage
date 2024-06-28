"use client";

import { useEffect, useState } from "react";
import Main from "../components/Dashboard/Main";
import { getUser } from "@/utils/supabase/server"; // Updated import for user fetching
import { useCurrentBookDataContext } from "../context/CurrentBookData";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { setUserId } = useCurrentBookDataContext();

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await getUser();
      if (error || !data?.user) {
        // Redirect on client side
        window.location.href = "/login";
      } else {
        setUser(data.user);
        setUserId(data.user?.id);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  console.log("user:", user);
  console.log("user id:", user?.id);
  // add user id to context

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  return <Main user={user} />;
}
