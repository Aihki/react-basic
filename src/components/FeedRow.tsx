import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import { useUserContext } from '../hooks/contexHooks';

const FeedRow = (props: {item: MediaItemWithOwner}) => {
    const {item}  = props;
    const {user} = useUserContext();
    console.log("user", user)

    return (
      <tr className="media-row">
        <td className="p-4">
          <img src={item.thumbnail} alt={item.title} className="w-64 h-48 object-cover" />
        </td>
        <td className="p-4">{item.title}</td>
        <td className="p-4">{item.description}</td>
        <td className="p-4">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td className="p-4">{item.filesize}</td>
        <td className="p-4">{item.media_type}</td>
        <td className="p-4">{item.username}</td>
        <td className="p-4">
          <Link className="bg-slate-700 p-2 hover:bg-slate-950" to="/single" state={item}>View</Link>
          {user &&(user.user_id === item.user_id || user.level_name === "Admin") && (
          <>
          <button className="bg-slate-700 p-2 hover:bg-slate-950"
           onClick={() => console.log("delete", item)} >Modify</button>
          <button className="bg-slate-700 p-2 hover:bg-slate-950"
           onClick={() => console.log("delete", item)}>Delete</button>
          </>
          )}
        </td>
      </tr>
    );
  };

export default FeedRow;
