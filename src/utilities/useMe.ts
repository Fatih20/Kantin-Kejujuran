import axios from 'axios';
import { useQuery } from '@sveltestack/svelte-query';
import { backendAddress, apiOPTIONS } from '../config/configTechnical';

export default function useIsLoggedIn() {
  try {
    const queryResult = useQuery('isLoggedIn', () =>
      axios.get(backendAddress + '/user/me', apiOPTIONS).then((res) => res.data), {onError : (error) => {
        
      }}
      );
      return queryResult;
  } catch (error) {
    
  }

//   return {
//     user: data as IUser | undefined,
//     isLoading,
//     error,
//   };
}