const errorsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'VALIDATIION_ERRORS':
      return { ...state, data: action.payload };
    case 'CLEAR_ERRORS':
      return {};
    default:
      return state;
  }
};

export default errorsReducer;
