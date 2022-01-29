import { ACTION_TYPE } from '../ActionType/ActionType';

const initalState = {
  userLoginStaus: null,
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SIGNIN_USERS:
      return {
        ...state,
        userLoginStaus: action.payload,
      };

    case ACTION_TYPE.LOGIN_USERS:
      return {
        ...state,
        userLoginStaus: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
