import {MediaItem} from '../types/DBTypes';

const SingleView = (props: {
  item: MediaItem;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
<dialog open>
  <p>{item.title}</p>
  <button className="close" onClick={() => {
    setSelectedItem(undefined);
  }}>X</button>

  {item.media_type.includes('video') ? (
    <video controls src={item.filename}></video>
  ) : (
    <img src={item.filename} alt={item.title} />
  )}

  <div className="singleView">
    <div className="singleViewImage" style={{ backgroundImage: `url(${item.filename})`}}></div>
    <div className="singleViewInfo">
      <p>{item.description}</p>
    </div>
  </div>
</dialog>

  );
};
export default SingleView;

