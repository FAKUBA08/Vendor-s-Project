import React, { useState } from 'react';
import Styles from "../Styles/Accordion.module.css"; // Ensure you have appropriate styles

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({
    accordion1: '',
    accordion2: '',
    accordion3: ''
  });

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSelectAnswer = (accordion, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [accordion]: answer
    });

    setActiveIndex(null);
  };

  return (
    <div className={Styles.accordionContainer}>
      
      {/* Accordion 1 */}
      <div className={Styles.accordionItem}>
        <div className={Styles.accordionHeader} onClick={() => toggleAccordion(0)}>
          <h4>What Stage are you in?</h4>
          <span className={`arrow ${activeIndex === 0 ? Styles.rotate : ''}`}>&#9662;</span>
        </div>
        <input
          type="text"
          value={selectedAnswers.accordion1}
          placeholder="Select an option"
          readOnly
          className={Styles.inputField}
        />
        {activeIndex === 0 && (
          <div className={Styles.accordionContent}>
            <p>Select an answer:</p>
            {["I haven't decided yet", "I know what i what to build,but haven't started", "I have already used a proof of concept to validate my idea", "I'm already running a market place"].map((answer, index) => (
              <div key={index} onClick={() => handleSelectAnswer('accordion1', answer)} className={Styles.option}>
                {answer}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion 2 */}
      <div className={Styles.accordionItem}>
        <div className={Styles.accordionHeader} onClick={() => toggleAccordion(1)}>
   <h4>What is the size of your current audience?</h4>
          <span className={`arrow ${activeIndex === 1 ? Styles.rotate : ''}`}>&#9662;</span>
        </div>
        <input
          type="text"
          value={selectedAnswers.accordion2}
          placeholder="Select an option"
          readOnly
          className={Styles.inputField}
        />
        {activeIndex === 1 && (
          <div className={Styles.accordionContent}>
            <p>Select an answer:</p>
            {["I don't have an existing audience", "1-100 people", "100-1,000 people", "1,000-5,000 people", "5,000-10,000", "10,000 or more", "I'm not sure"].map((answer, index) => (
              <div key={index} onClick={() => handleSelectAnswer('accordion2', answer)} className={Styles.option}>
                {answer}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accordion 3 */}
      <div className={Styles.accordionItem}>
        <div className={Styles.accordionHeader} onClick={() => toggleAccordion(2)}>
       <h4>What's your previous experience running a business?

</h4>
          <span className={`arrow ${activeIndex === 2 ? Styles.rotate : ''}`}>&#9662;</span>
        </div>
        <input
          type="text"
          value={selectedAnswers.accordion3}
          placeholder="Select an option"
          readOnly
          className={Styles.inputField}
        />
        {activeIndex === 2 && (
          <div className={Styles.accordionContent}>
            <p>Select an answer:</p>
            {[" I haven't started business before", "I have experience running business before",  "I run a business currently", "I'm a serial entrepreneur"].map((answer, index) => (
              <div key={index} onClick={() => handleSelectAnswer('accordion3', answer)} className={Styles.option}>
                {answer}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
