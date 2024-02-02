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
    {item.media_type.includes('video') ? (
      <video controls src={item.filename}></video>
    ) : (
      <img src={item.filename} alt={item.title} />
    )}

    <div className="single-book-container">
      <div className="single-book-img" style={{ backgroundImage: `url(${item.filename})`}}></div>
      <div className="single-book-info">
        <p>{item.description}</p>
      </div>
      <button className="close" onClick={() => {
      navigate(-1);
    }}>return</button>
    </div>
    </>
  );
};
export default Single;

