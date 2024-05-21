import { createClient } from "@/utils/supabase/server";
import "@fontsource/archivo"; // Add this line

import { colors } from "../styles/colors";
import Navbar from "../components/Main/Navbar";
import Hero from "@/components/Main/Hero";

import { titleFont } from "@/utils/fonts";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex w-full h-full">
      <div className="w-1/6 bg-blue-500 h-full">test</div>
      <div className={`w-4/6 ${colors.primary.default}`}>
        <Navbar />
        <Hero bookTitle="Genesis" chapterCount={6} />
        <div className={`w-full bg-[#FBFCFD] ${titleFont.className}`}>
          Gensis
        </div>
      </div>
      <div className={`w-1/6 bg-blue-500 h-full`}>test</div>
    </div>
  );
}
