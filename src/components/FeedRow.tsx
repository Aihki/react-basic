
import {MediaItem} from '../types/DBTypes';


const FeedRow = (props: {item: MediaItem, setSelectedItem: (item: MediaItem | undefined) => void}) => {
  const {item, setSelectedItem} = props;
  return (
    <div className="feeder" onClick={() =>{
      setSelectedItem(item);
    }}>
    <div className="feed">
      <div className="feedRow">
      <a className="feedRowImage" href="" style={{ backgroundImage: `url(${item.thumbnail})`}}></a>
        <div className="feedRowInfo">
          <p>{item.title}</p>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FeedRow;
