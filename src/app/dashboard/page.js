import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import PrayerTimes from "@/components/PrayerTimes";
import MemorizationTracker from "@/components/MemorizationTracker";
import ExerciseTracker from "@/components/ExerciseTracker";
import ReadingList from "@/components/ReadingList";
import DailyNotification from "@/components/DailyNotification";
import ProgressChart from "@/components/ProgressChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl mb-4 font-bold">Dashboard</h1>
      <div className="grid gap-8">
        <PrayerTimes />
        <ProgressChart
  labels={["Juz Amma", "Baqarah", "Nahl", "Arba'een Nawawi"]} 
  data={[30, 15, 10, 20]} 
/>
        <MemorizationTracker />
        <DailyNotification/>
        <ExerciseTracker />
        <ReadingList />
      </div>
    </main>
  );
}
