import { createClient } from '@supabase/supabase-js'

// 1. We read the environment variables that we stored in our .env.local file.
//    The `process.env` object is how Next.js gives us access to these variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 2. We use the createClient function from the Supabase library to initialize
//    our connection, passing it our unique URL and public key.
//    The `!` at the end of the variables tells TypeScript that we are sure
//    these values exist and are not null.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)