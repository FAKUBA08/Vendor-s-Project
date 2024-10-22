import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/Nav';
import Styles from "../Styles/Landing.module.css"
import deco from"../Images/deco.png"
import Button from "../components/Button"

const Landing = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const message = queryParams.get('message');

        if (message) {
            toast.success(decodeURIComponent(message));
            const newUrl = location.pathname;
            window.history.replaceState({}, document.title, newUrl); 
        }
    }, [location]);

    return (
        <div>
        <Nav/>
        <div className={Styles.LandingInner}>
         <div className={Styles.LandingText}>
            <p>
            Give Wings to Your Dream <br />
            Marketplace with Audit Cloud
            </p>
     <div className={Styles.landImg}> <img src={deco} alt="" /></div>
         </div>
         <div className={Styles.pText}>
      <p>
      Experience a fully functional marketplace solution packed with dynamic <br />
features and an intuitive user interface for seamless navigation. Build and <br />
initiate your selling journey effortlessly.
      </p>
         </div>
         </div>
    <div className={Styles.landTrial}>
   <button>Start a 14-day free trial</button>
    </div>
      
        </div>
    );
};

export default Landing;
