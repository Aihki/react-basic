
import FeedRow from '../components/FeedRow';
import {useBook} from '../hooks/apiHooks';
import { MediaItemWithOwner } from '../types/DBTypes';



const Home = () => {

const mediaArray: MediaItemWithOwner[] = useBook();

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
