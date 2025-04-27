'use client';
import { useEffect, useState } from "react";
import axios from "axios";

export default function PrayerTimes() {
  const [prayers, setPrayers] = useState(null);

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        const response = await axios.get("https://api.aladhan.com/v1/timingsByCity?city=Mecca&country=Saudi%20Arabia&method=2");
        setPrayers(response.data.data.timings);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPrayerTimes();
  }, []);

  if (!prayers) return <div>Loading prayer times...</div>;

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Prayer Times</h2>
      <ul className="space-y-2">
        {Object.entries(prayers).map(([name, time]) => (
          <li key={name}>{name}: {time}</li>
        ))}
      </ul>
    </section>
  );
}
