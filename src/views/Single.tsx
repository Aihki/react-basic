import {MediaItem} from '../types/DBTypes';
import { useLocation } from 'react-router-dom';
import {NavigateFunction, useNavigate} from "react-router-dom";


const Single =() => {
  const {state} = useLocation();
  const item: MediaItem = state;
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
    <p>{item.title}</p>
    <button className="close" onClick={() => {
      navigate(-1);
    }}>return</button>

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
    </>
  );
};
export default Single;

