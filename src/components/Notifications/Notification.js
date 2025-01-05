import { Component } from "react";
import axios from "axios";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import "./Notification.css";

export class Notification extends Component {

  dismissNotification = async (e) => {
    const id = e.target.dataset.id
    try {
      const response = await axios.delete(API_ENDPOINTS.dismissNotification.replace(':id', id), { headers: defaultHeaders })
      this.props.dismissHandler(this.props.id)
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <li className="btn btn-info border-secondary h4 d-flex justify-content-between align-items-center notification">
        <span style={{color: 'rgb(147 28 128)', fontWeight: 'bold', fontFamily: 'monospace'}} dangerouslySetInnerHTML={{ __html: this.props.text }}></span>
        <span aria-hidden="true" className="ml-2" data-id={this.props.id} onClick={this.dismissNotification}>&times;</span>
      </li>
    )
  }
}
