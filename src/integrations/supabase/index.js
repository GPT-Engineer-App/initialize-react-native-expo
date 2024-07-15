import { createClient } from '@supabase/supabase-js'
import { createContext, useContext, useState, useEffect } from 'react'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
)

const SupabaseContext = createContext()

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return createElement(SupabaseContext.Provider, { value: { supabase, user } }, children)
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

// Define hooks for CRUD operations on collections
export const useCreateEvent = () => {
  const { supabase } = useSupabase()
  return async (eventData) => {
    const { data, error } = await supabase.from('event').insert(eventData)
    if (error) throw error
    return data
  }
}

export const useGetEvents = () => {
  const { supabase } = useSupabase()
  return async () => {
    const { data, error } = await supabase.from('event').select('*')
    if (error) throw error
    return data
  }
}

export const useGetEvent = () => {
  const { supabase } = useSupabase()
  return async (id) => {
    const { data, error } = await supabase.from('event').select('*').eq('id', id).single()
    if (error) throw error
    return data
  }
}

export const useUpdateEvent = () => {
  const { supabase } = useSupabase()
  return async (id, updates) => {
    const { data, error } = await supabase.from('event').update(updates).eq('id', id)
    if (error) throw error
    return data
  }
}

export const useDeleteEvent = () => {
  const { supabase } = useSupabase()
  return async (id) => {
    const { data, error } = await supabase.from('event').delete().eq('id', id)
    if (error) throw error
    return data
  }
}

/*
Types based on the Supabase schema:

type Event = {
  id: number
  name: string
  created_at: string
  date: string
}
*/