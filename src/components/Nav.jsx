import lastLogo from "../Images/lastLogo.png";
import Styles from "../Styles/Nav.module.css";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';
import SignOut from "../components/SignOut";
import React, { useEffect, useState } from 'react';

function Nav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
    console.log("Token:", token); 
    console.log("Is Logged In:", !!token); 
  }, []);

  return (
    <div className={Styles.nav}>
      <div className={Styles.navInner}>
        <div className={Styles.wrapper}>
          <div className={Styles.menusAll}>
            <div className={Styles.logoWrap}>
              <div className={Styles.logo}>
                <img src={lastLogo} alt="logo" />
              </div>
              <div className={Styles.logoText}>
                <p>audit</p>
              </div>
            </div>
            <div className={Styles.menus}>
              <ul>
                <li>Features</li>
                <li>Docs</li>
                <li>Pricing</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>

          <div className={Styles.logins}>
            <div onClick={() => isLoggedIn ? navigate("/seller") : navigate("/login")}>
              <Button 
                text={isLoggedIn ? "Switch to Seller" : "Login"} 
                bgColor="transparent" 
                color="black" 
                font="17px"
              />
            </div>
            <div onClick={() => isLoggedIn ? navigate("/buyer") : navigate("/signup")}>
              <Button 
                text={isLoggedIn ? "Switch to Buyer" : "Get Started"} 
              />
            </div>
          </div>

        </div>
{/* <div className={Styles.outing}>      <SignOut text="Logout"/></div> */}
      </div>
    </div>
  );
}

export default Nav;
