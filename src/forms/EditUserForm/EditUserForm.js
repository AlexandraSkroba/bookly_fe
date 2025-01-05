import { Component } from "react";
import { FormErrors } from "../../components/FormErrors/FormErrors";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import axios from "axios";

export class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.ownPage = JSON.parse(localStorage.getItem('currentUser')).id == this.user.id
    this.state = {
      email: this.user?.email,
      username: this.user?.username,
      success: false,
      errors: []
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  resetForm() {
    window.location.reload()
  }

  handleSubmitEvent = async (e) => {
    e.preventDefault();

    try {
      this.setState({success: false, errors: []})
      const { username } = this.state;
      const response = await axios.put(API_ENDPOINTS.editUser, { username }, { headers: defaultHeaders })
      this.setState({success: true, errors: []})
    } catch(e) {
      if (e.response) {
        this.setState({errors: e.response.data.message.map((error, _i) => String(error).charAt(0).toUpperCase() + String(error).slice(1))})
      }
    }
  }

  render() {
    const { email, username, success, errors } = this.state;

    return(
      <>
        <form onSubmit={this.handleSubmitEvent}>
          { (success && <div className="row justify-content-center text-success font-weight-bold h4">Updated successfully</div>) }
          <div className="row justify-content-center">
            <div className="col-sm-3">
              <FormErrors errors={errors} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="username" className="col-form-label">Username</label>
                <input type="text" id="username" name="username" value={username} aria-describedby="username" onChange={this.handleChange} disabled={!this.ownPage} className="form-group" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="email" className="col-form-label">Email</label>
                <input type="email" id="email" name="email" value={email} placeholder="sample@mail.ru" aria-describedby="email" onChange={this.handleChange} disabled={!this.ownPage} className="form-group" />
              </div>
            </div>
          </div>
          { this.ownPage && (
              <>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="row justify-content-center">
                    <div className="col-sm-1">
                      <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-success"/>
                      </div>
                    </div>
                    <div className="col-sm-1">
                      <div className="btn btn-info" onClick={this.resetForm}>Reset</div>
                    </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </form>
      </>
    )
  }
}
