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

  // if (isDeleteError)
  //   return (
  //     <ModalWindow>
  //       <Error> {deleteError.message} </Error>
  //     </ModalWindow>
  //   );

  return (
    <div className="flex flex-col gap-3 text-center">
      <MenuItem.Container>
        <MenuItem.ImageWrap img={image} />
        <MenuItem.Box>
          <MenuItem.Description
            title={`${id}. ${dish_name}`}
            ingredients={ingredients}
            price={`Price: ${formatPrice(price)}`}
          />
          {isAdmin && (
            <MenuItem.AdminPalette>
              <ListButton handleClick={toggleEdit} disabled={isDeleting}>
                {onEdit ? 'Cancel' : 'Edit'}
              </ListButton>
              <ListButton handleClick={handleDeleteForm} disabled={isDeleting}>
                {showDelete ? 'Cancel' : 'Delete'}
              </ListButton>
            </MenuItem.AdminPalette>
          )}
        </MenuItem.Box>
      </MenuItem.Container>
      {showDelete && (
        <DeleteForm
          id={id}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
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
    </div>
  );
}

export default MenuItem;

function Container({ children }) {
  //subling: form
  //children: image, box
  return (
    //items-center
    <section className="flex h-full flex-col items-center gap-3 md:flex-row md:items-start md:text-start">
      {children}
    </section>
  );
}

function ImageWrap({ img }) {
  return (
    <div className="h-48 w-72 sm:w-80">
      <img src={img} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function Box({ children }) {
  //description + palette
  return (
    //h-full removed
    <div className="flex min-h-48 w-80 flex-auto flex-col justify-between gap-3">
      {children}
    </div>
  );
}

function Description({ title, ingredients, price }) {
  return (
    <dl className="flex flex-auto flex-col justify-between gap-2">
      <Description.Title>{title}</Description.Title>
      <Description.Ingredients>{ingredients}</Description.Ingredients>
      <Description.Price>{price}</Description.Price>
    </dl>
  );
}

function Title({ children }) {
  return <dt className="text-lg font-semibold"> {children} </dt>;
}

function Ingredients({ children }) {
  return <dd className="italic text-stone-300">{children}</dd>;
}

function Price({ children }) {
  return <dd className="">{children} </dd>;
}

function AdminPalette({ children }) {
  return <div className="md:self-end">{children}</div>;
}

MenuItem.Container = Container;
MenuItem.ImageWrap = ImageWrap;
MenuItem.Box = Box;
MenuItem.Description = Description;
Description.Title = Title;
Description.Ingredients = Ingredients;
Description.Price = Price;
MenuItem.AdminPalette = AdminPalette;
