import {useEffect, useReducer} from 'react';
import {Like, MediaItemWithOwner} from '../types/DBTypes';
import { useLike } from '../hooks/apiHooks';

type LikeState = {
  count: number;
  userLike: Like | null;
};
type LikeAction = {
  type: 'setLikeCount' | 'like';
  count?: number;
  like?: Like | null;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};
const likeReducer = (state: LikeState ,action: LikeAction): LikeState => {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state;
    default:
      return state;
  }
  return state;
};

const Likes = ({item}: {item: MediaItemWithOwner}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);

  const {getUserLike, getCountByMediaId, postLike, deleteLike} = useLike();

// get user like
const getLikes = async () => {
  const token = localStorage.getItem('token');
  if (!item || !token) {
    return;
  }
  try {
    const userLike = await getUserLike(item.media_id, token);
    likeDispatch({type: 'like', like: userLike});
  } catch (e) {
    likeDispatch({type: 'like', like: null});
    console.log('get user like error', (e as Error).message);
  }
};

// get like count
const getLikeCount = async () => {
  // get like count and dispatch it to the state
  try {
    const countResponse = await getCountByMediaId(item.media_id);
    likeDispatch({type: 'setLikeCount', count: countResponse.count});
  } catch (e) {
    likeDispatch({type: 'setLikeCount', count: 0});
    console.log('get user like error', (e as Error).message);
  }
};
useEffect(() => {
  getLikes();
  getLikeCount();
}, [item]);

const handleLike = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    // If user has liked the media, delete the like. Otherwise, post the like.
    if (likeState.userLike) {
      // TODO: delete the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
      await deleteLike(likeState.userLike.like_id, token);
    } else {
      // TODO: post the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
      await postLike(item.media_id, token);
      getLikes();
      getLikeCount();
    }
  } catch (e) {
    console.log('like error', (e as Error).message);
  }
};



  return (
    <>
    like count: {likeState.count}
      <button
        className="bg-slate-700 p-2 hover:bg-slate-950"
        onClick={handleLike}
      >
       {likeState.userLike ? 'Unlike': 'Like'}
      </button>
    </>
  );
};

export default Likes;
