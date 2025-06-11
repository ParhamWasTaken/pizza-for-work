'use client';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent } from 'react';

// <-- MOCK DATA FOR TASKS -->
// In a real app, we would fetch this from our 'tasks' table in the database.
const mockUserTasks = [
    { id: 1, title: 'Design my new podcast logo', payout: 2, status: 'Active' },
    { id: 2, title: 'Draw a cartoon version of my cat', payout: 2, status: 'Completed' },
    { id: 3, title: 'Help me debug my React component', payout: 3, status: 'Active' },
];

// A small component for the avatar, to keep the main component cleaner
const Avatar = ({ url, onUpload }: { url: string | null; onUpload: (event: ChangeEvent<HTMLInputElement>) => void; }) => {
    return (
      <div className="text-center">
        <div className="w-40 h-40 mx-auto rounded-full bg-background border-4 border-foreground mb-4 overflow-hidden relative group">
          <img src={url || `https://placehold.co/160x160/FDF8E7/402F2B?text=No+Pic`} alt="User Avatar" className="w-full h-full object-cover" />
          <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <span className="font-bold">Upload</span>
          </label>
        </div>
        <input type="file" id="avatar-upload" className="hidden" onChange={onUpload} accept="image/*"/>
      </div>
    );
  };
  
// <-- NEW COMPONENT FOR PROFILE TASK CARDS -->
// This component displays a single task within the user's profile list.
const ProfileTaskCard = ({ task }: { task: { id: number, title: string, payout: number, status: string }}) => {
    return (
        <div className="bg-background p-4 rounded-lg border-2 border-foreground flex justify-between items-center">
            <div>
                <p className="font-bold text-foreground">{task.title}</p>
                <p className="text-sm text-primary font-bold">🍕 {task.payout} Pizza{task.payout > 1 ? 's' : ''}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${task.status === 'Active' ? 'bg-primary text-white' : 'bg-foreground text-background'}`}>
                {task.status}
            </span>
        </div>
    )
}

// Main Profile Page Component
export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
    }
  }, [profile]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const handleProfileUpdate = async () => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update({ first_name: firstName, last_name: lastName }).eq('id', user.id);
    if (error) setMessage(`Error: ${error.message}`);
    else {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    }
  };
  
  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user) return;
    const file = event.target.files[0];
    const filePath = `${user.id}/${Date.now()}`;
    const { error } = await supabase.storage.from('avatars').upload(filePath, file);
    if (error) { setMessage(`Error uploading avatar: ${error.message}`); return; }
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id);
    setMessage('Avatar updated! Refresh the page to see the new image.');
  };

  if (loading) return <div className="bg-background min-h-screen flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="container mx-auto p-4 sm:p-8 pt-12">
      {isEditing ? (
        // EDIT MODE
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="font-display text-5xl text-foreground mb-6">Edit Your Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-subtle-text">First Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full p-2 bg-background border-2 border-foreground rounded-md"/>
            </div>
            <div>
              <label className="text-sm font-bold text-subtle-text">Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-2 bg-background border-2 border-foreground rounded-md"/>
            </div>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <button onClick={handleProfileUpdate} className="bg-primary text-white font-bold py-2 px-6 rounded-lg border-b-4 border-primary-hover">Save Changes</button>
            <button onClick={() => setIsEditing(false)} className="bg-foreground text-background font-bold py-2 px-6 rounded-lg border-b-4 border-black/40">Cancel</button>
          </div>
        </div>
      ) : (
        // DISPLAY MODE
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center space-y-8">
            <Avatar url={profile?.avatar_url} onUpload={handleAvatarUpload} />
            <div className="bg-border/60 p-6 rounded-lg border-2 border-foreground border-b-8 text-center w-full">
                <p className="text-subtle-text font-bold">Pizza Count</p>
                <p className="font-display text-7xl text-primary">{profile?.pizza_count || 0}</p>
            </div>
          </div>
          <div className="md:col-span-2 bg-border/60 p-8 rounded-lg border-2 border-foreground border-b-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-display text-6xl text-foreground">{profile?.first_name || 'New'} {profile?.last_name || 'User'}</h1>
                <p className="font-sans text-subtle-text font-bold">{user?.email}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="bg-foreground text-background font-bold py-2 px-4 rounded-lg border-b-4 border-black/40 text-sm">
                Edit Profile
              </button>
            </div>
            <div className="mt-8 border-t-2 border-foreground/30 pt-6">
              <h3 className="font-display text-3xl text-foreground mb-4">My Uploaded Tasks</h3>
              {/* This is where we render the list of mock task cards */}
              <div className="space-y-4">
                {mockUserTasks.length > 0 ? (
                    mockUserTasks.map(task => <ProfileTaskCard key={task.id} task={task} />)
                ) : (
                    <p className="text-subtle-text">You haven't posted any tasks yet!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
       {message && <div className="max-w-2xl mx-auto mt-4 p-4 text-center text-sm font-bold bg-background rounded-md border-2 border-foreground">{message}</div>}
    </div>
  );
}