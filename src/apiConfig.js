const API_URL = process.env.API_URL || 'https://bookly-3h4g.onrender.com';

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
  delivery: `${API_URL}/exchanges/delivery-state`,
  dialogs: `${API_URL}/dialogs`,
  messages: `${API_URL}/messages`,
  ratings: `${API_URL}/ratings`,
  adminUsers: `${API_URL}/admin/users`,
  adminBooks: `${API_URL}/admin/books`,
  adminExchanges: `${API_URL}/admin/exchanges`,
  adminComplaints: `${API_URL}/admin/complaints`,
  adminSuspend: `${API_URL}/admin/suspend-user`,
  adminUnsuspend: `${API_URL}/admin/unsuspend-user`,
  adminUpdateExchange: `${API_URL}/admin/update-exchange`,
  adminDeleteExchange: `${API_URL}/admin/exchange/:id`,
  adminResolveComplaint: `${API_URL}/admin/complaints/satisfy`,
  adminDeleteBook: `${API_URL}/admin/book`
}

export const defaultHeaders = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }


export default API_ENDPOINTS
