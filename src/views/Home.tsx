import {MediaItem, MediaItemWithOwner, User} from '../types/DBTypes';
import FeedRow from '../components/FeedRow';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/utils';



const Home = () => {


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
},[]);

  return (
    <>
      <h2>Activity</h2>
      <div className="activity">
      {mediaArray.map((item) => ( <FeedRow key={item.media_id} item={item} />
      ))}
      </div>
    </>
  );
};
export default Home;
