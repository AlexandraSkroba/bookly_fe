import { Component } from "react";
import { RecoverPasswordForm } from '../forms/RecoverPassword/RecoverPasswordForm';


export class RecoverPassword extends Component {
  render() {
    return (
      <>
        <div className="row h1 text-center mt-5"><div className="p">Recover your password</div></div>
        <div className="recover-form__wrapper row">
          <RecoverPasswordForm />
        </div>
      </>
    )
  }
}
