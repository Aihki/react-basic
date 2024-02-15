import { useUserContext } from '../hooks/contexHooks';
import {useForm} from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {MediaItemWithOwner} from '../types/DBTypes';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const {user} = useUserContext();
  const {comments, addComment} = useCommentStore();

  const initValues = {
    commnent_text: '',
  };
  const doComment = async () => {
    if(!user) {
      return;
    }
    addComment({
      comment_text: inputs.commnent_text,
      media_id: item.media_id,
      user_id: user.user_id,
      username: user.username
    });
  };
  console.log(comments);
  const {handleSubmit, handleInputChange, inputs} = useForm(
    doComment,
    initValues,
  );

  return (
    <>
      <h3 className="text-3xl">Add Comments</h3>
      <form onSubmit={handleSubmit} className="flex flex-col text-center">
        <div className="flex w-4/5">
          <label className="w-1/3 p-6 text-end" htmlFor="commnent">
            Commnent
          </label>
          <input
            className="p3 m-3 w-2/3 rounded-md border-slate-500 text-slate-950"
            name="commnent_text"
            type="text"
            id="commnent"
            autoComplete="commnent"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-4/5 justify-end">
          <button
            className="bg-slate-750 p3 m-3 w-1/3 rounded-md"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default Comments;
