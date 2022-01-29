import { ACTION_TYPE } from '../ActionType/ActionType';
import axios from 'axios';

const headers = {
  'content-type': 'application/json',
};

// Sign In User
export const signInUsers = function (data) {
  return async function (dispatch) {
    try {
      const postUserData = await axios.post('/user/new', { data }, { headers });

      if (postUserData) {
        dispatch({
          type: ACTION_TYPE.SIGNIN_USERS,
          payload: postUserData.data,
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPE.SIGNIN_USERS,
        payload: err,
      });
    }
  };
};

// LogIn User
export const loginUser = function (data) {
  return async function (dispatch) {
    try {
      const userDataFindRef = await axios.post('/user/find', { data }, { headers });

      if (userDataFindRef) {
        dispatch({
          type: ACTION_TYPE.LOGIN_USERS,
          payload: userDataFindRef,
        });
      }
    } catch (err) {
      dispatch({
        type: ACTION_TYPE.LOGIN_USERS,
        payload: err,
      });
    }
  };
};
