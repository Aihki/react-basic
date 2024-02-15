import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import { useUserContext } from '../hooks/contexHooks';

const FeedRow = (props: {item: MediaItemWithOwner}) => {
    const {item}  = props;
    const {user} = useUserContext();
    console.log("user", user)

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
        <td className="p-4">{item.username}</td>
        <td className="p-4">
          <Link className="bg-zinc-700 text-center p-2 hover:bg-slate-950" to="/single" state={item}>View</Link>
          {user &&(user.user_id === item.user_id || user.level_name === "Admin") && (
          <>
          <button className="bg-zinc-600 p-2 hover:bg-slate-950"
           onClick={() => console.log("delete", item)} >Modify</button>
          <button className="bg-zinc-500 p-2 hover:bg-slate-950"
           onClick={() => console.log("delete", item)}>Delete</button>
          </>
          )}
        </td>
      </tr>
    );
  };

export default FeedRow;
