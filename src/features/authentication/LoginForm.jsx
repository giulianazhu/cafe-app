import { useForm } from 'react-hook-form';
import useSignup from './useSignup';
import useLogin from './useLogin';

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start text-xl text-stone-700"
    >
      <label htmlFor="email"> Email </label>
      <input
        type="email"
        {...register('email', {
          required: 'Email is required',
        })}
        disabled={isLogging}
      />
      <label htmlFor="password"> Password</label>
      <input
        type="password"
        {...register('password', { required: 'Password is required' })}
        disabled={isLogging}
      />
      <button className="my-3 bg-stone-500" disabled={isLogging}>
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
