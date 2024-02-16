import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import { useUpdateContext, useUserContext } from '../hooks/contexHooks';
import { useBook } from '../hooks/graphQLHooks';

const FeedRow = (props: {item: MediaItemWithOwner}) => {
    const {item}  = props;
    const {user} = useUserContext();
    const {deleteBook} = useBook();
    const {update, setUpdate} = useUpdateContext();


    const deleteHandler = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const result = await deleteBook(item.media_id, token);
        console.log(result.message)
        setUpdate(!update);
      } catch (e) {
        console.log((e as Error).message);
      }
    };

    return (
      <tr className="*:p-4">
        <td className="flex items-center justify-center ">
          <img src={item.thumbnail} alt={item.title} className="w-64 h-48 object-cover" />
        </td>
        <td className="p-4">{item.title}</td>
        <td className="p-4">{item.description}</td>
        <td className="p-4">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td className="p-4">{item.filesize}</td>
        <td className="p-4">{item.media_type}</td>
        <td className="p-4">{item.owner.username}</td>
        <td className="p-4">
        <div className="flex flex-col">
          <Link className="bg-zinc-700 text-center p-2 hover:bg-slate-950" to="/single" state={item}>View</Link>
          {user &&(user.user_id === item.user_id || user.level_name === "Admin") && (
          <>
          <button className="bg-zinc-600 p-2 hover:bg-slate-950"
           onClick={() => console.log("delete", item)} >Modify</button>
          <button className="bg-zinc-500 p-2 hover:bg-slate-950"
           onClick={deleteHandler}>Delete</button>
          </>
          )}
        </div>
          <p>Comments: {item.comments_count}</p>
        </td>
      </tr>
    );
  };

export default FeedRow;
