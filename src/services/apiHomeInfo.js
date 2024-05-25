import supabase from './supabase';

export async function getHomeImg() {
  let { data, error } = await supabase.from('homeImg').select('*');
  if (error) {
    console.error(error);
    throw new Error('Images could not be retrieved...');
  }
  data.sort((a, b) => a.id - b.id);
  return data;
}

// SELECT ABOUTUS INFORMATION FOR HOME PAGE
export async function getHomeInfo() {
  let { data, error } = await supabase.from('aboutus').select('*');
  if (error) {
    console.error(error);
    throw new Error('About us information could not be retrieved...');
  }
  data.sort((a, b) => a.id - b.id);
  return data;
}
