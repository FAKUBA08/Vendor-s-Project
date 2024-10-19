import Styles from "../Styles/Forget.module.css";
import lastLogo from "../Images/lastLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa"; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Forget() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordReset = async () => {
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://your-backend-app.vercel.app/api/auth/forgot-password', { email });
            toast.success(response.data.message || 'Password reset link sent successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error sending password reset link');
        } finally {
            setLoading(false);
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
                        <p>Forget Password?</p>
                    </div>
                    <div className={Styles.email}>
                        <div>
                            <label htmlFor="email" className={Styles.LBtn}>Email Address</label>
                        </div>
                        <div>
                            <FaEnvelope className={Styles.Enve} />
                            <input
                                type="email"
                                placeholder="yourname@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={Styles.finalClick}>
                        <button onClick={handlePasswordReset} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Password Reset Link'}
                        </button>
                    </div>
                    <div className={Styles.Back}>
                        <p onClick={() => navigate("/Login")}>Back to Login</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forget;
