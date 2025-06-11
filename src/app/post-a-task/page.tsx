'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const CATEGORIES = ["Design", "Tech", "Writing", "Household", "Art", "Video", "Other"];
const MAX_PIZZAS = 5; // Let's set a max payout for the UI

// A new component for our custom Pizza Payout selector
const PizzaPayoutSelector = ({ value, onChange }: { value: number; onChange: (newValue: number) => void; }) => (
    <div className="flex items-center space-x-2">
        {Array.from({ length: MAX_PIZZAS }).map((_, index) => (
            <button
                key={index}
                type="button" // Important: prevents form submission
                onClick={() => onChange(index + 1)}
                className={`text-3xl transition-transform hover:scale-125 ${index < value ? 'grayscale-0' : 'grayscale'}`}
            >
                🍕
            </button>
        ))}
    </div>
);


export default function PostTaskPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [payout, setPayout] = useState(1);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handlePostTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        setMessage('');

        const { error } = await supabase.from('tasks').insert({ title, description, category, payout, user_id: user.id });

        setIsSubmitting(false);

        if (error) {
            setMessage(`Error posting task: ${error.message}`);
        } else {
            setMessage('Success! Your task is now live.');
            setTimeout(() => {
                router.push('/marketplace');
            }, 1500);
        }
    };

    if (loading || !user) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center">
                <p className="font-display text-4xl text-foreground">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-grow container mx-auto p-4 sm:p-8 pt-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-border/60 p-8 rounded-lg border-2 border-foreground border-b-8">
                        <h1 className="font-display text-6xl text-foreground mb-2">Post a New Task</h1>
                        <p className="text-subtle-text mb-8">Got a job? Need a hand? Post it here and pay with pizza.</p>

                        <form onSubmit={handlePostTask} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-foreground mb-1">Task Title</label>
                                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-background border-2 border-foreground rounded-md text-foreground" placeholder="e.g., Design a cool logo for my band" required />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-bold text-foreground mb-1">Detailed Description</label>
                                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-background border-2 border-foreground rounded-md text-foreground h-32" placeholder="Describe what you need done, any requirements, etc." required />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label htmlFor="category" className="block text-sm font-bold text-foreground mb-1">Category</label>
                                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 bg-background border-2 border-foreground rounded-md text-foreground appearance-none">
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-foreground">
                                        <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-bold text-foreground mb-1">Pizza Payout</label>
                                    <div className="p-3 bg-background border-2 border-foreground rounded-md">
                                       <PizzaPayoutSelector value={payout} onChange={setPayout} />
                                    </div>
                                </div>
                            </div>
                            
                            {message && <div className="p-4 text-center text-sm font-bold bg-background rounded-md border-2 border-foreground">{message}</div>}

                            <div className="pt-4">
                                <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white p-4 rounded-lg font-bold border-b-4 border-primary-hover disabled:bg-subtle-text disabled:border-gray-500">
                                    {isSubmitting ? 'Posting...' : 'Post Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}