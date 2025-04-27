'use client';
import { useState, useEffect } from "react";

export default function MemorizationTracker() {
  const [memorizationList, setMemorizationList] = useState([]);

  useEffect(() => {
    async function fetchMemorization() {
      const res = await fetch('/api/memorization');
      const data = await res.json();
      setMemorizationList(data);
    }
    fetchMemorization();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Memorization Tracker</h2>
      {memorizationList.map((item) => (
        <div key={item._id}>
          <p>{item.type.toUpperCase()}: {item.title}</p>
        </div>
      ))}
    </section>
  );
}
