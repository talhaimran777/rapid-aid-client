/*eslint comma-dangle: ["error", "always-multiline"]*/
import useJwt from '@src/auth/jwt/useJwt'
import {
  CONVERSATIONS_FETCH_INITIATED,
  CONVERSATIONS_FETCH_SUCCESS,
  MESSAGES_FETCH_INITIATED,
  MESSAGES_FETCH_SUCCESS,
  SET_CURRENT_CHAT_USER_ID,
} from '../../action.types/actionTypes'

// ** INITIATING CONVERSATIONS FETCHING
export const initiateConversationsFetch = () => {
  return (dispatch) => {
    dispatch({ type: CONVERSATIONS_FETCH_INITIATED })
  }
}
// ** INITIATING MESSAGES FETCHING
export const initiateMessagesFetch = () => {
  return (dispatch) => {
    dispatch({ type: MESSAGES_FETCH_INITIATED })
  }
}

export const handleFetchConversations = () => {
  return async (dispatch) => {
    dispatch(initiateConversationsFetch())
    try {
      const res = await useJwt.getConversations()

      if (res && res.data) {
        dispatch({ type: CONVERSATIONS_FETCH_SUCCESS, payload: res.data })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleFetchMessages = (id) => {
  return async (dispatch) => {
    dispatch(initiateMessagesFetch())
    try {
      const res = await useJwt.getMessages(id)

      if (res && res.data) {
        dispatch({ type: MESSAGES_FETCH_SUCCESS, payload: res.data })
        dispatch({ type: SET_CURRENT_CHAT_USER_ID, payload: id })
        console.log(res.data)
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
