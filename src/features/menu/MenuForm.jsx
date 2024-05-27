import FormButton from '../../ui/FormButton';
import Label from '../../ui/Label';
import useEditMenu from './useEditMenu';
import useAddMenu from './useAddMenu';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import Error from '../../ui/Error';
import { CgSpinner } from 'react-icons/cg';
import FormRow from '../../ui/FormRow';
import ModalWindow from '../../ui/ModalWindow';

const inputCommonStyle =
  ' w-full rounded-xl bg-stone-700 p-1 px-2 text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400';

function MenuForm({ onEdit, toggleEdit, toggleAdd, menuItem = {} }) {
  //menuItem={} to prevent error due to "destructuring failure"
  const { dish_name, menu_type, price, ingredients, id } = menuItem;
  const { isEditing, handleEdit, isEditError, editError } = useEditMenu();
  const { isAdding, handleAdd, isAddError, addError } = useAddMenu();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isLoading = isAdding || isEditing;
  // const isError = isAddError || isEditError;
  const [inputLength, setInputLength] = useState(ingredients?.length || 0);

  function onSubmit(data) {
    if (onEdit) {
      handleEdit(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => toggleEdit(),
        },
      );
    } else {
      handleAdd(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => reset(),
        },
      );
    }
  }

  function trackInputLength(totalChar) {
    setInputLength(totalChar);
  }

  // if (isError)
  //   return (
  //     <ModalWindow>
  //       <Error> {isAddError ? addError.message : editError.message} </Error>
  //     </ModalWindow>
  //   );

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
      <div>
        <FormRow>
          <Label htmlFor="id"> Menu Number* </Label>
          <input
            type="text"
            className={`${inputCommonStyle}`}
            disabled={isLoading}
            id="id"
            defaultValue={id}
            {...register('id', {
              required: 'Please enter a number...',
            })}
          />
          {errors.id && <p className="text-pink-800">{errors.id.message}</p>}
        </FormRow>
        <FormRow>
          <Label htmlFor="menu_type"> Menu Category* </Label>
          <input
            type="text"
            className={`${inputCommonStyle}`}
            id="menu_type"
            defaultValue={menu_type}
            disabled={isLoading}
            autoCapitalize="on"
            {...register('menu_type', {
              required: 'Please enter a category...',
            })}
          />
          {errors.menu_type && (
            <p className="text-pink-800">{errors.menu_type.message}</p>
          )}
        </FormRow>
        <FormRow>
          <Label htmlFor="dish_name">Name*</Label>
          <input
            type="text"
            className={`${inputCommonStyle}`}
            id="dish_name"
            defaultValue={dish_name}
            disabled={isLoading}
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
        </FormRow>
        <FormRow>
          <Label htmlFor="price">Price*</Label>
          <input
            type="text"
            className={`${inputCommonStyle}`}
            id="price"
            defaultValue={price}
            disabled={isLoading}
            {...register('price', {
              required: 'Please enter a price...',
            })}
          />
          {errors.price && (
            <p className="text-pink-800">{errors.price.message}</p>
          )}
        </FormRow>
        <FormRow>
          <Label htmlFor="ingredients">Ingredients</Label>
          <textarea
            className={`${inputCommonStyle} resize-none overflow-auto`}
            id="ingredients"
            rows="3"
            defaultValue={ingredients}
            disabled={isLoading}
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
        </FormRow>
        <FormRow>
          <Label htmlFor="image">Attach Image*</Label>
          <input
            type="file"
            className={`${inputCommonStyle}`}
            id="image"
            accept="image/*"
            // defaultValue={image}
            disabled={isLoading}
            {...register('image', {
              required: onEdit ? false : 'Please submit an image...',
            })}
          />
          {errors.image && (
            <p className="text-pink-800">{errors.image.message}</p>
          )}
        </FormRow>
        <FormButton disabled={isLoading}>
          <div className="flex items-center">
            {!isLoading ? (
              onEdit ? (
                'Edit'
              ) : (
                'Add'
              )
            ) : (
              <span className="flex items-center">
                {onEdit ? 'Editing' : 'Adding'}
                <CgSpinner className="ml-1 inline animate-spin" />
              </span>
            )}
          </div>
        </FormButton>
      </div>
    </form>
  );
}

export default MenuForm;
