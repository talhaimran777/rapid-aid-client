/*eslint comma-dangle: ["error", "always-multiline"]*/
// ** Auth Endpoints
export default {
  loginEndpoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
  registerEndpoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`,
  getTasksEndpoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
  getTaskEndpoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
  postTaskEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
  updateTaskEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
  addCommentEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/comment`,
  getOwnProfileEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/profiles/me`,
  updateOwnProfileEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/profiles/me`,
  getConversationsEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/conversations`,
  getMessagesEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/messages`,
  sendMessageEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/messages`,
  deleteTaskEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`,
  postOfferEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/offers`,
  getOrderEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/orders`,
  createOrderEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/orders`,
  markOrderCompleteEndPoint: `${process.env.REACT_APP_SERVER_URL}/api/v1/orders`,
  // refreshEndpoint: '/jwt/refresh-token',
  // logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
