import React, { useEffect } from 'react';
import '../App.css';

const tabsData = [
  {
    id: 'correct-answer',
    label: 'Correct Answer',
    content: 'This is the Correct Answer tab content.',
  },
  {
    id: 'alternate1',
    label: 'Alternate 1',
    content: 'This is the Alternale 1 tab content.',
  },
  {
    id: 'alternate2',
    label: 'Alternale 2',
    content: 'This is the Alternale 2 tab content.',
  },
];

interface Tab {
  id: string;
  label: string;
  content: string;
}

const Classification: React.FC = () => {
  useEffect(() => {
    // Simulate a click on the first tab button to set it as active by default
    const firstTabButton = document.querySelector('.tab button.tablinks');
    if (firstTabButton) {
      firstTabButton.classList.add('active');
      const tabName = firstTabButton.getAttribute('data-tabname');
      openTab(tabName!);
    }
  }, []);

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

          <div className="grid-item"><button className="red-button">+ Add</button></div>
          <div className="grid-item"><button className="red-button">+ Add</button></div>
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
        <div className="tab">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              className={`tablinks`}
              data-tabname={tab.id}
              onClick={() => openTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tabsData.map((tab) => (
          <div key={tab.id} id={tab.id} className="tabcontent">
            <p>{tab.content}</p>
          </div>
        ))}
      </section>
      
    </div>
  );
};

export default Classification;