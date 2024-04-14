import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrpkvsvbfippxfwtigbv.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// Env variables prefixed with REACT_APP_ are auto-made available in your React app during dev. However, for production builds, you need to ensure setting up of env vars for deployment ==> e.g. setting them in the build environment or using a build tool like webpack or Parcel to inject them during the build process.
