export const API_URL = process.env.API_URL || 'http://localhost:3001';

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
  makeAvailable: `${API_URL}/books/:id/make-available`,
  notificationsTest: `${API_URL}/notifications/test`,
  getNotifications: `${API_URL}/notifications/current`,
  dismissNotification: `${API_URL}/notifications/:id`,
  currentUser: `${API_URL}/users/current`,
  exchanges: `${API_URL}/exchanges`,
  dialogs: `${API_URL}/dialogs`,
  messages: `${API_URL}/messages`,
  ratings: `${API_URL}/ratings`
}

export const defaultHeaders = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }


export default API_ENDPOINTS
