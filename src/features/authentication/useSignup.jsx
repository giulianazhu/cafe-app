import { useMutation } from '@tanstack/react-query';
import { createAdmin } from '../../services/apiAdmin';

export default function useSignup() {
  const {
    isLoading,
    mutate: handleSignUp,
    isError: isSignUpError,
    error: signUpError,
  } = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => console.log('Successfully signed up '),
    onError: (err) => console.error(err),
  });
  return { isLoading, handleSignUp, isSignUpError, signUpError };
}
