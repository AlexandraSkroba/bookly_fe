import { Component } from "react";
import { SignUpForm } from '../forms/SignUp/SignUpForm'
import "./SignUp.css";

export class SignUp extends Component {
  render() {
    return (
      <>
        <div className="signup__wrapper d-flex flex-column flex-space-between">
          <div className="row">
            <div className="signup__title col-sm-12 h1 mt-5 mb-5 text-center">
              SIGN UP!!!!!!!
            </div>
          </div>
          <div className="signup__form row text-center h4 justify-content-center">
            <div className="col-sm-6">
              <SignUpForm />
            </div>
          </div>
        </div>
      </>
    )
  }
}
