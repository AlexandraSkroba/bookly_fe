import React, { useState } from "react";
import API_ENDPOINTS from "../../apiConfig";
import { FormErrors } from "../../components/FormErrors/FormErrors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const guardClosedSrc = process.env.PUBLIC_URL + '/images/guard_closed.jpeg';
  const guardOpenSrc = process.env.PUBLIC_URL + '/images/guard_open.jpeg';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setSuccess(true);
    try {
      const response = await axios.post(API_ENDPOINTS.signIn, { email, password });
      setErrors([]);
      localStorage.setItem('accessToken', response.data.access_token);
      
      navigate('/');

    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message || ['Resource is temporarily unavailable. Try again later']);
        setSuccess(false);
      }
    }
  };

  return (
    <>
      <img src={success ? guardOpenSrc : guardClosedSrc} width={"480"} height={"320"} alt="Guard" />
      <form onSubmit={handleSubmitEvent}>
        <FormErrors errors={errors} />
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label htmlFor="email" className="col-form-label">Email</label>
              <input type="email" id="email" name="email" value={email} placeholder="sample@mail.ru" aria-describedby="email" onChange={handleChange} className="form-group" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label htmlFor="password" className="col-form-label">Password</label>
              <input type="password" id="password" name="password" value={password} aria-describedby="password" onChange={handleChange} className="form-group" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <input type="submit" className="btn-success" value="Do you know who is my father?!" />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
