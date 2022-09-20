/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import { SEND_MESSAGE_INITIATED, SEND_MESSAGE_SUCCESS } from '../../../action.types/actionTypes'

// ** INITIATING CONVERSATIONS FETCHING
export const initiateSendMessage = () => {
  return (dispatch) => {
    dispatch({ type: SEND_MESSAGE_INITIATED })
  }
}

export const handleSendMessage = (data) => {
  return async (dispatch) => {
    dispatch(initiateSendMessage())
    try {
      const res = await useJwt.sendMessage(data)

      if (res && res.data) {
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: res.data })
        console.log(res.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
