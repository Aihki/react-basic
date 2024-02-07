import { useEffect, useState } from 'react';
import { MediaItem, MediaItemWithOwner, User } from '../types/DBTypes';
import { fetchData } from '../lib/utils';


const useBook = ():MediaItemWithOwner[] => {

  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const getBook = async () =>{
    try {
      const bookItems = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media');
      const bookItemsWithOwner: MediaItemWithOwner[] = await Promise.all(bookItems.map(async (item) => {
        const user = await fetchData<User>(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id)
        const bookWithOwner: MediaItemWithOwner = { ...item, username: user.username };
        return bookWithOwner;
      }));

      setMediaArray(bookItemsWithOwner);
      console.log('bookItems', bookItemsWithOwner)
    } catch (error) {
      console.error('Error fetching book data', error);
    }
  }
useEffect(() => {
  getBook();
}, []);

return mediaArray;
};

const useUser = ()  => {

}



export {useBook, useUser};
