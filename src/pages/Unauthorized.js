import { Component } from "react";


export class Unauthorized extends Component {
  render() {
    return (
      <div className="row mt-5 h1">
        Insufficient permissions to access this resource.
      </div>
    )
  }
}
