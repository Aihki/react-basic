import {Link} from 'react-router-dom';
import {MediaItemWithOwner} from '../types/DBTypes';
import { useUserContext } from '../hooks/contexHooks';

const FeedRow = (props: {item: MediaItemWithOwner}) => {
    const {item}  = props;
    const {user} = useUserContext();
    console.log("user", user)

    return (
      <tr className="p-4">
        <td  className="flex items-center justify-center">
          <img
          className="h-60 w-72 object-cover"
           src={item.thumbnail} alt={item.title} />
        </td>
        <td className="">{item.title}</td>
        <td className="text-ellipsis">{item.description}</td>
        <td className="">{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td className="">{item.filesize}</td>
        <td className="">{item.media_type}</td>
        <td className="">{item.username}</td>
        <td>
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
