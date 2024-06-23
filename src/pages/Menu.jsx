import MenuList from '../features/menu/MenuList';
import StyledHeadline from '../ui/StyledHeadline';

function Menu() {
  return (
    <>
      {/* <main className="relative flex h-full flex-col items-center px-3 text-center "> */}
      <main className="m-auto my-3 w-11/12 overflow-x-hidden">
        <StyledHeadline className="m-1 p-2 text-2xl">Menu</StyledHeadline>
        <MenuList />
      </main>
    </>
  );
}

export default Menu;
