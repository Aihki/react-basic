
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
            <th className="w-3/12">Thumbnail</th>
            <th className="w-1/12">Title</th>
            <th className="w-1/12">Description</th>
            <th className="w-1/12">Created</th>
            <th className="w-1/12">Size</th>
            <th className="w-1/12">Type</th>
            <th className="w-1/12">Owner</th>
            <th className="w-2/12">Actions</th>
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
