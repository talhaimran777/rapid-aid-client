import {
  FETCH_ORDER_FAILED,
  FETCH_ORDER_INITIATED,
  FETCH_ORDER_SUCCESS,
} from '../../../actions/action.types/actionTypes'

/*eslint comma-dangle: ["error", "always-multiline"]*/
const orderFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDER_INITIATED:
      return { inProcess: true }

    case FETCH_ORDER_SUCCESS:
      return { inProcess: false, order: action.payload }

    case FETCH_ORDER_FAILED:
      return { inProcess: false, error: action.payload }
    default:
      return state
  }
}

export default orderFetchReducer
