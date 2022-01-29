import React from 'react';

import './InputComponent.css';

function InputComponent({ title, name, innerText, type, change, value }) {
  return (
    <>
      <label for="psw">
        <b>{title}</b>
      </label>
      <input type={type} name={name} placeholder={innerText} required value={value} onChange={change} />
    </>
  );
}

export default InputComponent;
