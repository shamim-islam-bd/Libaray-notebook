import React from "react";

export default function DashboardMain() {
  return (
    <div>
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
  );
}
