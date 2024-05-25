import ModalWindow from '../../ui/ModalWindow';
import ListButton from '../../ui/ListButton';
import formatPrice from '../../utils/formatPrice';
import useDeleteMenu from './useDeleteMenu';
import MenuForm from './MenuForm';
import { useState } from 'react';
import DeleteForm from '../../ui/DeleteForm';

function MenuItem({ menuItem, isAdmin }) {
  const { dish_name, price, ingredients, image, id } = menuItem;
  const { isDeleting, handleDelete, isDeleteError, deleteError } =
    useDeleteMenu();

  const [onEdit, setOnEdit] = useState(false);
  function toggleEdit() {
    setOnEdit(!onEdit);
  }

  const [showDelete, setShowDelete] = useState(false);
  function handleDeleteForm() {
    setShowDelete(!showDelete);
  }

  return (
    // sm:flex-[1_1_45%] to fit two menu items per row
    <>
      <section className="mb-2 flex flex-col items-center sm:flex-[0_1_45%] xl:flex-row xl:items-center xl:gap-3">
        <div
          id="image-wrapper"
          className="flex max-h-[200px] min-h-[200px] max-w-[300px] justify-center lg:max-h-max lg:min-h-min xl:flex-[1_1_50%]"
        >
          <img
            src={image}
            alt=""
            className="object-cover xl:h-full xl:w-full"
          />
        </div>
        <dl className="flex flex-[1_1_50%] flex-col justify-between self-stretch xl:text-start">
          <div id="wrapper">
            <dt className="my-1 py-1 text-lg font-semibold">{`${id}. ${dish_name}`}</dt>
            <dd className="my-1 italic text-stone-300">{ingredients}</dd>
          </div>
          <dd className="">Price: {formatPrice(price)} </dd>
        </dl>
        {isAdmin && (
          <div className="m-3 xs:space-x-5">
            <ListButton handleClick={toggleEdit} disabled={isDeleting}>
              {onEdit ? 'Cancel' : 'Edit'}
            </ListButton>
            <ListButton handleClick={handleDeleteForm} disabled={isDeleting}>
              Delete
            </ListButton>
          </div>
        )}
        {onEdit && (
          <div className="flex justify-center">
            <MenuForm
              menuItem={menuItem}
              toggleEdit={toggleEdit}
              onEdit={onEdit}
            />
          </div>
        )}
      </section>
      {showDelete && <DeleteForm id={id} handleDelete={handleDelete} />}
    </>
  );
}

export default MenuItem;
