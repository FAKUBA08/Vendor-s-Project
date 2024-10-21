import React, { useState } from 'react';
import axios from 'axios';
import Styles from "../Styles/Login.module.css";
import lastLogo from "../Images/lastLogo.png";
import goggle from "../Images/goggle.png";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import { ImSpinner2 } from "react-icons/im"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../Shared/API/Request';
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation();
  const verificationMessage = location.state?.verificationMessage;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev);
    if (rememberMe) {
      setEmail("");
      setPassword("");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErrorMessage(""); 
    setSuccessMessage(""); 
    setIsLoading(true);
  
    try {
      const response = await publicRequest.post('/auth/login', { email, password });
      
      const { firstName, lastName, isVerified } = response.data.user;
  
      if (!isVerified) {
        console.log("User is not verified, navigating to verify");
        toast.error("Please verify your email before logging in.");
        setTimeout(() => {
          navigate('/verify');
        }, 1500); 
        return;
      }
  
      console.log("User is verified, preparing to navigate to home");
      setSuccessMessage("Login successful!");
      toast.success("Login successful!");
  

      setTimeout(() => {
        navigate('/home');
      }, 1000); 
  
      if (rememberMe) {
        localStorage.setItem('userEmail', email); 
      }
  
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid credentials or server error");
      toast.error(
        <div>
          {error.response?.data?.message || "Invalid credentials or server error"}
        </div>
      );
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    
    <div className={Styles.Login}>
      <div className={Styles.LoginInner}>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
      {verificationMessage && (
        <div className={Styles.verification}>
          <p>{verificationMessage}</p>
        </div>
      )}
        <div className={Styles.allLogin}>
          
          <div className={Styles.logo}>
            <div className={Styles.logoImg}>
              <img src={lastLogo} alt="AuditPlus Logo" />
            </div>
            
            <div className={Styles.logoContent}>
              <p>auditplus</p>
            </div>
          </div>

          <div className={Styles.auditContent}>
            <p>Sign In</p>
          </div>

          <div className={Styles.goggle}>
            <button>
              <img src={goggle} alt="Google" />
              <span>Sign In with Google</span>
            </button>
          </div>

          <div className={Styles.underline}>
            <div className={Styles.under}></div>
            <div className={Styles.Or}>or</div>
            <div className={Styles.under}></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className={Styles.email}>
              <label htmlFor="email">Email Address</label>
              <div className={Styles.inputContainer}>
                <FaEnvelope className={Styles.icon} />
                <input
                  type="email"
                  id="email"
                  placeholder="yourname@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={Styles.password}>
              <label htmlFor="password">Password</label>
              <div className={Styles.inputContainer}>
                <FaLock className={Styles.icon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="........"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={togglePasswordVisibility} className={Styles.eyeButton}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className={Styles.passInt}>
              <div className={Styles.check}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="rememberMe" className={Styles.rememberLabel}>Keep me signed in</label>
              </div>
              <div className={Styles.forget}><p onClick={() => navigate('/forget-password')}>Forget Password</p></div>
            </div>

            <div className={Styles.finalClick}>
              <button type="submit" disabled={isLoading} className={Styles.signInButton}>
                {isLoading ? (
                  <ImSpinner2 className={Styles.spinner} />
                ) : (
                  <>
                    <FaSignInAlt className={Styles.arrow} /> 
                    <p className={Styles.arrowP}> Sign in</p>
                  </>
                )}
              </button>
            </div>

            <div className={Styles.accoutNot}>
              <p>Don't have an account? <span onClick={() => navigate('/')} >
                Sign Up</span></p>
            </div>

            <div className={Styles.finalMessage}>
              <p>Already have a Auditplus account? No problem, sign in <br />
                with your existing credentials.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
