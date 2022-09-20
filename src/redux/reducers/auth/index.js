/*eslint comma-dangle: ["error", "always-multiline"]*/
// **  Initial State

import { SET_CURRENT_USER, SET_IO } from '../../actions/action.types/actionTypes'

// import { SET_CURRENT_USER } from '../actions/actionTypes'
const isEmpty = require('is-empty')

const initialState = {
  isAuthenticated: false,
  user: {},
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }

    case SET_IO:
      return {
        ...state,
        socketClient: action.payload,
      }
    case 'LOGOUT':
      return {}
    // case USER_LOADING:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    default:
      return state
  }
}

export default authReducer

// const initialState = {
//   userData: {}
// }

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         ...state,
//         userData: action.data,
//         [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
//         [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
//       }
//     case 'LOGOUT':
//       const obj = { ...action }
//       delete obj.type
//       return { ...state, userData: {}, ...obj }
//     default:
//       return state
//   }
// }

// export default authReducer
