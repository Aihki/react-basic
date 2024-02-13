import { MediaItemWithOwner} from '../types/DBTypes';
import { useLocation } from 'react-router-dom';
import {NavigateFunction, useNavigate} from "react-router-dom";


const Single =() => {
  const {state} = useLocation();
  const item: MediaItemWithOwner = state;
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <h3>{item.title}</h3>
      {item.media_type.includes('video') ? (
        <video controls src={item.filename}></video>
      ) : (
        <img src={item.filename} alt={item.title} />
      )}
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
    </>
  );
};
export default Single;
