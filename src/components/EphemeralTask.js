import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TaskHeader = styled.div`
  margin-bottom: 2rem;
`;

const TaskTitle = styled.h2`
  color: #4361ee;
  margin-bottom: 0.5rem;
`;

const TaskDescription = styled.p`
  color: #6c757d;
  font-size: 1.1rem;
`;

const TaskContent = styled.div`
  margin-bottom: 2rem;
`;

const ProgressContainer = styled.div`
  margin: 2rem 0;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #4361ee;
  transition: width 1s linear;
`;

const TaskActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TaskInput = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
`;

const EphemeralTask = ({ task, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(task.duration);
  const [userInput, setUserInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Progress timer
  useEffect(() => {
    if (isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
      
      setProgress(prev => {
        const newProgress = prev + (100 / task.duration);
        return Math.min(newProgress, 100);
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [task.duration, isCompleted]);

  // Auto-complete when time is up
  useEffect(() => {
    if (timeRemaining === 0 && !isCompleted) {
      handleComplete();
    }
  }, [timeRemaining]);

  const handleComplete = () => {
    setIsCompleted(true);
    
    // Simulate a brief delay before dissolving
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const getTaskContent = () => {
    switch (task.id) {
      case 1: // Meeting Preparation
        return (
          <>
            <h3>Meeting Preparation</h3>
            <p>Use this temporary workspace to organize your thoughts for tomorrow's meeting:</p>
            <TaskInput 
              placeholder="Enter key points, questions, or notes for your investor meeting..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </>
        );
      
      case 2: // Concept Visualization
        return (
          <>
            <h3>Concept Visualization</h3>
            <p>Describe how you would visually represent the concept of ephemeral computing:</p>
            <TaskInput 
              placeholder="Describe your visual concept here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </>
        );
      
      case 3: // Investor Pitch
        return (
          <>
            <h3>Investor Pitch Points</h3>
            <p>Prepare your key talking points for the investor meeting:</p>
            <TaskInput 
              placeholder="List your main pitch points, value propositions, and potential questions..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </>
        );
      
      default:
        return <p>Task content not available.</p>;
    }
  };

  return (
    <div className={isCompleted ? "dissolve" : ""}>
      <TaskHeader>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDescription>{task.description}</TaskDescription>
      </TaskHeader>
      
      <TaskContent>
        {getTaskContent()}
      </TaskContent>
      
      <ProgressContainer>
        <ProgressLabel>
          <span>Task Progress</span>
          <span>{Math.floor(progress)}%</span>
        </ProgressLabel>
        <ProgressBar>
          <ProgressFill percentage={progress} />
        </ProgressBar>
        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <small>This task will automatically complete in {timeRemaining} seconds</small>
        </div>
      </ProgressContainer>
      
      <TaskActions>
        <button 
          className="btn-secondary"
          onClick={() => onComplete()}
        >
          Cancel Task
        </button>
        
        <button 
          className="btn-primary"
          onClick={handleComplete}
          disabled={isCompleted}
        >
          Complete Task
        </button>
      </TaskActions>
    </div>
  );
};

export default EphemeralTask; 