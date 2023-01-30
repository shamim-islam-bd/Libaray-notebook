import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <div>
      <footer
        className="bg-footer page-footer font-small blue pt-2"
        style={{ backgroundColor: "#191d3a", color: "#fff" }}
      >
        <div className="footer-copyright text-center py-3">
          ©2023 Copyright:
          <h6>Notebook Library</h6>
        </div>
      </footer>
    </div>
  );
}
