import { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export class Home extends Component {
  render() {
    return (
      <>
        <div className="row d-flex flex-column align-items-center w-100 mt-5 home__wrapper">
          <div className="col-sm-4 h1 mt-5">
            <p>Welcome to Bookly!</p>
          </div>
          <div className="col-sm-12 mt-5 h3">Do you want to know whom of your friends have read this?</div>
          <div className="col-sm-5 mt-5">
            <img src={process.env.PUBLIC_URL + '/images/home_img.webp'} width={"480"} height={"640"} />
          </div>
          <div className="col-sm-12 h2 mt-5 text-center">THEN</div>
          <div className="col-sm-6 row d-flex flex-row justify-content-between mb-3 mt-5">
            <Link to="login" className="col-sm-4 btn btn-success font-weight-bold">Log In</Link>
            <div className="col-sm-4 font-weight-bold h2 text-center">or</div>
            <Link to="sign-up" className="col-sm-4 btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </>
    )
  }
}
