import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from "../Styles/Forget.module.css"

const SignOut= ({text}) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token or session data
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            {/* Other content */}
            <div className={Styles.out}>
                <button onClick={handleSignOut}>{text}</button>
            </div>
        </div>
    );
};

export default SignOut;
