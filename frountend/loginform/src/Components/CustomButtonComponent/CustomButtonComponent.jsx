import React from 'react';

import './CustomButtonComponent.css';

function CustomButtonComponent({ onClick, innerText }) {
  return (
    <button class="cta-btn" onClick={onClick ? onClick : null}>
      {innerText}
    </button>
  );
}

export default CustomButtonComponent;
