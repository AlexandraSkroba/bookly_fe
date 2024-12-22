import { Component } from "react";
import "./Footer.css";

export class Footer extends Component {
  render() {
    return (
      <>
        <footer className="text-center text-lg-start text-white">
          <div className="text-center p-3">
            Powered by <a className="facebook-link" href="https://www.facebook.com/khazar.milkers/" about="_blank">Khazar Milkers</a>
          </div>
        </footer>
      </>
    )
  }
}
