'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push('/auth/login');
    } else {
      alert('Registration failed. Try again.');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleRegister} className="space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required className="input" />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required className="input" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required className="input" />
        <button type="submit" className="btn">Register</button>
      </form>
    </main>
  );
}
