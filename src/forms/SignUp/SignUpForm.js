import { Component } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../apiConfig";
import { FormErrors } from "../../components/FormErrors/FormErrors";


export class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      success: '',
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
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post(API_ENDPOINTS.signUp, {email, password})
      this.setState({success: response.data.message })
    } catch (error) {
      if (error.response) {
        this.setState({ errors: error.response.data.message || ['Resource is temporarily unavailable. Try again later'] })
      }
    }
  }

  render() {
    const { email, password, success, errors } = this.state;

    return (
      <>
        { success ? (
            <div className="row">
              <div className="col-sm-12 h1">
                {success}
              </div>
            </div>
          ) : (
            <form onSubmit={this.handleSubmitEvent}>
              <FormErrors errors={errors} />
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="email" className="col-form-label">Email</label>
                    <input type="email" id="email" name="email" value={email} placeholder="sample@mail.ru" aria-describedby="email" onChange={this.handleChange} className="form-group"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="password" className="col-form-label">Password</label>
                    <input type="password" id="password" name="password" value={password} aria-describedby="password" onChange={this.handleChange} className="form-group" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <input type="submit" className="btn-success" value="Sir, yes, sir!" />
                </div>
              </div>
            </form>
          )
        }
      </>
    )
  }
}
