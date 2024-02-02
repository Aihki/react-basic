import { Link } from 'react-router-dom';
import {MediaItem} from '../types/DBTypes';


const FeedRow = (props: {item: MediaItem}) => {
  const {item} = props;
  return (
    <Link to = '/single' state= {item}>
    <div className="feeder" >
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
    </Link>
  );
};

export default FeedRow;




