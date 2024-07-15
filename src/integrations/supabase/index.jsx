import { createClient } from '@supabase/supabase-js';
import { useState, useEffect, createContext, useContext } from 'react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabase, user }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

// Types based on the Supabase schema
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} DetectionArea
 * @property {string} user_id
 * @property {Object} area
 */

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {number} count
 */

/**
 * @typedef {Object} ModelImprovementRequest
 * @property {string} id
 * @property {string} screenshot
 * @property {Object} metadata
 */