import {
  CONVERSATIONS_FETCH_INITIATED,
  CONVERSATIONS_FETCH_SUCCESS,
  MESSAGES_FETCH_INITIATED,
  MESSAGES_FETCH_SUCCESS,
  SET_CURRENT_CHAT_USER_ID,
  SEND_MESSAGE_SUCCESS,
  UPDATE_LOCAL_CHAT,
  CLEAR_CHAT_DATA,
} from '../../actions/action.types/actionTypes'

/*eslint comma-dangle: ["error", "always-multiline"]*/
const initialState = {
  showChat: false,
  messages: [],
  contacts: [],
  userProfile: {},
  selectedUser: {},
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONVERSATIONS_FETCH_INITIATED: {
      return {
        ...state,
        conversationsFetchInProces: true,
      }
    }

    case CONVERSATIONS_FETCH_SUCCESS: {
      return {
        ...state,
        conversationsFetchInProces: false,
        conversations: action.payload.conversations,
      }
    }

    case MESSAGES_FETCH_INITIATED: {
      return {
        ...state,
      }
    }

    case MESSAGES_FETCH_SUCCESS: {
      return {
        ...state,
        messages: action.payload.messages,
        showChat: true,
      }
    }

    case SET_CURRENT_CHAT_USER_ID: {
      return {
        ...state,
        currentChatUserId: action.payload,
      }
    }

    // SOCKET.IO STUFF
    case UPDATE_LOCAL_CHAT: {
      return {
        ...state,
        messages: action.payload,
      }
    }

    case CLEAR_CHAT_DATA: {
      return {
        ...state,
        messages: [],
        showChat: false,
        currentChatUserId: null,
      }
    }
    default:
      return state
  }
}

export default chatReducer
