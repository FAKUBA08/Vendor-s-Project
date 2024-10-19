import Styles from "../Styles/Forget.module.css";
import lastLogo from "../Images/lastLogo.png";
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import SignOut from "../components/SignOut";

function Verify() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const navigate = useNavigate();

    const checkVerificationStatus = async () => {
        try {
            const response = await axios.post('https://your-backend-app.vercel.app/api/auth/check-verification', { email });
            return response.data.verified; // Return verification status
        } catch (error) {
            console.error('Error checking verification status:', error);
            return false; // Assume not verified if there's an error
        }
    };

    const handleResendVerification = async () => {
        if (!showEmailInput) {
            setShowEmailInput(true);
            return;
        }

        setLoading(true);
        try {
            const isVerified = await checkVerificationStatus(); // Check verification status

            if (isVerified ) {
              setInterval(() => {
                toast.success("Email verification successful!");
                navigate('/home');
              },2000);
                return; // Exit if already verified
            }
    

            const response = await axios.post('https://your-backend-app.vercel.app/api/auth/resend-verification', { email });
            toast.success(response.data.message || "Verification email resent successfully!");

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to resend verification email");
            console.error('Error resending verification email:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Styles.forget}>
            <div className={Styles.forgetInner}>
                <div className={Styles.forgetDetails}>
                    <div className={Styles.forgetImg}>
                        <img src={lastLogo} alt="logo" />
                    </div>
                    <div className={Styles.forgetTextEmail}>
                        <p>Verify Your Email</p>
                    </div>
                    <div className={Styles.verification}>
                        <p>An Email verification link has been sent to your email that <br />
                        you've used for signing up. Please also check the spam <br />
                        folder.</p>
                    </div>
                
                    {showEmailInput && (
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                            required 
                            className={Styles.emailInput}
                        />
                    )}
                    
                    <div className={Styles.finalClick2}>
                        <button onClick={handleResendVerification} disabled={loading}>
                            {loading ? "Sending..." : (showEmailInput ? "Resend Verification Email" : "Resend Verification Email")} 
                            <FaEnvelope className={Styles.Evelop2} />
                        </button>
                    </div>
                  
                   <SignOut/>
              
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
}

export default Verify;
