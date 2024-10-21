import React, { useState } from "react";
import axios from "axios";
import Styles from "../Styles/SignUp.module.css";
import lastLogo from "../Images/lastLogo.png";
import goggle from "../Images/goggle.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; 
import Login from './Login'; 
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { publicRequest } from "../Shared/API/Request";

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [isLoginForm, setIsLoginForm] = useState(false); 

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormErrors({ ...formErrors, [id]: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) errors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSuccessMessage("");
      setErrorMessage("");
      toast.error("Please correct the highlighted fields!"); 
    } else {
      setIsLoading(true);
      try {
        const response = await publicRequest.post('/api/auth/signup', formData);
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        toast.success("Registration successful!"); 

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        });
        setTimeout(() => {
          navigate('/Login', { 
            state: { 
              verificationMessage: 'An Email verification link has been sent to your email that you used for signing up. Please also check the spam folder.' 
            } 
          });
        }, 1500);
        
      } catch (error) {
        setErrorMessage(error.response?.data.message || 'Error signing up');
        setSuccessMessage("");
        toast.error(error.response?.data.message || 'Error signing up'); 
        console.error('Error signing up:', error);
      } finally {
        setIsLoading(false); 
      }
    }
  };

  const handleToggleForm = () => {
    setIsLoginForm((prev) => !prev); 
  };

  return (
    <div className={Styles.SignUp}>
  
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />

      {isLoginForm ? (
        <Login /> 
      ) : (
        <div className={Styles.SignUpInner}>
          <div className={Styles.allInner}>
            <div className={Styles.logo}>
              <div className={Styles.logoImg}>
                <img src={lastLogo} alt="AuditPlus Logo" />
              </div>
              <div className={Styles.logoContent}>
                <p>auditplus</p>
              </div>
            </div>

            <div className={Styles.auditContent}>
              <p>Let’s Grow with AuditPlus</p>
            </div>

            <div className={Styles.goggle}>
              <button>
                <img src={goggle} alt="Google" />
                <span>Sign Up with Google</span>
              </button>
            </div>

            <div className={Styles.underline}>
              <div className={Styles.under}></div>
              <div className={Styles.Or}>or</div>
              <div className={Styles.under}></div>
            </div>

            <form className={Styles.form} onSubmit={handleSubmit}>
              <div className={Styles.names}>
                <div className={Styles.firstName}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className={formErrors.firstName ? Styles.errorInput : ""}
                  />
                  {formErrors.firstName && (
                    <p className={Styles.errorText}>{formErrors.firstName}</p>
                  )}
                </div>
                <div className={Styles.lastName}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className={formErrors.lastName ? Styles.errorInput : ""}
                  />
                  {formErrors.lastName && (
                    <p className={Styles.errorText}>{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className={Styles.email}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={formErrors.email ? Styles.errorInput : ""}
                />
                {formErrors.email && <p className={Styles.errorText}>{formErrors.email}</p>}
              </div>

              <div className={Styles.password}>
                <label htmlFor="password">Password</label>
                <div className={Styles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="At least 8 characters"
                    className={formErrors.password ? Styles.errorInput : ""}
                  />
                  <button type="button" onClick={togglePasswordVisibility} className={Styles.eyeButton}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formErrors.password && <p className={Styles.errorText}>{formErrors.password}</p>}
              </div>

              <div className={Styles.confirmPassword}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className={Styles.inputContainer}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="At least 8 characters"
                    className={formErrors.confirmPassword ? Styles.errorInput : ""}
                  />
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className={Styles.eyeButton}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formErrors.confirmPassword && (
                  <p className={Styles.errorText}>{formErrors.confirmPassword}</p>
                )}
              </div>

              <div className={Styles.number}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1xxxxxxxxxxxx"
                  className={formErrors.phoneNumber ? Styles.errorInput : ""}
                />
                {formErrors.phoneNumber && <p className={Styles.errorText}>{formErrors.phoneNumber}</p>}
              </div>

              <div className={Styles.finalClick}>
                <button type="submit" disabled={isLoading} className={Styles.signInButton}>
                  {isLoading ? (
                    <ImSpinner2 className={Styles.spinner} />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              <div className={Styles.agreement}>
                <p>
                  By continuing, you're agreeing to our <span>Terms of Service</span> and <span>Privacy Policy.</span>
                </p>
              </div>

              <div className={Styles.account}>
              <p>
                  Already have an account?{" "}
                  <span 
                    onClick={() => navigate('/Login')}
                    className={Styles.toggleLink}
                  >
                    Sign in
                  </span>
                  </p>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
