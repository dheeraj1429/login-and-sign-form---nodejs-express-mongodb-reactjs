import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Action/action';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import InputComponent from '../InputComponent/InputComponent';

import './LogInComponent.css';

function LogInComponent() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.userStoreData.userLoginStaus);

  const [UserData, setUserData] = useState({
    email: '',
    password: '',
  });

  const changeUserValue = function (e) {
    let name = e.target.name;
    let value = e.target.value;

    setUserData({ ...UserData, [name]: value });
  };

  const SendUserData = function () {
    const { email, password } = UserData;

    if (email && password) {
      dispatch(
        loginUser({
          email,
          password,
        })
      );
    }
  };

  return (
    <div className="card">
      {selector !== null && selector.data && selector.data.success === true ? (
        <h1>{selector.data.massage}</h1>
      ) : (
        <div>
          <h2 class="title">Log in</h2>
          <p class="subtitle">
            Don't have an account?
            <Link to="/signin">
              <a>sign Up</a>
            </Link>
          </p>

          <div class="email-login">
            <InputComponent title={'Email'} name="email" innerText={'Enter Email'} type={'email'} change={changeUserValue} value={UserData.email} />
            <InputComponent
              title={'Password'}
              name="password"
              innerText={'Enter Password'}
              type={'password'}
              change={changeUserValue}
              value={UserData.password}
            />
          </div>

          <CustomButtonComponent innerText={'Log In'} onClick={SendUserData} />

          <a class="forget-pass">Forgot password?</a>
        </div>
      )}
    </div>
  );
}

export default LogInComponent;
