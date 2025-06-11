'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

// Define the shape of our profile data
export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  pizza_count: number | null;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function handles the initial fetching of user and profile data.
    const getInitialData = async () => {
      // First, get the current session from Supabase. This happens on page load.
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // If a user is logged in, set the user state
        setUser(session.user);
        // Then, fetch their corresponding profile from the 'profiles' table.
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setProfile(profileData ?? null);
      }
      
      // Once all initial data is fetched (or we've confirmed there's no user),
      // we set loading to false. This is the crucial step.
      setLoading(false);
    };
    
    // Run the initial data fetching function.
    getInitialData();

    // Now, set up a listener for any subsequent authentication events,
    // like when a user logs out in another tab.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // We only need to update the user and profile here. We don't touch the
      // loading state, as this happens in the background.
      setUser(session?.user ?? null);
      // We can refetch the profile here if needed, but for now just clear it on logout
      if (event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    // Clean up the listener when the component is unmounted.
    return () => {
      subscription.unsubscribe();
    };
  }, []); // The empty array ensures this effect runs only once.

  const value = { user, profile, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};