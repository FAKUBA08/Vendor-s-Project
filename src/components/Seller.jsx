import React, { useState, useEffect } from 'react';
import Styles from "../Styles/Seller.module.css";
import lastLogo2 from "../Images/lastLogo2.png";
import Accordion from "../components/Accordion";
import CountryDropdown from '../components/Country';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Seller() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState('Guest');
  const [marketplaceName, setMarketplaceName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [storeInformation, setStoreInformation] = useState('');
  const [storeAddress, setStoreAddress] = useState({ 
    country: '', 
    state: '', 
    city: '', 
    street: '', 
    zipCode: '' 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  // Fetch user name from localStorage and token
  useEffect(() => {
    const user = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.firstName || 'Guest');
    }

    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('Token is undefined. Please ensure you are logged in.');
    }
  }, []);

  const handleNextStep = async () => {
    console.log('Current Step:', currentStep);

    if (currentStep === 1) {
      if (!marketplaceName || !subdomain) {
        setErrorMessage('Marketplace Name and Subdomain are required.');
        return;
      }

      if (!token) {
        setErrorMessage('Authentication token is missing. Please log in again.');
        return;
      }

      try {
        const response = await fetch('https://vendors-node.onrender.com/api/auth/saveSeller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            marketplaceName,
            subdomain,
            storeInformation,
            storeAddress,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          setErrorMessage('');
          setCurrentStep(currentStep + 1);
        } else {
          setErrorMessage(result.message || 'Failed to save marketplace details.');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go back to the previous step
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={Styles.sellerInner}>
      <div className={Styles.announcement}>
        <p className={Styles.user}>HELLO, {userName}</p>
      </div>
      
      <div className={Styles.sellerCover}>
        <div className={Styles.sellerDashboard}>
          <div className={Styles.Main}>
            <div>
              <img src={lastLogo2} alt="Marketplace Logo" />
            </div>
            <div className={Styles.MainText}>
              <p>Audit</p>
            </div>
          </div>

          <div className={Styles.selection}>
            <div>
              <div className={`${Styles.number} ${currentStep === 1 ? Styles.active : ''}`}>1</div>
              <div className={Styles.numberText}>Admin Signup</div>
            </div>
            <div>
              <div className={`${Styles.number} ${currentStep === 2 ? Styles.active : ''}`}>2</div>
              <div className={Styles.numberText}>Store Information</div>
            </div>
            <div>
              <div className={`${Styles.number} ${currentStep === 3 ? Styles.active : ''}`}>3</div>
              <div className={Styles.numberText}>Store Address</div>
            </div>
            <div>
              <div className={`${Styles.number} ${currentStep === 4 ? Styles.active : ''}`}>4</div>
              <div className={Styles.numberText}>Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.Display}>
        {/* Step 1 - Marketplace Setup */}
        {currentStep === 1 && (
          <>
            <div className={Styles.DisplayOne}>
              <p>
                Setup your Marketplace
                <span>
                  A marketplace is where you will allow other people (vendors) to create <br />
                  and manage stores and sell their products/services. Once you <br />
                  create a marketplace, you cannot change it back to a shop.
                </span>
              </p>
            </div>
            <div className={Styles.marketInput}>
              <div>
                <label htmlFor="Marketplace Name">Marketplace Name</label>
                <input 
                  type="text" 
                  placeholder="Super Market" 
                  value={marketplaceName} 
                  onChange={(e) => setMarketplaceName(e.target.value)} 
                />
              </div>
              <div className={Styles.domain}>
                <label htmlFor="Subdomain">Subdomain</label>
                <input 
                  type="text" 
                  placeholder="Supermarket" 
                  value={subdomain} 
                  onChange={(e) => setSubdomain(e.target.value)} 
                />
                <button className={Styles.com}>.audit.com</button>
              </div>
              <div className={Styles.domainText}>
                <p>
                  This is the URL that customers will use to visit your website. You can also buy a <br />
                  custom domain like yourstore.com and connect it to this website.
                </p>
              </div>
              {errorMessage && <p className={Styles.error}>{errorMessage}</p>}
              <div className={Styles.createMarket}>
                <button onClick={handleNextStep}>Start Creating Marketplace</button>
              </div>
            </div>
          </>
        )}

        {/* Step 2 - Store Information */}
        {currentStep === 2 && (
          <>
            <div className={Styles.DisplayTwo}>
              <p>
                Setup your Marketplace
                <span>
                  Please tell us a little more about your store information so we can <br />
                  serve you better.
                </span>
              </p>
            </div>
            <div className={Styles.marketInput}>
              <div className={Styles.acc}>
                <Accordion />
              </div>
              <div className={Styles.buttonContainer}>
                <button className={Styles.backButton} onClick={handlePreviousStep}>
                  <FaArrowLeft className={Styles.arrowIcon} />
                  Back
                </button>
                <button className={Styles.nextButton} onClick={handleNextStep}>
                  Next
                  <FaArrowRight className={Styles.arrowIcon} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 3 - Store Address */}
        {currentStep === 3 && (
          <>
            <div className={Styles.DisplayTwo}>
              <p>
                Store Address
                <span>
                  Please tell us a little more about your store information so we can <br />
                  serve you better.
                </span>
              </p>
            </div>
            <div className={Styles.conInput}>
              <CountryDropdown />
              <div className={Styles.buttonContainer3}>
                <button className={Styles.backButton3} onClick={handlePreviousStep}>
                  <FaArrowLeft className={Styles.arrowIcon3} />
                  Back
                </button>
                <button className={Styles.nextButton3} onClick={handleNextStep}>
                  Next
                  <FaArrowRight className={Styles.arrowIcon3} />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 4 - Setup Complete */}
        {currentStep === 4 && (
          <div>
            <p>Setup Complete</p>
            <button onClick={handlePreviousStep}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Seller;
