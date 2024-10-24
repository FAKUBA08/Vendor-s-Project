import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from "../Styles/Forget.module.css"

const SignOut= ({text}) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); 
        navigate('/login'); 
    };

    return (
        <div>
            <div className={Styles.out}>
                <button onClick={handleSignOut}>{text}</button>
            </div>
        </div>
    );
};

export default SignOut;
