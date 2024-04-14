import formatPrice from '../../utils/formatPrice';

function MenuItem({ menuItem }) {
  const { dish_name, price, ingredients, image, id } = menuItem;

  return (
    // sm:flex-[1_1_40%] to fit two menu items per row
    <section className="mb-2 flex flex-col items-center sm:flex-[1_1_40%] xl:flex-row xl:items-center xl:gap-3">
      {/* xl:flex-[1_1_50%] to equally divide the space between menu img and menu description  */}
      <div
        id="image-wrapper"
        className="flex max-h-[200px] min-h-[200px] max-w-[300px] justify-center lg:max-h-max lg:min-h-min xl:flex-[1_1_50%]"
      >
        <img src={image} alt="" className="object-cover xl:h-full xl:w-full" />
      </div>
      <dl className="flex flex-[1_1_50%] flex-col justify-between self-stretch xl:text-start">
        <div id="wrapper">
          <dt className="my-1 py-1 text-lg font-semibold">{`${id}. ${dish_name}`}</dt>
          <dd className="my-1 italic text-stone-300">{ingredients}</dd>
        </div>
        <dd className="">Price: {formatPrice(price)} </dd>
      </dl>
    </section>
  );
}

export default MenuItem;
