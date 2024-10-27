import React, { useState, useEffect } from 'react';
import Styles from '../Styles/Accordion.module.css';

const CountryDropdown = ({ onSelectLocation }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(localStorage.getItem('selectedCountry') || "");
  const [selectedState, setSelectedState] = useState(localStorage.getItem('selectedState') || "");
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || "");
  const [error, setError] = useState(false);

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
    fetchCountries();
  }, []);

  // Save values to localStorage and notify parent
  useEffect(() => {
    localStorage.setItem('selectedCountry', selectedCountry);
    localStorage.setItem('selectedState', selectedState);
    localStorage.setItem('selectedCity', selectedCity);
    onSelectLocation({ country: selectedCountry, state: selectedState, city: selectedCity });
  }, [selectedCountry, selectedState, selectedCity, onSelectLocation]);

  // Handle input change for countries
  const handleCountryInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSelectedCountry(inputValue);

    if (inputValue.length > 0) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue)
      );
      setFilteredCountries(filtered);
      setShowCountryDropdown(true);
      setError(filtered.length === 0);
    } else {
      setShowCountryDropdown(false);
      setError(false);
    }
  };

  const handleSelectCountry = (countryName) => {
    setSelectedCountry(countryName);
    setShowCountryDropdown(false);
    setError(false);
  };

  // Handle state and city inputs
  const handleStateInputChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityInputChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className={Styles.container}>
      {/* Country Input */}
      <div className={Styles.carryInput}>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          value={selectedCountry}
          onChange={handleCountryInputChange}
          placeholder="Input a country"
          className={Styles.inputDrop}
        />
      </div>
      {showCountryDropdown && (
        <ul className={Styles.dropdown}>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <li
                key={country.cca3}
                onClick={() => handleSelectCountry(country.name.common)}
                className={selectedCountry === country.name.common ? Styles.selected : ""}
              >
                {country.name.common}
              </li>
            ))
          ) : (
            <li className={Styles.noCountry}>No country found</li>
          )}
        </ul>
      )}

      {/* State Input */}
      {selectedCountry && (
        <div className={Styles.carryInput}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            value={selectedState}
            onChange={handleStateInputChange}
            placeholder={`Input a state from ${selectedCountry}`}
            className={Styles.inputDrop}
          />
        </div>
      )}

      {/* City Input */}
      {selectedState && (
        <div className={Styles.carryInput}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={selectedCity}
            onChange={handleCityInputChange}
            placeholder={`Input a city from ${selectedState}`}
            className={Styles.inputDrop}
          />
        </div>
      )}
      {error && <p className={Styles.error}>Please select a valid country.</p>}
    </div>
  );
};

export default CountryDropdown;
