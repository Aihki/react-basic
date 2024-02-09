/* eslint-disable react-hooks/exhaustive-deps */

import { useUserContext } from "../hooks/contexHooks";

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Name:{user.username}</p>
          <p>Email:{user.email}</p>
          <p>
            Created: {new Date(user.created_at).toLocaleDateString('fi-FI')}
          </p>
        </>
      )}
    </>
  );
};

export default Profile;
