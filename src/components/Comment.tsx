import {useEffect, useRef} from 'react';
import {useForm} from '../hooks/formHooks';
import {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/contexHooks';
import {useComment} from '../hooks/apiHooks';
import { useCommentStore } from '../Store';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {comments, setComments} = useCommentStore();
  const {user} = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);
  const {getCommentsByMediaId, postComment} = useComment();

  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      return;
    }
    try {
      await postComment(
        inputs.comment_text,
        item.media_id,
        user.user_id,
        token,
      );
      await getComments()
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (e) {
      console.log('post comment error', (e as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doComment,
    initValues,
  );
  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (e) {
      console.log('get comments error', (e as Error).message);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {user && (
        <>
          <h3 className="text-xl">Post Comment</h3>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex w-4/5">
              <label className="w-1/3 p-6 text-end" htmlFor="comment">
                Comment
              </label>
              <input
                className="m-3 w-2/3 rounded-md border border-slate-500 p-3 text-slate-950"
                name="comment_text"
                type="text"
                id="comment"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-4/5 justify-end">
              <button
                className="m-3 w-1/3 rounded-md bg-slate-700 p-3"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </>
      )}
      {comments.length > 0 && (
        <>
          <h3 className="text-xl">Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.comment_id}>
                <div className="rounded-md border border-slate-200 bg-slate-800 p-3 text-slate-100">
                  <span className="font-bold text-slate-200">
                    On{' '}
                    {new Date(comment.created_at!).toLocaleDateString('fi-FI')}{' '}
                  </span>
                  <span className="font-bold text-slate-200">
                    {comment.username} wrote:
                  </span>
                  <span className="ml-2">{comment.comment_text}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Comments;
