import { NavLink, Outlet } from 'react-router-dom';

function LayoutPage() {
  return (
    <div className="layout">
      <nav id="sidebar">
        <NavLink to="/add-user"> Add Users</NavLink>
        <NavLink to="/get-user">Get Users</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutPage;
