import { Component } from "react";
import { Link } from "react-router-dom";

export class AuthorizedNav extends Component {
  render() {
    return (
      <>
        <nav className="col-sm-12 align-middle d-flex">    
          <div className="col-sm-3"><Link to="/">Home</Link></div>
          <ul className="col-sm-9 d-flex flex-row-reverse">
            <li>
              <Link to="profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}
