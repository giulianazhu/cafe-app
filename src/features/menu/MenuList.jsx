import MenuItem from './MenuItem';
import Loader from '../../ui/Loader';
import Error from '../../ui/Error';
import useMenu from './useMenu';
import MenuFilter from './MenuFilter';
import { useState } from 'react';
import ModalWindow from '../../ui/ModalWindow';
import MenuForm from './MenuForm';
import useAdmin from '../authentication/useAdmin';

function MenuList() {
  const { isLoading: isCheckingAdmin, isAuthenticated } = useAdmin();
  const [filter, setFilter] = useState('all');
  const { isLoading, isError, error, menu } = useMenu(filter);

  const [onAdd, setOnAdd] = useState(false);

  function handleFilter(filterValue) {
    setFilter(filterValue);
  }

  function toggleAdd() {
    setOnAdd(!onAdd);
  }

  if (isLoading || isCheckingAdmin) return <Loader />;

  if (isError)
    return (
      <ModalWindow>
        <Error>{error?.message}</Error>
      </ModalWindow>
    );

  return (
    <>
      <div className="flex w-11/12 justify-between space-x-3">
        <MenuFilter handleFilter={handleFilter} filter={filter} menu={menu} />
        {isAuthenticated && (
          <button
            className="m-2 mb-3 rounded-md border-2 border-stone-400 px-2 py-1 font-light text-stone-300 focus:outline-none"
            onClick={() => toggleAdd()}
          >
            Add menu item
          </button>
        )}
      </div>
      <div className="m-3 grid h-max w-11/12 grid-cols-1 justify-items-center gap-3 border-2 border-stone-400 p-2 md:justify-items-stretch xl:grid-cols-2">
        {/* ADD MENU ITEM FORM below */}
        {onAdd && <MenuForm toggleAdd={toggleAdd} />}
        {/* MENU list items */}
        {filter === 'all'
          ? menu.map((menuItem) => (
              <MenuItem
                menuItem={menuItem}
                key={menuItem.id}
                isAdmin={isAuthenticated}
              />
            ))
          : menu
              .filter((menuItem) => menuItem.menu_type === filter)
              .map((menuItem) => (
                <MenuItem
                  menuItem={menuItem}
                  key={menuItem.id}
                  isAdmin={isAuthenticated}
                />
              ))}
      </div>
      {/* OLD version  */}
      {/* {onAdd && (
        <ModalWindow>
          <MenuForm toggleAdd={toggleAdd} />
        </ModalWindow>
      )} */}
    </>
  );
}

export default MenuList;
