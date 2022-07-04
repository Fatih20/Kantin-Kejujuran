import axios from 'axios';
import { useQuery } from '@sveltestack/svelte-query';
import { backendAddress, OPTIONS } from '../config';

export default function useIsLoggedIn() {
  return useQuery('isLoggedIn', () =>
    axios.get(backendAddress + '/user/me', OPTIONS).then((res) => res.data)
  );

//   return {
//     user: data as IUser | undefined,
//     isLoading,
//     error,
//   };
}