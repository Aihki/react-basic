import { Link, Outlet } from "react-router-dom";

const Layout = () => {
return (
<>
  <header>
  <h1>Book Collection</h1>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/upload">Upload</Link>
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

}

export default Layout;
