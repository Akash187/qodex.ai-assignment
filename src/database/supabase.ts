import type { Database } from '@/types/supabase.types'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient<Database>(
	import.meta.env.VITE_DB_URL,
	import.meta.env.VITE_DB_ANON_KEY
)

export default supabase
