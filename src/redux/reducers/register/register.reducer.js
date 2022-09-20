import { CLEAR_REGISTER_STATE } from '../../actions/action.types/actionTypes'

const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTRATION_INITIATED':
      return { ...state, inProcess: true }
    case 'REGISTRATION_SUCCESS':
      return { ...state, status: 'SUCCESS', inProcess: false }
    case 'REGISTRATION_FAILED':
      return { ...state, status: 'FAILED', inProcess: false }
    case CLEAR_REGISTER_STATE:
      return {}
    default:
      return state
  }
}

export default registerReducer
