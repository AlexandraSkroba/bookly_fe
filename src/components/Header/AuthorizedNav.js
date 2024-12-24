import { Component } from "react";
import { Link } from "react-router-dom";

export class AuthorizedNav extends Component {
  render() {
    return (
      <>
        <nav className="col-sm-12 align-middle d-flex">    
          <div className="col-sm-1"><Link to="/">Home</Link></div>
            <div className="col-sm-5"><Link to="books">Books</Link></div>
          <ul className="col-sm-6 d-flex flex-row-reverse">
            <li>
              <Link to="profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}
