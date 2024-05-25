import capitalize from '../utils/capitalize';
import supabase, { supabaseUrl } from './supabase';

// SELECT ALL MENU DATA
export async function getMenu() {
  let { data, error } = await supabase.from('menu').select('*');
  if (error) {
    console.error(error);
    throw new Error('Menu data could not retrieved...');
  }
  data.sort((a, b) => a.id - b.id);
  return data;
}

// FILTER MENU ITEM
export async function filterMenu(filterValue) {
  let { data, error } = await supabase
    .from('menu')
    .select('*')
    .eq('menu_type', filterValue);
  if (error) {
    console.error(error);
    throw new Error('Filtered menu data could not retrieved...');
  }
  return data;
}

// UPLOAD MENU IMAGE TO CLOUD STORAGE
export async function uploadImage(uploadObj) {
  const { file, path } = uploadObj;
  let { error } = await supabase.storage
    .from('cafe-images')
    .upload(path, file, { upsert: true });
  console.log('Image successfully uploaded');
  if (error) {
    return console.error(error);
  }
}

// ADD MENU ITEM
export async function addMenu(menuItem) {
  const { id, dish_name, menu_type, ingredients, image } = menuItem;
  const imageName = dish_name.trim();
  const imagePath = `${imageName}`;
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cafe-images/${imageName}`;
  const uploadObj = {
    file: image,
    path: imagePath,
  };
  await uploadImage(uploadObj);
  let { data, error } = await supabase
    .from('menu')
    .insert([
      {
        ...menuItem,
        dish_name: capitalize(dish_name),
        menu_type: capitalize(menu_type),
        ingredients: capitalize(ingredients),
        image: imageUrl,
      },
    ])
    .select();
  if (error) {
    console.error(error);
    throw new Error('Menu item could not be created');
  }
}

// EDIT MENU ITEM
export async function editMenu(menuItem) {
  const { dish_name, menu_type, ingredients, image } = menuItem;
  const imageName = dish_name;
  const imagePath = `${imageName}`;
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cafe-images/${imageName}`;
  const uploadObj = {
    file: image,
    path: imagePath,
  };
  await uploadImage(uploadObj);
  let { data, error } = await supabase
    .from('menu')
    .update({
      ...menuItem,
      dish_name: capitalize(dish_name),
      menu_type: capitalize(menu_type),
      ingredients: capitalize(ingredients),
      image: imageUrl,
    })
    .eq('id', menuItem.id);
  if (error) {
    console.error(error);
    throw new Error('Menu item could not be edited');
  }
}

// DELETE MENU ITEM
export async function deleteMenu(id) {
  let { error } = await supabase.from('menu').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Menu item could not be deleted');
  }
}
