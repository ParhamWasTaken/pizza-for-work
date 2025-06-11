'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
// 1. Import the useRouter hook from next/navigation
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(true);
  const [message, setMessage] = useState('');
  // 2. Initialize the router
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      if (isSigningUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Success! Please check your email for a confirmation link.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // 3. On successful login, redirect to the profile page
        router.push('/profile');
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-background border-2 border-foreground rounded-lg p-8 border-b-8">
          <h1 className="font-display text-5xl text-center text-foreground mb-8">
            {isSigningUp ? 'Join the Crew' : 'Welcome Back'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-foreground mb-1">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-border/60 border-2 border-foreground rounded-md text-foreground placeholder:text-subtle-text" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-foreground mb-1">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-border/60 border-2 border-foreground rounded-md text-foreground" placeholder="••••••••" required />
            </div>
            {message && <div className="p-4 text-center text-sm font-bold bg-border/60 rounded-md">{message}</div>}
            <div className="pt-4">
              <button type="submit" className="w-full bg-primary text-white p-4 rounded-lg font-bold border-b-4 border-primary-hover">{isSigningUp ? 'Sign Up' : 'Log In'}</button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => { setIsSigningUp(!isSigningUp); setMessage(''); }} className="text-sm font-bold text-subtle-text hover:text-primary">
              {isSigningUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}