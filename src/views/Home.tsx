
import FeedRow from '../components/FeedRow';
import {useBook} from '../hooks/apiHooks';



const Home = () => {

const {mediaArray} = useBook();

  return (
    <>
      <h2 className="text-3xl">Activity</h2>
      <div className="activity"></div>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
        {mediaArray.map((item) => ( <FeedRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
