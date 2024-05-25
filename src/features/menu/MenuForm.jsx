import FormButton from '../../ui/FormButton';
import Label from '../../ui/Label';
import useEditMenu from './useEditMenu';
import useAddMenu from './useAddMenu';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import Loader from '../../ui/Loader';
import Error from '../../ui/Error';

const inputCommonStyle =
  ' w-full rounded-xl bg-stone-700 p-1 px-2 text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400';

function MenuForm({ onEdit, toggleEdit, toggleAdd, menuItem = {} }) {
  //menuItem={} to prevent error due to "destructuring failure"

  const { dish_name, menu_type, price, ingredients, image, id } = menuItem;
  const { isEditing, handleEdit, isEditError, editError } = useEditMenu();
  const { isAdding, handleAdd, isAddError, addError } = useAddMenu();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const formData = new FormData();
    formData.append('file', data.image[0]);
    console.log(formData);
    onEdit
      ? handleEdit({ ...data, image: data.image[0] })
      : handleAdd({ ...data, image: data.image[0] });
    onEdit ? toggleEdit() : reset();
  }

  const [inputLength, setInputLength] = useState(0);

  function trackInputLength(totalChar) {
    setInputLength(totalChar);
  }
  if (isAdding || isEditing) return <Loader />;
  if (isAddError || isEditError)
    return <Error> {isAddError ? addError.message : editError.message} </Error>;

  return (
    <form
      className="h-11/12 rounded-md border-2 border-stone-400 p-2 text-stone-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-end">
        <span
          className="cursor-pointer text-stone-700"
          onClick={() => (onEdit ? toggleEdit() : toggleAdd())}
        >
          <ImCross className="text-stone-400" />
        </span>
      </div>

      <Label htmlFor="id"> Menu Number* </Label>
      <input
        type="text"
        className={`${inputCommonStyle}`}
        disabled={isEditing || isAdding}
        id="id"
        defaultValue={id}
        {...register('id', {
          required: 'Please enter a number...',
        })}
      />
      {errors.id && <p className="text-pink-800">{errors.id.message}</p>}

      <Label htmlFor="menu_type"> Menu Category* </Label>
      <input
        type="text"
        className={`${inputCommonStyle}`}
        id="menu_type"
        defaultValue={menu_type}
        disabled={isEditing || isAdding}
        autoCapitalize="on"
        {...register('menu_type', {
          required: 'Please enter a category...',
        })}
      />
      {errors.menu_type && (
        <p className="text-pink-800">{errors.menu_type.message}</p>
      )}

      <Label htmlFor="dish_name">Name*</Label>
      <input
        type="text"
        className={`${inputCommonStyle}`}
        id="dish_name"
        defaultValue={dish_name}
        disabled={isEditing || isAdding}
        autoCapitalize="on"
        {...register('dish_name', {
          required: 'Please enter a dish name...',
          maxLength: {
            value: 20,
            message: 'Dish name should not exceed 20 characters',
          },
        })}
      />
      {errors.dish_name && (
        <p className="text-pink-800">{errors.dish_name.message}</p>
      )}

      <Label htmlFor="price">Price*</Label>
      <input
        type="text"
        className={`${inputCommonStyle}`}
        id="price"
        defaultValue={price}
        disabled={isEditing || isAdding}
        {...register('price', {
          required: 'Please enter a price...',
        })}
      />
      {errors.price && <p className="text-pink-800">{errors.price.message}</p>}

      <Label htmlFor="ingredients">Ingredients</Label>
      <textarea
        className={`${inputCommonStyle} resize-none overflow-auto`}
        id="ingredients"
        rows="3"
        defaultValue={ingredients}
        disabled={isEditing || isAdding}
        autoCapitalize="on"
        {...register('ingredients', {
          maxLength: {
            value: 100,
            message: 'Ingredients list should not exceed 100 characters',
          },
          onChange: (e) => trackInputLength(e.target.value.length),
        })}
      ></textarea>
      <p className="text-sm font-light text-stone-400">
        {`${inputLength}/100 characters`}
      </p>
      {errors.ingredients && (
        <p className="text-pink-800">{errors.ingredients.message}</p>
      )}

      <Label htmlFor="image">Attach Image*</Label>
      <input
        type="file"
        className={`${inputCommonStyle}`}
        id="image"
        accept="image/*"
        // defaultValue={image}
        disabled={isEditing || isAdding}
        {...register('image', {
          required: onEdit ? false : 'Please submit an image...',
        })}
      />
      {errors.image && <p className="text-pink-800">{errors.image.message}</p>}

      <div className="space-x-3 self-end">
        <FormButton> {onEdit ? 'Edit' : 'Submit'} </FormButton>
      </div>
    </form>
  );
}

export default MenuForm;
