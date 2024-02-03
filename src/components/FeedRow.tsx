import {Link} from 'react-router-dom';
import {MediaItem} from '../types/DBTypes';

const FeedRow = (props: {item: MediaItem}) => {
  const {item} = props;
  return (
    <Link to="/single" state={item}>
      <div className="feed-container">
        <div className="feed-item">
          <div className="feed-item-row">
            <a
              className="feed-item-image"
              href=""
              style={{backgroundImage: `url(${item.thumbnail})`}}
            ></a>
            <div className="feed-item-info">
              <p className="feed-item-title">{item.title}</p>
              <p className="feed-item-description">{item.series_name}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedRow;
