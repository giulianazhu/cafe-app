import { useState } from 'react';
import MenuList from '../features/menu/MenuList';
import MenuFilter from '../features/menu/MenuFilter';

function Menu() {
  const [filter, setFilter] = useState('all');
  function handleFilter(filterValue) {
    setFilter(filterValue);
  }
  return (
    <main className="flex h-full flex-col items-center px-3 text-center">
      <h1 className="m-1 p-2 text-2xl">Menu</h1>
      <MenuFilter handleFilter={handleFilter} />
      <MenuList filter={filter} />
    </main>
  );
}

export default Menu;
