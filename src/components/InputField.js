import { Component } from "react";

export class InputField extends Component {
  render() {
    const { id, name, value, label, onChange, disabled } = this.props;
    return (
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor={id} className="col-form-label text-capitalize">{label}</label>
          <input
            type="text"
            id={id}
            name={name}
            value={value}
            aria-describedby={id}
            onChange={onChange}
            className={`form-control ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}
