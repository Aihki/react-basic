// UserContext.tsx
import React, { createContext, useState } from 'react';
import { UserWithNoPassword } from '../types/DBTypes';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContextType, Credentials } from '../types/LocalTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserWithNoPassword | null>(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // login, logout and autologin functions are here instead of components
    const handleLogin = async (credentials: Credentials) => {
        try {
          // postLogin returns a token and a user object
          const loginResult = await postLogin(credentials);
          if (loginResult){
          // save token to local storage and set user to state
          localStorage.setItem('token', loginResult.token);
          setUser(loginResult.user);
          // navigate to home page
          navigate('/');
          }
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    const handleLogout = () => {
        try {
          // remove token from local storage and set user to null
            localStorage.removeItem('token');
            setUser(null);
            // navigate to home page
            navigate('/');
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
    const handleAutoLogin = async () => {
        try {
          // if there is a token in local storage, get the user object and set it to user state
            const token = localStorage.getItem('token');
            if (token) {
                const userResponse = await getUserByToken(token);
                //set user to state
                setUser(userResponse.user);
            }
            // navigaton to home page
            const origin = location.state.from.pathname || '/';
            navigate(origin);
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };
