import { Component } from "react";
import LoginForm from "../forms/Login/LoginForm";
import { Link } from "react-router-dom";


export class Login extends Component {

  render() {
    return (
      <>
        <div className="login__wrapper justify-content-center text-center">
          <div className="h1 mt-5">Log In</div>
          <div className="row">
            <div className="col-sm-12 text-center">
              <LoginForm />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-sm-12 text-center">
              <Link to="/auth/password-recovery">Forgot your password?</Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}
