import { createClient } from '@supabase/supabase-js'

// Define the database schema type for type safety
export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: number
          created_at: string
          email: string
          plan_interest: string | null
        }
        Insert: {
          email: string
          plan_interest?: string | null
        }
        Update: {
          email?: string
          plan_interest?: string | null
        }
      }
    }
  }
}

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://htrwthzjwicppcfarwym.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0cnd0aHpqd2ljcHBjZmFyd3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MjIzNzgsImV4cCI6MjA2NjI5ODM3OH0.rrOx_sjlG7RctWj_fGdtfqpmornyRA4oYKA1AXjHiHQ'

// Create and export the Supabase client with TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseKey) 