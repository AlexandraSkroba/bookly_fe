import axios from "axios";
import { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import API_ENDPOINTS from "../apiConfig";



export const ConfirmEmailWrapper = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  return (<ConfirmEmail token={token} />)
}

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.requested = false;
    this.token = this.props.token;
    this.state = {
      message: 'Wait a bit...'
    }
  }

  async componentDidMount() {
    try {
      if (!this.requested) {
        this.requested = true 
        const response = await axios.get(API_ENDPOINTS.confirmEmail + this.token, {})
        this.setState({message: response.data.message})
      }
    } catch (error) {
      this.setState({message: 'Something gone wrong. Please contact support.'})
    }
  }

  render() {
    const { message } = this.state;
    return (
      <>
        <div className="row text-center">
          <div className="col-sm-12">
            { message }
          </div>
        </div>
      </>
    )
  }
}
