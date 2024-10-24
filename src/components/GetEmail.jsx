import React, { useState, useEffect } from 'react';
import Styles from '../Styles/Accordion.module.css';

const UserEmailInput = () => {
  const [email, setEmail] = useState('');


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setEmail(parsedUser.email);  
    }
  }, []);

  return (
    <div className={Styles.carryInput}>
      <label htmlFor="email">Your Address</label>
      <input
        type="email"
        className={Styles.inputDrop}
        value={email}  
        readOnly   
      />
    </div>
  );
};

export default UserEmailInput;
