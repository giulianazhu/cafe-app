import supabase from './supabase';

// ADMIN SIGN UP
export async function createAdmin(admin) {
  const { data, error } = await supabase.auth.signUp({
    email: admin.email,
    password: admin.password,
  });
  if (error) {
    console.error(error);
    throw new Error('Failed to create admin account');
  }
  return data;
}

//ADMIN LOG IN
export async function logAdmin(admin) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: admin.email,
    password: admin.password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentAdmin() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error();
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error('Could not log out');
  }
  console.log('Successfully logged out');
}
