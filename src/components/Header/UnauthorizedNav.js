import { Component } from "react";
import { Link } from "react-router-dom";

export class UnauthorizedNav extends Component {
  render() {
    return (
      <>
        <nav className="col-sm-12 align-middle d-flex">    
          <div className="col-sm-3"><Link to="/">Home</Link></div>
          <ul className="col-sm-9 d-flex flex-row-reverse">
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}
