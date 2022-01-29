import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInUsers } from '../../Redux/Action/action';
import { useDispatch, useSelector } from 'react-redux';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import InputComponent from '../InputComponent/InputComponent';

import './SignInComponent.css';

function SignInComponent() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.userStoreData);

  const [UserData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const changeUserValue = function (e) {
    let name = e.target.name;
    let value = e.target.value;

    setUserData({ ...UserData, [name]: value });
  };

  const SendUserData = function () {
    const { name, email, password, confirmPassword } = UserData;
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        dispatch(signInUsers({ name, email, password }));
      } else {
        alert('password and confirm password is not same');
      }
    } else {
      alert('please fill the filds');
    }
  };

  return (
    <div className="card">
      <div class="email-login">
        {selector !== null && selector.userLoginStaus && selector.userLoginStaus.success === true ? (
          <h1>sign in successful</h1>
        ) : (
          <>
            <h2 class="title">Sign in</h2>
            <p class="subtitle">
              Already have an account?
              <Link to="/login">
                <a>Log In</a>
              </Link>
            </p>
            <InputComponent title={'Name'} name="name" innerText={'Enter Name'} type={'text '} change={changeUserValue} value={UserData.name} />
            <InputComponent title={'Email'} name="email" innerText={'Enter Email'} type={'email'} change={changeUserValue} value={UserData.email} />
            <InputComponent
              title={'Password'}
              name="password"
              innerText={'Enter Password'}
              type={'password'}
              change={changeUserValue}
              value={UserData.password}
            />
            <InputComponent
              title={'Confirm Password'}
              name="confirmPassword"
              innerText={'Enter Confirm Password'}
              type={'password'}
              change={changeUserValue}
              value={UserData.confirmPassword}
            />
            <CustomButtonComponent onClick={SendUserData} innerText={'Sign In'} />

            <a class="forget-pass" href="#">
              Forgot password?
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default SignInComponent;
