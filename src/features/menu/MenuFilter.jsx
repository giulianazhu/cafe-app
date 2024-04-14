function MenuFilter({ handleFilter }) {
  return (
    <>
      <select
        name="menu_type"
        id=""
        className="mb-3 border-2 border-stone-400 bg-stone-800 px-2 py-1 font-semibold text-stone-300 focus:outline-none"
        defaultValue="all"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="wagashi" className="">
          Wagashi
        </option>
        <option value="drinks">Drinks</option>
      </select>
    </>
  );
}

export default MenuFilter;
