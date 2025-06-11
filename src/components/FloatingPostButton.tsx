'use client';
import Link from 'next/link';

export const FloatingPostButton = () => {
    return (
        <Link 
            href="/post-a-task" // This will eventually link to the page for creating tasks
            className="fixed bottom-8 right-8 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-b-4 border-primary-hover"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </Link>
    );
}