function Searchbar() {
  return (
    <>
      <div className="mx-3 my-1 flex w-full items-center space-x-3 p-1">
        <label htmlFor="search" className="min-w-max text-lg">
          Search by name
        </label>
        <input
          type="text"
          id="search"
          className="w-full flex-auto rounded-lg bg-stone-200 p-1 px-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
    </>
  );
}

export default Searchbar;
