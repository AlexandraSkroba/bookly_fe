import { Component } from "react";


export class FormErrors extends Component {
  render () {
    let errors = this.props.errors
    errors = typeof errors === 'string' ? [errors] : errors

    return (
      <div className="row form-errors">
        <div className="col-sm-12">
          {errors.length > 0 && (
            <ul style={{ color: 'red' }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
