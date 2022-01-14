import { useState } from 'react';
import './style.css';
import { ReactComponent as ErrorIcon } from '../../assets/error_icon.svg';

/**
 * React component to display Error Alert with msg
 * incase of: no data in uploaded file, invalid data file
 * @param {string} message
 */
export default function ErrorMsg({ message }) {
  return (
    <div className="error-msg__container">
      <ErrorIcon className="error-icon" />
      <p>
        {message
          ? message
          : 'Something wrong happened please upload another file!'}
      </p>
    </div>
  );
}
