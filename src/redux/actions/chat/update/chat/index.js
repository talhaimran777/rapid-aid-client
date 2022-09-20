/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_LOCAL_CHAT } from '../../../action.types/actionTypes'

// ** INITIATING CONVERSATIONS FETCHING
export const updateLocalChat = (messages) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_LOCAL_CHAT, payload: messages })
  }
}

export const handleUpdateLocalChat = (messages) => {
  return (dispatch) => {
    dispatch(updateLocalChat(messages))
  }
}
