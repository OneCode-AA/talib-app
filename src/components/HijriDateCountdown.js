'use client';
import { useEffect, useState } from 'react';

export default function HijriDateCountdown() {
  const [hijriDate, setHijriDate] = useState('');
  const [fajrTime, setFajrTime] = useState('');
  const [maghribTime, setMaghribTime] = useState('');
  const [fajrCountdown, setFajrCountdown] = useState('');
  const [maghribCountdown, setMaghribCountdown] = useState('');

  useEffect(() => {
    async function fetchTimes() {
      try {
        const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Minneapolis&country=United%20States&method=2');
        const data = await response.json();
        const timings = data.data.timings;
        const hijri = data.data.date.hijri;

        setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
        setFajrTime(timings.Fajr);
        setMaghribTime(timings.Maghrib);
      } catch (error) {
        console.error('Error fetching times:', error);
      }
    }

    function updateCountdowns() {
      if (!fajrTime || !maghribTime) return;

      const now = new Date();

      const today = now.toISOString().split('T')[0]; // "2025-04-27"
      
      const fajrDate = new Date(`${today}T${fajrTime}`);
      const maghribDate = new Date(`${today}T${maghribTime}`);

      const getRemaining = (target) => {
        const diff = target - now;
        if (diff <= 0) return "Already passed";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
      };

      setFajrCountdown(getRemaining(fajrDate));
      setMaghribCountdown(getRemaining(maghribDate));
    }

    fetchTimes();

    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [fajrTime, maghribTime]);

  return (
    <section className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">🕋 Hijri Date & Prayer Countdown</h2>
      <p className="text-lg mb-2">Hijri Date: <strong>{hijriDate}</strong></p>
      <p className="text-lg mb-2">Fajr Time: <strong>{fajrTime}</strong></p>
      <p>⏰ Fajr Countdown: <strong>{fajrCountdown}</strong></p>
      <p className="text-lg mt-4 mb-2">Maghrib Time: <strong>{maghribTime}</strong></p>
      <p>⏰ Maghrib Countdown: <strong>{maghribCountdown}</strong></p>
    </section>
  );
}
