const API_URL = process.env.API_URL || 'http://localhost:3001';

const API_ENDPOINTS = {
  signUp: `${API_URL}/auth/signup`,
  confirmEmail: `${API_URL}/auth/confirm/`,
  signIn: `${API_URL}/auth`
}

export default API_ENDPOINTS
