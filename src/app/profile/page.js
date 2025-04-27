'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/user');
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setName(data.name);
      } else {
        router.push('/auth/login');
      }
    }
    fetchUser();
  }, [router]);

  async function handleSave() {
    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    if (res.ok) {
      alert('Profile updated!');
    } else {
      alert('Update failed.');
    }
  }

  if (!user) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl mb-4 font-bold">Profile</h1>
      <div className="space-y-4 w-full max-w-md">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" />
        <input type="password" placeholder="New password" onChange={(e) => setPassword(e.target.value)} className="input" />
        <button onClick={handleSave} className="btn">Save Changes</button>
      </div>
    </main>
  );
}
