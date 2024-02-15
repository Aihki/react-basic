import { MediaItemWithOwner} from '../types/DBTypes';
import { useLocation } from 'react-router-dom';
import {NavigateFunction, useNavigate} from "react-router-dom";
import Likes from '../components/likes';
import Comments from '../components/Comment';


const Single =() => {
  const {state} = useLocation();
  const item: MediaItemWithOwner = state;
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <h3 className="text-3xl">{item.title}</h3>
      {item.media_type.includes('video') ? (
        <video className="max-w-full" controls src={item.filename}></video>
      ) : (
        <img className="max-w-full" src={item.filename} alt={item.title} />
      )}
      <Likes item={item}/>
      <p>{item.description}</p>
      <p>Uploaded at: {new Date(item.created_at).toLocaleString('fi-FI')}, by: {item.username} </p>
      <p>{item.filesize}</p>
      <p>{item.media_type}</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </button>
      < Comments item={item} />
    </>
  );
};
export default Single;
