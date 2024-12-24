import React, { Component } from "react";
import API_ENDPOINTS from "../../apiConfig";
import { FormErrors } from "../../components/FormErrors/FormErrors";
import axios from "axios";

export class RecoverPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: [],
      success: false,
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ email: value });
  }

  handleSubmitEvent = async (e) => {
    e.preventDefault();
    const { email } = this.state;

    try {
      const response = await axios.post(API_ENDPOINTS.recoverPassword, { email });
      this.setState({ errors: [], success: true });
    } catch (error) {
      if (error.response) {
        this.setState({
          errors: error.response.data.message || ['Resource is temporarily unavailable. Try again later'],
        });
      }
    }
  }

  render() {
    const { email, errors, success } = this.state;

    return (
      success ? (
        <div className="row h2 mt-5 justify-content-center">Password recovery email has been sent</div>
      ) : (
        <>
          <form onSubmit={this.handleSubmitEvent} className="mt-5">
            <div className="row justify-content-center">
              <div className="col-sm-3">
                <FormErrors errors={errors} />
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-sm-3 text-center">
                <div className="form-group">
                  <label className="col-form-label" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="sample@mail.ru"
                    aria-describedby="email"
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-3 text-center">
                <input type="submit" value="Reset password" className="btn btn-info" />
              </div>
            </div>
          </form>
        </>
      )
    );
  }
}
