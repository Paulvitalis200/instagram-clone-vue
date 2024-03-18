import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tqoneqhlvignvfrwrzvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxb25lcWhsdmlnbnZmcndyenZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NzEwNDMsImV4cCI6MjAyNjM0NzA0M30.WX-yeKGJM8ix10GwaC7U-PFJkJNAm4ANZRXDDFK8M6k'
export const supabase = createClient(supabaseUrl, supabaseKey)