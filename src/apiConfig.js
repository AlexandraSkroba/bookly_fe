export const API_URL = process.env.API_URL || 'https://28ef-37-214-7-145.ngrok-free.app';

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
  getExchanges: `${API_URL}/exchanges`,
  getBooks: `${API_URL}/books`,
  notificationsTest: `${API_URL}/notifications/test`,
  getNotifications: `${API_URL}/notifications/current`,
  dismissNotification: `${API_URL}/notifications/:id`,
  currentUser: `${API_URL}/users/current`,
}

export default API_ENDPOINTS
