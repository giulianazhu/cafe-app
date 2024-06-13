import { useForm } from 'react-hook-form';
import useLogin from './useLogin';
import Loader from '../../ui/Loader';

function LoginForm() {
  // controlled form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { handleLogIn, isLogging } = useLogin();

  function onSubmit(admin) {
    handleLogIn(admin, {
      onSettled: () => reset(),
    });
  }

  if (isLogging) return <Loader />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-2 flex flex-col items-start rounded-md border-2 border-stone-400 p-1 px-3 text-xl text-stone-700"
    >
      <label htmlFor="email" className="mt-1 text-stone-300">
        Email*
      </label>
      {errors.email && (
        <p className="mb-1 text-sm text-pink-800">{errors.email.message}</p>
      )}
      <input
        type="email"
        {...register('email', {
          required: 'Email is required',
        })}
        disabled={isLogging}
        defaultValue={'guest@gmail.com'}
        className="mb-3 rounded-md"
      />

      <label htmlFor="password" className="mt-1 text-stone-300">
        Password*
      </label>
      {errors.password && (
        <p className="mb-1 text-sm text-pink-800">{errors.password.message}</p>
      )}
      <input
        type="password"
        {...register('password', { required: 'Password is required' })}
        disabled={isLogging}
        defaultValue={123123}
        className="mb-2 rounded-md"
      />

      <button
        className="my-3 self-center rounded-md bg-stone-500 p-1 text-stone-200"
        disabled={isLogging}
      >
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
