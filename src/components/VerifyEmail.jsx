import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token'); // Get the token from the URL

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`https://your-backend-app.vercel.app/api/auth/verify?token=${token}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Verification failed');
                }

                const data = await response.json();
                
                // Redirect with the message passed in state
                setTimeout(() => {
                    navigate('/home', { state: { message: data.message } });
                }, 2000); // 2-second delay before redirect
            } catch (error) {
                console.error('Error verifying email:', error);
                toast.error('Verification failed. Please try again.');
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
};

export default VerifyEmail;
