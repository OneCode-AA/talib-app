'use client';
import { useState, useEffect } from "react";

export default function ReadingList() {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    async function fetchReadings() {
      const res = await fetch('/api/readings');
      const data = await res.json();
      setReadings(data);
    }
    fetchReadings();
  }, []);

  async function markCompleted(id) {
    await fetch(`/api/readings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "completed" }),
    });
    alert('Marked as completed!');
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Reading List</h2>
      {readings.map((book) => (
        <div key={book._id} className="flex items-center justify-between">
          <p>{book.title} ({book.status})</p>
          {book.status !== 'completed' && (
            <button onClick={() => markCompleted(book._id)} className="btn">Complete</button>
          )}
        </div>
      ))}
    </section>
  );
}
