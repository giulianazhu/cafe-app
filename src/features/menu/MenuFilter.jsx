function MenuFilter({ handleFilter, filter, menu }) {
  console.log(menu);
  const arr = Array(menu.map((item) => item.menu_type));
  console.log(arr);
  const categories_Set = new Set(menu.map((item) => item.menu_type));
  const categories = [...categories_Set];

  return (
    <>
      <select
        name="menu_type"
        id=""
        className="mb-3 border-2 border-stone-400 bg-stone-800 px-2 py-1 font-semibold text-stone-300 focus:outline-none"
        defaultValue={filter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="all">All</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category.slice(0, 1).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
}

export default MenuFilter;
