/* eslint-disable react-hooks/exhaustive-deps */

import { useUserContext } from '../hooks/contexHooks';

const Profile = () => {
  const {user} = useUserContext();
  console.log('user', user)
  return (
    <>
      <h2>Profile page</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
    </>
  );
};

export default Profile;
