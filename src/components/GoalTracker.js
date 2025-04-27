'use client';
import { useState, useEffect } from "react";

export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    const res = await fetch('/api/goals');
    const data = await res.json();
    setGoals(data);
  }

  async function createGoal() {
    await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, targetDate }),
    });
    setTitle('');
    setTargetDate('');
    fetchGoals();
  }

  async function markCompleted(id) {
    await fetch(`/api/goals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "completed" }),
    });
    fetchGoals();
  }

  async function deleteGoal(id) {
    await fetch(`/api/goals/${id}`, {
      method: 'DELETE',
    });
    fetchGoals();
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">🎯 Goal Tracker</h2>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Goal title (e.g., Finish Juz Amma)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="input"
        />
        <button onClick={createGoal} className="btn">
          Add Goal
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal._id} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold">{goal.title}</p>
              <p className="text-sm">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
              <p className="text-sm">Status: {goal.status}</p>
            </div>
            <div className="flex gap-2">
              {goal.status !== "completed" && (
                <button onClick={() => markCompleted(goal._id)} className="btn">
                  Complete
                </button>
              )}
              <button onClick={() => deleteGoal(goal._id)} className="btn bg-red-500 hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
