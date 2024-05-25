import MenuList from '../features/menu/MenuList';
import MenuListCopy from '../features/menu/MenuListCopy';
import StyledHeadline from '../ui/StyledHeadline';

function Menu() {
  return (
    <>
      {/* relative for placing modalwindow */}
      <main className="relative flex h-full flex-col items-center px-3 text-center">
        <StyledHeadline className="m-1 p-2 text-2xl">Menu</StyledHeadline>
        <MenuList />
      </main>
    </>
  );
}

export default Menu;
