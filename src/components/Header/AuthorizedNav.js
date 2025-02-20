import { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from "@fortawesome/free-solid-svg-icons";

export class AuthorizedNav extends Component {
  render() {
    const isAdmin = JSON.parse(localStorage.getItem('currentUser')).is_admin;

    return (
      <>
        <nav className="col-sm-12 align-middle d-flex">    
          <div className="col-sm-1"><Link to="/">Home</Link></div>
          { isAdmin ? (
              <>
                <div className="col-sm-1"><Link to="books">Books</Link></div>
                <div className="col-sm-4 text-end"><Link to="/admin">Admin</Link></div>
              </>
            ) : (
              <div className="col-sm-5"><Link to="books">Books</Link></div>
            )
          }
          <ul className="col-sm-6 d-flex flex-row-reverse">
            <li>
              <Link to="profile">Profile</Link>
            </li>
            <li></li>
            <li>
              <Link to="dialogs"><FontAwesomeIcon icon={ faComment } /></Link>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}
