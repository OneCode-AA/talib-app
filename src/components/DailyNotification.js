'use client';
import { useEffect, useState } from "react";

export default function DailyNotification() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const messages = [
      "🌟 Have you reviewed your Quran today?",
      "📖 Memorize even a small ayah today!",
      "🏋️‍♂️ Physical health helps your ilm!",
      "🧠 Revise your matoon today!",
      "☀️ Morning is the best time for memorization!",
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
      <p className="text-yellow-700">{message}</p>
    </div>
  );
}
