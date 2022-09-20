import { CLEAR_LOGIN_STATE, LOGIN_FAILED, LOGIN_INITIATED, LOGIN_SUCCESS } from '../../actions/action.types/actionTypes'

/*eslint comma-dangle: ["error", "always-multiline"]*/
const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_INITIATED:
      return { ...state, inProcess: true }
    case LOGIN_SUCCESS:
      return { ...state, status: 'SUCCESS', inProcess: false }
    case LOGIN_FAILED:
      return { ...state, status: 'FAILED', inProcess: false }
    case CLEAR_LOGIN_STATE:
      return {}
    default:
      return state
  }
}

export default loginReducer
