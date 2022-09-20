/*eslint comma-dangle: ["error", "always-multiline"]*/
import {
  ADD_COMMENT_FAILED,
  ADD_COMMENT_INITIATED,
  ADD_COMMENT_SUCCESS,
} from '../../../../actions/action.types/actionTypes'

const addCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_INITIATED:
      return { commentAddInProcess: true }
    case ADD_COMMENT_SUCCESS:
      return { commentAddInProcess: false }
    case ADD_COMMENT_FAILED:
      return { commentAddInProcess: false, errs: action.payload.errors }
    default:
      return state
  }
}

export default addCommentReducer
