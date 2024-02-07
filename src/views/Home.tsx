import {MediaItem, MediaItemWithOwner} from '../types/DBTypes';
import FeedRow from '../components/FeedRow';
import { useEffect, useState } from 'react';
import { fetchData } from '../lib/utils';



const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);
  const getBook = async () =>{
    try {
      const data = await fetchData<MediaItem[]>(import.meta.env.VITE_MEDIA_API + '/media');

      const dataWithOwner: MediaItemWithOwner = Promise.all(data.map((item) => {
        const username = fetchData(import.meta.env.VITE_AUTH_API + '/user/' + item.user_id)
        const itemWithOwner: MediaItemWithOwner = { ...item, username: username }

      }));

      setMediaArray(data);
    } catch (error) {
      console.error('Error fetching book data', error);
    }
  }
useEffect(() => {
  getBook();
}
, []);

  return (
    <>
      <h2>Activity</h2>
      <div className="activity">
      {mediaArray.map((item) => ( <FeedRow key={item.book_id} item={item} />
      ))}
      </div>
    </>
  );
};
export default Home;
