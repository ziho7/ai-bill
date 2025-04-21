import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bdemjulqvvnepfeliath.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZW1qdWxxdnZuZXBmZWxpYXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NDg5NjYsImV4cCI6MjA2MDQyNDk2Nn0.uJaOqRFdOSdISgWhPZDDH0xQnvOuKfYEt_mnwHZflIg'
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})