import React from "react";
import { Link } from "@reach/router";

export class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Product Catalog
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
