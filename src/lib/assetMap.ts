// Maps raw /assets/ paths (as stored in DB) to Vite-bundled asset URLs
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";
import property7 from "@/assets/property-7.jpg";
import property8 from "@/assets/property-8.jpg";
import property9 from "@/assets/property-9.jpg";
import property10 from "@/assets/property-10.jpg";
import moneyHeist1 from "@/assets/money-heist-1.jpg";
import moneyHeist2 from "@/assets/money-heist-2.jpg";
import moneyHeist3 from "@/assets/money-heist-3.jpg";
import moneyHeist4 from "@/assets/money-heist-4.jpg";
import moneyHeist5 from "@/assets/money-heist-5.jpg";
import moneyHeist6 from "@/assets/money-heist-6.jpg";
import moneyHeist7 from "@/assets/money-heist-7.jpg";
import moneyHeist8 from "@/assets/money-heist-8.jpg";
import moneyHeist9 from "@/assets/money-heist-9.jpg";
import batman1 from "@/assets/batman-1.jpg";
import batman2 from "@/assets/batman-2.jpg";
import batman3 from "@/assets/batman-3.jpg";
import batman4 from "@/assets/batman-4.jpg";
import batman5 from "@/assets/batman-5.jpg";
import batman6 from "@/assets/batman-6.jpg";
import batman7 from "@/assets/batman-7.jpg";
import batman8 from "@/assets/batman-8.jpg";
import batman9 from "@/assets/batman-9.jpg";
import batman10 from "@/assets/batman-10.jpg";
import goldHut1 from "@/assets/gold-hut-1.jpg";
import goldHut2 from "@/assets/gold-hut-2.jpg";
import goldHut3 from "@/assets/gold-hut-3.jpg";
import goldHut4 from "@/assets/gold-hut-4.jpg";
import goldHut5 from "@/assets/gold-hut-5.jpg";
import goldHut6 from "@/assets/gold-hut-6.jpg";
import goldHut7 from "@/assets/gold-hut-7.jpg";
import goldHut8 from "@/assets/gold-hut-8.jpg";
import goldHut9 from "@/assets/gold-hut-9.jpg";
import diamondHut1 from "@/assets/diamond-hut-1.jpg";
import diamondHut2 from "@/assets/diamond-hut-2.jpg";
import diamondHut3 from "@/assets/diamond-hut-3.jpg";
import diamondHut4 from "@/assets/diamond-hut-4.jpg";
import diamondHut5 from "@/assets/diamond-hut-5.jpg";
import diamondHut6 from "@/assets/diamond-hut-6.jpg";
import platinumHut1 from "@/assets/platinum-hut-1.jpg";
import platinumHut2 from "@/assets/platinum-hut-2.jpg";
import platinumHut3 from "@/assets/platinum-hut-3.jpg";
import platinumHut4 from "@/assets/platinum-hut-4.jpg";
import platinumHut5 from "@/assets/platinum-hut-5.jpg";
import platinumHut6 from "@/assets/platinum-hut-6.jpg";
import execApt1 from "@/assets/exec-apt-1.jpg";
import execApt2 from "@/assets/exec-apt-2.jpg";
import execApt3 from "@/assets/exec-apt-3.jpg";
import execApt4 from "@/assets/exec-apt-4.jpg";
import execApt5 from "@/assets/exec-apt-5.jpg";
import execApt6 from "@/assets/exec-apt-6.jpg";
import execApt7 from "@/assets/exec-apt-7.jpg";
import studioApt1 from "@/assets/studio-apt-1.jpg";
import studioApt2 from "@/assets/studio-apt-2.jpg";
import studioApt3 from "@/assets/studio-apt-3.jpg";
import studioApt4 from "@/assets/studio-apt-4.jpg";
import studioApt5 from "@/assets/studio-apt-5.jpg";
import studioApt6 from "@/assets/studio-apt-6.jpg";

const assetMap: Record<string, string> = {
  "/assets/property-1.jpg": property1,
  "/assets/property-2.jpg": property2,
  "/assets/property-3.jpg": property3,
  "/assets/property-4.jpg": property4,
  "/assets/property-5.jpg": property5,
  "/assets/property-6.jpg": property6,
  "/assets/property-7.jpg": property7,
  "/assets/property-8.jpg": property8,
  "/assets/property-9.jpg": property9,
  "/assets/property-10.jpg": property10,
  "/assets/money-heist-1.jpg": moneyHeist1,
  "/assets/money-heist-2.jpg": moneyHeist2,
  "/assets/money-heist-3.jpg": moneyHeist3,
  "/assets/money-heist-4.jpg": moneyHeist4,
  "/assets/money-heist-5.jpg": moneyHeist5,
  "/assets/money-heist-6.jpg": moneyHeist6,
  "/assets/money-heist-7.jpg": moneyHeist7,
  "/assets/money-heist-8.jpg": moneyHeist8,
  "/assets/money-heist-9.jpg": moneyHeist9,
  "/assets/batman-1.jpg": batman1,
  "/assets/batman-2.jpg": batman2,
  "/assets/batman-3.jpg": batman3,
  "/assets/batman-4.jpg": batman4,
  "/assets/batman-5.jpg": batman5,
  "/assets/batman-6.jpg": batman6,
  "/assets/batman-7.jpg": batman7,
  "/assets/batman-8.jpg": batman8,
  "/assets/batman-9.jpg": batman9,
  "/assets/batman-10.jpg": batman10,
  "/assets/gold-hut-1.jpg": goldHut1,
  "/assets/gold-hut-2.jpg": goldHut2,
  "/assets/gold-hut-3.jpg": goldHut3,
  "/assets/gold-hut-4.jpg": goldHut4,
  "/assets/gold-hut-5.jpg": goldHut5,
  "/assets/gold-hut-6.jpg": goldHut6,
  "/assets/gold-hut-7.jpg": goldHut7,
  "/assets/gold-hut-8.jpg": goldHut8,
  "/assets/gold-hut-9.jpg": goldHut9,
  "/assets/diamond-hut-1.jpg": diamondHut1,
  "/assets/diamond-hut-2.jpg": diamondHut2,
  "/assets/diamond-hut-3.jpg": diamondHut3,
  "/assets/diamond-hut-4.jpg": diamondHut4,
  "/assets/diamond-hut-5.jpg": diamondHut5,
  "/assets/diamond-hut-6.jpg": diamondHut6,
  "/assets/platinum-hut-1.jpg": platinumHut1,
  "/assets/platinum-hut-2.jpg": platinumHut2,
  "/assets/platinum-hut-3.jpg": platinumHut3,
  "/assets/platinum-hut-4.jpg": platinumHut4,
  "/assets/platinum-hut-5.jpg": platinumHut5,
  "/assets/platinum-hut-6.jpg": platinumHut6,
  "/assets/exec-apt-1.jpg": execApt1,
  "/assets/exec-apt-2.jpg": execApt2,
  "/assets/exec-apt-3.jpg": execApt3,
  "/assets/exec-apt-4.jpg": execApt4,
  "/assets/exec-apt-5.jpg": execApt5,
  "/assets/exec-apt-6.jpg": execApt6,
  "/assets/exec-apt-7.jpg": execApt7,
  "/assets/studio-apt-1.jpg": studioApt1,
  "/assets/studio-apt-2.jpg": studioApt2,
  "/assets/studio-apt-3.jpg": studioApt3,
  "/assets/studio-apt-4.jpg": studioApt4,
  "/assets/studio-apt-5.jpg": studioApt5,
  "/assets/studio-apt-6.jpg": studioApt6,
};

/**
 * Resolves an image path from the DB to a usable URL.
 * - If it's a full URL (http/https), return as-is (e.g. Supabase storage uploads)
 * - If it matches an /assets/ path, return the Vite-bundled version
 * - Otherwise return as-is (fallback)
 */
export const resolveImageUrl = (path: string): string => {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return assetMap[path] || path;
};
