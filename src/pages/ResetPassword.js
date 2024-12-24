import { ResetPasswordForm } from '../forms/ResetPassword/ResetPasswordForm';
import API_ENDPOINTS from '../apiConfig';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ResetPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const [requestError, setRequestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchResetPassword = async () => {
      try {
        await axios.get(API_ENDPOINTS.resetPassword, { params: { token } });
        setRequestError(false);
        setErrorMessage('');
      } catch (error) {
        setRequestError(true);
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMessage('The reset password link is invalid or has expired.');
          } else {
            setErrorMessage('An error occurred while processing your request.');
          }
        } else {
          setErrorMessage('Network error. Please try again later.');
        }
      }
    };

    fetchResetPassword();
  }, [token]);

  return (
    <>
      <div className="row justify-content-center h1 mb-5">
        Set new password
      </div>
      <div className="reset-password-form__wrapper row">
        <ResetPasswordForm token={token} error={requestError} errorMessage={errorMessage} />
      </div>
    </>
  );
};
