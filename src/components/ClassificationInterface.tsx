import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import '../App.css';
import { type } from 'os';

type Tab = {
  id: string,
  label: string,
  content: any
}

const Classification: React.FC = () => {
  const [alternateCount, setAlternateCount] = useState(0);
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    // Simulate a click on the first tab button to set it as active by default
    const firstTabButton = document.querySelector('.tab button.tablinks');
    if (firstTabButton) {
      firstTabButton.classList.add('active');
      const tabName = firstTabButton.getAttribute('data-tabname');
      openTab(tabName!);
    }
  }, []);

  const handleButtonClick = () => {
    const newAlternateCount = alternateCount + 1;
    var newTab: Tab = {
      id: `alternate${newAlternateCount}`,
      label: `Alternate ${newAlternateCount}`,
      content: `Alternate ${newAlternateCount}`
    }
    setTabs([...tabs, newTab]);
    setAlternateCount(newAlternateCount);
  };

  const handleTabClose = (index: number) => {
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);
    setAlternateCount(alternateCount - 1); // Update the alternate count
  };

  const openTab = (tabName: string) => {
    const tabcontent = document.getElementsByClassName('tabcontent') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
    }

    const activeTabContent = document.getElementById(tabName);
    if (activeTabContent) activeTabContent.style.display = 'block';

    const eventTarget = document.querySelector(`.tab button.tablinks[data-tabname="${tabName}"]`);
    if (eventTarget) eventTarget.classList.add('active');
  };

  return (
    <div className="page">

      {/* Section: Compose Question */}

      <section className='compose-question-section'>
        <div className="section-heading">Compose Question</div>

        <div className="grid-container">
          <div className="grid-item">Column Count</div>
          <div className="grid-item">Row Count</div>

          <div className="grid-item">
            <input type="text" id="column-count" style={{ width: '150px' }} />
          </div>
          <div className="grid-item">
            <input type="text" id="row-count" style={{ width: '150px' }} />
          </div>

          <div className="grid-item"><button className="red-button"><FaPlus /> Add</button></div>
          <div className="grid-item"><button className="red-button"><FaPlus /> Add</button></div>
        </div>
        
         <textarea
          style={{ height: '250px', width: '100%', padding: '10px' }}
          placeholder="Compose your question..."
        />
      </section>
      

      {/* Section: Possible Responses */}
      <section className='possible-responses-section'>
        <div className="section-heading">Possible Responses</div>
        {/* Add content for Possible Responses section if needed */}
      
      </section>
      
      

      {/* Section: Set Correct Answer(s) */}
      <section className='set-correct-answers-section'>
        <div className="section-heading">Set Correct Answer(s)</div>
      
        <div className="grid-container">
          <div className="grid-item">
            <div className="tabs">
              <div className="tab">
                  <button
                    key={'correct-answer'}
                    className={`tablinks`}
                    data-tabname={`Correct Answer`}
                    onClick={() => openTab('correct-answer')}
                  >
                    {'Correct Answer'}
                  </button>
              </div>

              <div className="tab">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`tablinks`}
                    data-tabname={`Alternate ${index + 1}`}
                    onClick={() => openTab(tab.id)}
                  >
                    {tab.label}
                    <span onClick={() => handleTabClose(index)} className="close-icon">
                    <FaTimes />
                  </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-item">
            <button id="add-alternate" className="red-button" onClick={handleButtonClick}>
              <FaPlus /> Alternative Answer
            </button>
          </div>
        </div>

        {tabs.map((tab) => (
          <div key={tab.id} id={tab.id} className="tabcontent">
            <p>{tab.content}</p>
          </div>
        ))}
      </section>
      
    </div>
  );
};

export default Classification;