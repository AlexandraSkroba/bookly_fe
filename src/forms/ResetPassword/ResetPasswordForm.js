import { Component } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../apiConfig";
import { FormErrors } from "../../components/FormErrors/FormErrors";


export class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.token = props.token;
    this.error = props.error;  
    this.errorMessage = props.errorMessage;  

    this.state = {
      newPassword: '',
      newPasswordConfirmation: '',
      success: false,
      errors: []
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmitEvent = async (e) => {
    e.preventDefault()
    try {
      const { newPassword, newPasswordConfirmation } = this.state;
      await axios.post(API_ENDPOINTS.newPassword, { newPassword, newPasswordConfirmation, resetPasswordToken: this.token })
      this.setState({ success: true })
    } catch(e) {
      if (e.response) {
        this.setState({ errors: e.response.data.message || ['Resource is temporarily unavailable. Try again later'] })
      }
    }
  }

  render() {
    const { newPassword, newPasswordConfirmation, success, errors } = this.state;

    return (
      <>
        {this.error ? (
          <div className="row h1 justify-content-center">{this.errorMessage}</div>
        ) : success ? (
          <div className="row h2 justify-content-center">New password is successfully set. Log In</div>
        ) : (
          <form onSubmit={this.handleSubmitEvent}>
            <div className="row justify-content-center">
              <div className="col-sm-3">
                <FormErrors errors={errors} />
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="newPassword" className="col-form-label">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={newPassword}
                      aria-describedby="newPassword"
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="newPasswordConfirmation" className="col-form-label">Confirm New Password</label>
                    <input
                      type="password"
                      id="newPasswordConfirmation"
                      name="newPasswordConfirmation"
                      value={newPasswordConfirmation}
                      aria-describedby="newPasswordConfirmation"
                      onChange={this.handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <input type="submit" className="btn btn-success" value="Submit" />
                </div>
              </div>
            </div>
          </form>
        )}
      </>
    );
  }
}
