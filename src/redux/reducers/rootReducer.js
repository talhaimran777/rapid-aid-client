/*eslint comma-dangle: ["error", "always-multiline"]*/
// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import loginReducer from './login/login.reducer'
import errorsReducer from './error'
import registerReducer from './register/register.reducer'
import taskFetchReducer from './task/fetch'
import taskPostReducer from './task/post'
import addCommentReducer from './task/comment/add'
import profileReducer from './profile'
import chatReducer from './chat/chatReducer'
import taskUpdateReducer from './task/update'
import taskDeleteReducer from './task/delete'
import offerPostReducer from './offer/post'
import orderFetchReducer from './order/fetch'
import hireWorkerReducer from './order/hire'
import completeOrderReducer from './order/complete'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  login: loginReducer,
  register: registerReducer,
  error: errorsReducer,
  taskFetch: taskFetchReducer,
  taskPost: taskPostReducer,
  taskUpdate: taskUpdateReducer,
  taskDelete: taskDeleteReducer,
  addComment: addCommentReducer,
  profile: profileReducer,
  chat: chatReducer,
  offerPost: offerPostReducer,
  orderFetch: orderFetchReducer,
  orderComplete: completeOrderReducer,

  hireWorker: hireWorkerReducer,
})

export default rootReducer
