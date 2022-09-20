/*eslint comma-dangle: ["error", "always-multiline"]*/
// import {
//   CLEAR_REGISTER_STATE,
//   TASKS_FETCH_INITIATED,
//   TASKS_FETCH_SUCCESS,
// } from '../../../actions/action.types/actionTypes'

import {
  POST_OFFER_FAILED,
  POST_OFFER_INITIATED,
  POST_OFFER_SUCCESS,
  RESET_OFFER_POST,
} from '../../../actions/action.types/actionTypes'
//
const offerPostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_OFFER_INITIATED:
      return { inProcess: true }

    case POST_OFFER_SUCCESS:
      return { inProcess: false, offer: action.payload, isOfferPosted: true }

    case POST_OFFER_FAILED:
      return { inProcess: false, errs: action.payload.errors }

    case RESET_OFFER_POST:
      return {}
    default:
      return state
  }
}

export default offerPostReducer
