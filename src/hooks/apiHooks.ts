import {useEffect, useState} from 'react';
import {MediaItem, MediaItemWithOwner, User} from '../types/DBTypes';
import {fetchData} from '../lib/utils';
import {Credentials} from '../types/LocalTypes';
import {LoginResponse, MediaResponse, UploadResponse, UserResponse} from '../types/MessageTypes';

const useBook = () => {
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

  const postBook = async (file:UploadResponse, inputs: Record<string, string>, token: string) => {
    const book: Omit<MediaItem, 'media_id' | 'user_id' | 'thumbnail' | 'created_at'> = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(book),
    };
return await fetchData<MediaResponse>
(import.meta.env.VITE_MEDIA_API + '/media', options);
  };

  return {mediaArray, postBook};
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
  };

  return {postLogin};
};

const useFile = () => {
  const postFile = async(file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    return await fetchData<UploadResponse>(import.meta.env.VITE_UPLOAD_SERVER +'/upload', options);
  }
  return {postFile};


};

export {useBook, useUser, useAuthentication, useFile};
