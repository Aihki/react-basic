import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/contexHooks'

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  if (!user) {
    handleAutoLogin();
  }

  return (
    <>
      <header>
        <h1>Book Collection</h1>
        <nav>
          <ul className='flex justify-end bg-slate-950'>
            <li>
              <Link className='hover:bg-slate 700 block p-4 text-center text-slate-50' to="/">Home</Link>
            </li>
            <li>
              <Link className='hover:bg-slate 700 block p-4 text-center text-slate-50' to="/profile">Profile</Link>
            </li>
            <li>
              <Link className='hover:bg-slate 700 block p-4 text-center text-slate-50' to="/upload">Upload</Link>
            </li>
            <li>
              <Link className='hover:bg-slate 700 block p-4 text-center text-slate-50' to="/login">Login</Link>
            </li>
            <li>
              <Link className='hover:bg-slate 700 block p-4 text-center text-slate-50' to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>copyright</p>
      </footer>
    </>
  );
};

export default Layout;
