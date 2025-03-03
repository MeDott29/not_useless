import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EphemeralTask from './components/EphemeralTask';
import Header from './components/Header';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;
`;

const TaskContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const IntroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4361ee;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [appLifespan, setAppLifespan] = useState(100); // Percentage of app lifespan remaining

  // Available ephemeral tasks
  const tasks = [
    {
      id: 1,
      title: "Meeting Preparation",
      description: "Create a temporary workspace for your upcoming meeting",
      duration: 60, // seconds
      impact: 25, // How much this task impacts app lifespan
    },
    {
      id: 2,
      title: "Concept Visualization",
      description: "Generate a visual representation of ephemeral computing",
      duration: 45,
      impact: 25,
    },
    {
      id: 3,
      title: "Investor Pitch",
      description: "Prepare key talking points for your investor meeting",
      duration: 90,
      impact: 50,
    }
  ];

  // Simulate app dissolution over time
  useEffect(() => {
    if (appLifespan <= 0) return;
    
    const timer = setTimeout(() => {
      // Natural decay of the application
      setAppLifespan(prev => Math.max(0, prev - 0.5));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [appLifespan]);

  const startTask = (taskId) => {
    setShowIntro(false);
    setActiveTask(tasks.find(task => task.id === taskId));
  };

  const completeTask = (task) => {
    setCompletedTasks(prev => [...prev, task]);
    setActiveTask(null);
    setAppLifespan(prev => Math.max(0, prev - task.impact));
    
    // Show intro again after task completion
    setTimeout(() => {
      setShowIntro(true);
    }, 500);
  };

  // Determine if the app should start dissolving
  const isDissolving = appLifespan <= 30;
  const isFullyDissolved = appLifespan <= 0;

  if (isFullyDissolved) {
    return (
      <AppContainer className="dissolve">
        <Header />
        <Main className="container">
          <TaskContainer>
            <Title>Purpose Fulfilled</Title>
            <Subtitle>
              This ephemeral application has completed its lifecycle and is now dissolving.
              Thank you for experiencing the concept of ephemeral computing.
            </Subtitle>
          </TaskContainer>
        </Main>
        <Footer />
      </AppContainer>
    );
  }

  return (
    <AppContainer className={isDissolving ? "dissolve" : ""}>
      <Header appLifespan={appLifespan} />
      <Main className="container">
        {showIntro && !activeTask && (
          <IntroSection>
            <Title>Ephemeral Computing Demo</Title>
            <Subtitle>
              This application will transform and eventually dissolve as you complete tasks.
              Each interaction reduces its lifespan, demonstrating the concept of purpose-driven software.
            </Subtitle>
            
            <div>
              {tasks.map(task => (
                <button 
                  key={task.id}
                  className="btn-primary"
                  style={{ margin: '0 10px' }}
                  onClick={() => startTask(task.id)}
                >
                  {task.title}
                </button>
              ))}
            </div>
          </IntroSection>
        )}

        {activeTask && (
          <TaskContainer>
            <EphemeralTask 
              task={activeTask} 
              onComplete={() => completeTask(activeTask)}
            />
          </TaskContainer>
        )}

        {completedTasks.length > 0 && showIntro && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h3>Completed Tasks: {completedTasks.length}</h3>
            <p>Each completed task brings this application closer to dissolution.</p>
          </div>
        )}
      </Main>
      <Footer />
    </AppContainer>
  );
};

export default App; 