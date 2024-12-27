import { Component } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../apiConfig";

export class Notification extends Component {

  dismissNotification = async (e) => {
    try {
      const response = await axios.delete(API_ENDPOINTS.dismissNotification.replace(':id', this.props.id), { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
      this.props.dismissHandler(this.props.id)
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <li className="btn btn-info border-secondary h4 d-flex justify-content-between align-items-center">
        <span style={{color: 'rgb(147 28 128)', fontWeight: 'bold', fontFamily: 'monospace'}}>{this.props.text}</span>
        <span aria-hidden="true" className="ml-2" onClick={this.dismissNotification}>&times;</span>
      </li>
    )
  }
}
