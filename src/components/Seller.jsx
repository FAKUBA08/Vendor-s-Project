import React, { useState, useEffect } from 'react';
import Styles from "../Styles/Seller.module.css";
import lastLogo2 from "../Images/lastLogo2.png";

function Seller() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.firstName || 'Guest'); 
    }
  }, []);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={Styles.sellerInner}>
      <div className={Styles.announcement}>
        <p className={Styles.user}>HELLO, {userName}</p> {/* Display user's first name or Guest */}
      </div>
      
      <div className={Styles.sellerCover}>
        <div className={Styles.sellerDashboard}>
          <div className={Styles.Main}>
            <div>
              <img src={lastLogo2} alt="" />
            </div>
            <div className={Styles.MainText}>
              <p>audit</p>
            </div>
          </div>

          <div className={Styles.selection}>
            <div>
              <div className={`${Styles.number} ${currentStep === 1 ? Styles.active : ''}`}>1</div>
              <div className={Styles.numberText}>Admin Signup</div>
            </div>
            <div>
              <div className={`${Styles.number} ${currentStep === 2 ? Styles.active : ''}`}>2</div>
              <div className={Styles.numberText}>Marketplace Setup</div>
            </div>
            <div>
              <div className={`${Styles.number} ${currentStep === 3 ? Styles.active : ''}`}>3</div>
              <div className={Styles.numberText}>Confirm Details</div>
            </div>
            <div>
              <div className={`${Styles.number} ${currentStep === 4 ? Styles.active : ''}`}>4</div>
              <div className={Styles.numberText}>Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.Display}>
        {currentStep === 1 && (
          <>
            <div className={Styles.DisplayOne}>
              <p>
                Setup your Marketplace
                <span>
                  A marketplace is where you will allow other people (vendors) to create <br />
                  and manage stores and sell their products/services etc. Once you <br />
                  create a marketplace, you cannot change it back to shop.
                </span>
              </p>
            </div>
            <div className={Styles.marketInput}>
              <div>
                <label htmlFor="Marketplace Name">Marketplace Name</label>
                <input type="text" placeholder="Super Market" />
              </div>
              <div className={Styles.domain}>
                <label htmlFor="Subdomain">Subdomain</label>
                <input type="text" placeholder="Supermarket" />
                <button className={Styles.com}>.audit.com</button>
              </div>
              <div className={Styles.domainText}>
                <p>
                  This is the URL that customers will use to visit your website. You can also buy a <br />
                  custom domain like yourstore.com and connect it to this website.
                </p>
              </div>
              <div className={Styles.createMarket}>
                <button onClick={handleNextStep}>Start Creating Marketplace</button>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <div>
            <p>Page 2 - Marketplace Setup</p>
            <button onClick={handlePreviousStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <p>Page 3 - Confirm Details</p>
            <button onClick={handlePreviousStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <p>Page 4 - Setup Complete</p>
            <button onClick={handlePreviousStep}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Seller;
