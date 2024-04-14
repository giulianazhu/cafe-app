import MenuItem from './MenuItem';
import Loader from '../../ui/Loader';
import Error from '../../ui/Error';
import useMenu from './useMenu';

function MenuList({ filter }) {
  const { isLoading, isError, error, menu } = useMenu();

  if (isLoading) return <Loader />;
  if (isError) return <Error>{error.message}</Error>;

  return (
    <div className="m-3 flex h-max w-11/12 flex-wrap content-around justify-evenly gap-3 rounded-md border-2 border-stone-400 p-2">
      {filter === 'wagashi' || filter === 'drinks'
        ? menu
            .filter((menuItem) => menuItem.menu_type === filter)
            .map((menuItem) => (
              <MenuItem menuItem={menuItem} key={menuItem.id} />
            ))
        : menu.map((menuItem) => (
            <MenuItem menuItem={menuItem} key={menuItem.id} />
          ))}
    </div>
  );
}

export default MenuList;
