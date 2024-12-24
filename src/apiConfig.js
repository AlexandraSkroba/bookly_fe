const API_URL = process.env.API_URL || 'http://localhost:3001';

const API_ENDPOINTS = {
  signUp: `${API_URL}/auth/signup`,
  confirmEmail: `${API_URL}/auth/confirm/`,
  signIn: `${API_URL}/auth`,
  recoverPassword: `${API_URL}/auth/recover-password`,
  resetPassword: `${API_URL}/auth/reset-password`,
  newPassword: `${API_URL}/auth/new-password`,
  editUser: `${API_URL}/users`,
  uploadAvatar: `${API_URL}/users/upload-avatar`,
  getAvatar: `${API_URL}/users/:id/avatar`,
  getExhanges: `${API_URL}/exchanges`
}

export default API_ENDPOINTS
