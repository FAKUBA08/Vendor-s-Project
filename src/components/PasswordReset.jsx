import { useParams } from 'react-router-dom';
import Styles from "../Styles/Forget.module.css";
import lastLogo from "../Images/lastLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Client-side validation for password length
        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch(`https://vendors-node.onrender.com/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to reset password');
            }

            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred while resetting the password: ' + error.message);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className={Styles.forget}>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
            <div className={Styles.forgetInner}>
                <div className={Styles.forgetDetails}>
                    <div className={Styles.forgetImg}>
                        <img src={lastLogo} alt="logo" />
                    </div>
                    <div className={Styles.forgetText}>
                        <p>Reset Password</p>
                    </div>
                    <div className={Styles.email}>
                        <div>
                            <label htmlFor="password" className={Styles.LBtn}>New Password</label>
                        </div>
                        <div className={Styles.passwordContainer}> {/* New container for input and icon */}
                            <FaLock className={Styles.Enve} />
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className={Styles.eyeButton}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className={Styles.finalClick}>
                        <button onClick={handleResetPassword} disabled={loading}>
                            {loading ? 'Sending...' : 'Reset Password'}
                        </button>
                    </div>
                    <div className={Styles.Back}>
                        <p onClick={() => navigate("/Login")}>Back to Login</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
