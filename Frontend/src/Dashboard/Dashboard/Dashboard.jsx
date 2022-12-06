import React from "react";

export default function Dashboard() {
  return (
    <div className="container dashboard">
      <div className="row mt-3">
        <div className="col-md-3">
          <h1>Dashboard</h1>
          <hr />
          <ul className="list-group  my-5">
            <li className="list-group-item">
              <a href="/admin">Admin</a>
            </li>
            <li className="list-group-item">
              <a href="/admin/managebook">Manage Book</a>
            </li>
          </ul>
        </div>

        <div className="col-md-9">
          <h1>Admin</h1> <hr />
          <div className="row my-5">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Book</h5>
                  <p className="card-text">100</p>
                  <a href="#" className="view">
                    View
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total User</h5>
                  <p className="card-text">100</p>
                  <a href="#" className="view">
                    View
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Review</h5>
                  <p className="card-text">100</p>
                  <a href="#" className="view">
                    View
                  </a>
                </div>
              </div>
            </div>

            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
