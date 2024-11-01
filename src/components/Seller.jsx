import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from "../Styles/Seller.module.css";
import lastLogo2 from "../Images/lastLogo2.png";
import Accordion from "../components/Accordion";
import CountryDropdown from '../components/Country';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import CircularProgress from '../components/CircularProgress';

function Seller() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState('Guest');
  const [marketplaceName, setMarketplaceName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [storeInformation, setStoreInformation] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({
    accordion1: '',
    accordion2: '',
    accordion3: ''
  });

  useEffect(() => {
    if (localStorage.getItem('setupComplete')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.firstName || 'Guest');
    }
    const savedMarketplaceName = localStorage.getItem('marketplaceName');
    const savedSubdomain = localStorage.getItem('subdomain');
    const savedStoreInformation = localStorage.getItem('storeInformation');
    const savedSelectedAnswers = localStorage.getItem('selectedAnswers');
    const savedCountry = localStorage.getItem('country');

    if (savedMarketplaceName) setMarketplaceName(savedMarketplaceName);
    if (savedSubdomain) setSubdomain(savedSubdomain);
    if (savedStoreInformation) setStoreInformation(savedStoreInformation);
    if (savedSelectedAnswers) setSelectedAnswers(JSON.parse(savedSelectedAnswers));
    if (savedCountry) setCountry(savedCountry);
  }, []);

  useEffect(() => {
    localStorage.setItem('marketplaceName', marketplaceName);
    localStorage.setItem('subdomain', subdomain);
    localStorage.setItem('storeInformation', storeInformation);
    localStorage.setItem('country', country);
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
  }, [marketplaceName, subdomain, storeInformation, country, selectedAnswers]);

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!marketplaceName || !subdomain) {
        Swal.fire('Error', 'Both Marketplace Name and Subdomain are required.', 'error');
        return;
      }
      if (subdomain.length<3) {
        Swal.fire('Error', 'Subdomain must be at least 3 characters.', 'error');
        return;
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      if (!storeInformation) {
        Swal.fire('Error', 'Store information is required.', 'error');
        return;
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      if (!country) {
        Swal.fire('Error', 'Country is required.', 'error');
        return;
      }
      if (!state || state.length < 3) {
        Swal.fire('Error', 'State is required and should be valid.', 'error');
        return;
      }
      if (!city || city.length < 3) {
        Swal.fire('Error', 'City is required and should be valid.', 'error');
        return;
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      try {
        const token = localStorage.getItem('token');
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
            storeAddress: {
              country,
              state,
              city,
            }
          }),
        });

        const result = await response.json();
        if (response.ok) {
   const set= setInterval(() => {
      Swal.fire('Success', 'Setup Complete!', 'success');
      localStorage.setItem('setupComplete', 'true');
      clearInterval(set)
    }, 8000);
          setShowProgress(true); // Show progress animation
        } else {
          Swal.fire('Error', result.message || 'Failed to save marketplace details.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
      }
    }
  };

  const handleProgressComplete = () => {
    navigate('/dashboard'); // Redirect to dashboard after progress animation
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectAnswers = (newSelectedAnswers) => {
    setSelectedAnswers(newSelectedAnswers);
    setStoreInformation(newSelectedAnswers.accordion1 || newSelectedAnswers.accordion2 || newSelectedAnswers.accordion3);
  };

  const handleLocationChange = ({ country, state, city }) => {
    setCountry(country);
    setState(state);
    setCity(city);
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
        {currentStep === 1 && (
          <>
            <div className={Styles.DisplayOne}>
              <p>
                Setup your Marketplace
                <span>A marketplace is where you allow vendors to create and manage stores...</span>
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
              <div className={Styles.createMarket}>
                <button onClick={handleNextStep}>Start Creating Marketplace</button>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className={Styles.DisplayTwo}>
              <p>Setup your Marketplace</p>
            </div>
            <div className={Styles.marketInput}>
              <div className={Styles.acc}>
                <Accordion onSelectAnswers={handleSelectAnswers} />
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

        {currentStep === 3 && (
          <>
            <div className={Styles.DisplayTwo}>
              <p>Setup Store Address</p>
            </div>
            <div className={Styles.marketInput}>
              <div className={Styles.acc}>
              <CountryDropdown onSelectLocation={handleLocationChange} />
              </div>
             <div className={Styles.newContainerButton}>
               <div>
               <button className={Styles.backButton} onClick={handlePreviousStep}>
                  <FaArrowLeft className={Styles.arrowIcon} />
                  Back
                </button>
               </div>
               <div>
               <button className={Styles.nextButton} onClick={handleNextStep}>
                  Next
                  <FaArrowRight className={Styles.arrowIcon} />
                </button>
               </div>
             </div>
            </div>
          </>
        )}

      </div>

      <div className={Styles.Display}>
        {/* Step content as you defined it */}
        {currentStep === 4 && (
          <div className={Styles.DisplayFour}>
            <h2>Setup Complete!</h2>
            <p>Your marketplace is now set up. Click the button below to finish.</p>
            <div className={Styles.last3}>
              <button className={Styles.backButton} onClick={handlePreviousStep}>
                <FaArrowLeft className={Styles.arrowIcon} />
                Back
              </button>
              <button className={Styles.nextButton} onClick={handleNextStep}>
                Finish
                <FaArrowRight className={Styles.arrowIcon} />
              </button>
            </div>
          </div>
        )}
      </div>

      {showProgress && <CircularProgress onComplete={handleProgressComplete} />}
    </div>
  );
}

export default Seller;
