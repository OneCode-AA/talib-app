'use client';
import { useEffect, useState } from "react";

export default function StreakTracker() {
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    async function fetchStreaks() {
      const res = await fetch('/api/streak');
      const data = await res.json();
      setStreaks(data);
    }
    fetchStreaks();
  }, []);

  const days = new Set(streaks.map(s => s.date));
  
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Streak Tracker 🔥</h2>
      <p>you&apos;ve been consistent for <strong>{days.size}</strong> days!</p>
    </section>
  );
}
