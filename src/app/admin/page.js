'use client';
import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState('');

  async function addRecommendation() {
    await fetch('/api/admin/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    alert('Recommendation added!');
  }

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl mb-4 font-bold">Admin - Add Recommendations 📚</h1>
      <input type="text" placeholder="Recommendation Title" onChange={(e) => setTitle(e.target.value)} className="input mb-2" />
      <button onClick={addRecommendation} className="btn">Add</button>
    </main>
  );
}
