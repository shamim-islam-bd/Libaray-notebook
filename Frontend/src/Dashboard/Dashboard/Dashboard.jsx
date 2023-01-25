import React from "react";
import { Link, Outlet } from "react-router-dom";
// import AddBook from "../AddBook/AddBook";
// import Managebook from "../Managebook/Managebook";
// import Admin from "../Admin/Admin";
// import NotFound from "../../pages/NotFound/NotFound";

export default function Dashboard() {
  return (
    <div className="container dashboard">
      <div className="row mt-3">
        <h1>Dashboard</h1>
        <div className="col-md-3">
          <nav>
            <ul className="list-group  my-5">
              <li className="list-group-item">
                <Link to="/dashboard/admin">Admin</Link>
              </li>
              <li className="list-group-item">
                <Link to="/dashboard/manage-book">Manage Book</Link>
              </li>
              <li className="list-group-item">
                <Link to="/dashboard/add-book">Add Book</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
