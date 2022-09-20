const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTRATION_INITIATED':
      return { ...state, inProcess: true };
    case 'REGISTRATION_SUCCESS':
      return { ...state, status: 'SUCCESS', inProcess: false };
    case 'REGISTRATION_FAILED':
      return { ...state, status: 'FAILED', inProcess: false };
    default:
      return state;
  }
};

export default registerReducer;
