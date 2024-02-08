import {useEffect, useState} from 'react';
import {MediaItem, MediaItemWithOwner, User} from '../types/DBTypes';
import {fetchData} from '../lib/utils';
import {Credentials} from '../types/LocalTypes';
import {LoginResponse, UserResponse} from '../types/MessageTypes';

const useBook = (): MediaItemWithOwner[] => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getBook = async () => {
    try {
      const bookItems = await fetchData<MediaItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const bookItemsWithOwner: MediaItemWithOwner[] = await Promise.all(
        bookItems.map(async (item) => {
          const user = await fetchData<User>(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          const bookWithOwner: MediaItemWithOwner = {
            ...item,
            username: user.username,
          };
          return bookWithOwner;
        }),
      );

      setMediaArray(bookItemsWithOwner);
      console.log('bookItems', bookItemsWithOwner);
    } catch (error) {
      console.error('Error fetching book data', error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return mediaArray;
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options: RequestInit = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    console.log(token)
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token/',
      options,
    );
  };

  const postUser = async (user: Record<string, string>
  ) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    await fetchData<UserResponse>(import.meta.env.VITE_AUTH_API + '/users/', options,);
  };


  return {getUserByToken, postUser};
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(creds),
        },
      );
    } catch (error) {
      console.error('Error fetching book data', error);
    }
  };

  return {postLogin};
};

export {useBook, useUser, useAuthentication};
