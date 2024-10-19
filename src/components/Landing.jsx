import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const message = queryParams.get('message'); // Get 'message' from URL

        if (message) {
            toast.success(decodeURIComponent(message));

            // Remove the 'message' query parameter from the URL
            const newUrl = location.pathname; // Keep the path, remove query string
            window.history.replaceState({}, document.title, newUrl); // Update URL without reloading
        }
    }, [location]);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover />
        </div>
    );
};

export default Landing;
