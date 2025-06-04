  import React, { useState } from 'react';
  import { questionMap } from './questionScore';
  import insta from './assets/insta2.png'
function App() {
  const [question, setQuestion] = useState('8');
  const [selectedOption, setSelectedOption] = useState('');
  const [manualInput, setManualInput] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [result, setResult] = useState('');
  const [userCount, setUserCount] = useState(0); // Fixed: Start from 0
  const [categoryCounts, setCategoryCounts] = useState({
    'No Stress': 0,
    'Moderate Stress': 0,
    'High Stress': 0,
    'Very High Stress': 0,
  });

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
    setSelectedOption('');
    setManualInput('');
  };

  const moveToNextQuestion = () => {
    const currentQNum = parseInt(question);
    if (currentQNum < 31) {
      setQuestion((currentQNum + 1).toString());
      setSelectedOption('');
      setManualInput('');
    }
  };

  const updateScore = (score) => {
    const newScore = finalScore + score;
    const newCount = answeredCount + 1;
    
    setFinalScore(newScore);
    setAnsweredCount(newCount);

    if (newCount === 24) {
      // Calculate status
      let status = '';
      if (newScore < 15) status = 'No Stress';
      else if (newScore <= 30) status = 'Moderate Stress';
      else if (newScore <= 45) status = 'High Stress';
      else status = 'Very High Stress';

      // Fixed: Update category counts and user count properly
      setCategoryCounts(prev => ({
        ...prev,
        [status]: prev[status] + 1,
      }));
      
      setUserCount(prev => prev + 1); // Fixed: Only increment once
      setResult(`Status: ${status}`);

      // Reset for next user
      setTimeout(() => {
        setFinalScore(0);
        setAnsweredCount(0);
        setQuestion('8');
        setSelectedOption('');
        setManualInput('');
        setResult('');
      }, 3000); // Show result for 3 seconds before reset
    } else {
      // Fixed: Auto-increment to next question
      moveToNextQuestion();
    }
  };

  const handleOptionClick = (option) => {
    const score = questionMap[question]?.scores?.[option];
    if (score !== undefined) {
      setSelectedOption(option);
      updateScore(score);
    }
  };

  const handleManualSubmit = () => {
    const value = parseInt(manualInput);
    if (!isNaN(value) && value >= 1 && value <= 22) {
      updateScore(value);
      setManualInput('');
    } else {
      alert("Please enter a number between 1 and 22.");
    }
  };

  const currentQn = questionMap[question];

  return (
     <>
     <div style={{ 
        backgroundColor: '#e3f2fd', 
        border: '1px solid #2196f3', 
        borderRadius: '8px', 
        padding: '15px', 
        marginBottom: '25px' 
      }}>
        <h3 style={{ color: '#1976d2', marginTop: '0' }}>📋 How to Use This Tool</h3>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
        <p><strong>Research Response (Excel Sheet)</strong> <a href='https://docs.google.com/spreadsheets/d/1grIb2jUww32hUU7J_xSl4k_1-X4OVA_re2o18OQrzuA/edit?usp=drivesdk ' target='_blank'>Click Me</a></p>
          <p><strong>Quick Start:</strong> Answer questions 8-31 (24 total questions) to assess stress levels.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>✨ Key Features:</h4>
              <ul style={{ margin: '0', paddingLeft: '18px' }}>
                <li>Auto-advance to next question</li>
                <li>Prevents duplicate answers</li>
                <li>Real-time progress tracking</li>
                <li>Multiple user sessions</li>
                <li>Statistical summary</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>🎯 How to Answer:</h4>
              <ul style={{ margin: '0', paddingLeft: '18px' }}>
                <li><strong>Multiple Choice:</strong> Click any option </li>
                <li><strong>Manual Input:</strong> Enter count (1-22) for select questions</li>
                
                <li><strong>Completion:</strong> Results show after 24 questions</li>
              </ul>
            </div>
          </div>
          
          
        </div>
      </div>

    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Stress Score Calculator</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Current Question Number: 
          <input
            type="number"
            min="8"
            max="31"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter question number (8–31)"
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      {currentQn?.type === 'manual' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            How many options did you select? (1–22):{' '}
            <input
              type="number"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              min="1"
              max="22"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
          <button 
            onClick={handleManualSubmit}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Submit
          </button>
        </div>
      )}

      {currentQn?.scores && (
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Question {question}: Choose one option:</strong></p>
          {Object.entries(currentQn.scores).map(([key, score]) => (
            <button
              key={key}
              onClick={() => handleOptionClick(key)}
              style={{
                margin: '5px',
                backgroundColor: selectedOption === key ? '#4CAF50' : '#f0f0f0',
                color: selectedOption === key ? 'white' : 'black',
                padding: '10px 15px',
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              {key.toUpperCase()} (Score: {score})
            </button>
          ))}
        </div>
      )}

      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Progress</h3>
        <p><strong>Current Score:</strong> {finalScore}</p>
        <p><strong>Questions Answered:</strong> {answeredCount}/24</p>
        {result && <h3 style={{ color: '#d32f2f' }}>{result}</h3>}
      </div>

      <hr />
      <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px' }}>
        <h3>Statistics</h3>
        <p><strong>Total Users Completed:</strong> {userCount}</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><strong>No Stress:</strong> {categoryCounts['No Stress']}</li>
          <li><strong>Moderate Stress:</strong> {categoryCounts['Moderate Stress']}</li>
          <li><strong>High Stress:</strong> {categoryCounts['High Stress']}</li>
          <li><strong>Very High Stress:</strong> {categoryCounts['Very High Stress']}</li>
        </ul>
      </div>
    </div>
    <div
    
    ></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      <h3 style={{ margin: 0 , color:'white'}}><strong >Contact Me</strong> </h3>
      <a href='https://www.instagram.com/_gokul._r?igsh=YTd0dDB4cmY3dG04' target='_blank' > <img src={insta} style={{ width: '30px', height: '30px'  }}></img></a>
    </div>
    </>
  );
}

export default App;
