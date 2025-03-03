import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4361ee;
`;

const LifespanContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LifespanLabel = styled.span`
  margin-right: 10px;
  font-size: 0.9rem;
  color: ${props => props.critical ? '#dc3545' : '#6c757d'};
`;

const LifespanBar = styled.div`
  width: 200px;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
`;

const LifespanFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => {
    if (props.percentage <= 30) return '#dc3545';
    if (props.percentage <= 60) return '#ffc107';
    return '#4361ee';
  }};
  transition: width 0.5s ease;
`;

const Header = ({ appLifespan = 100 }) => {
  const isCritical = appLifespan <= 30;
  
  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo>Ephemeral Computing</Logo>
          
          <LifespanContainer>
            <LifespanLabel critical={isCritical}>
              {isCritical ? 'Dissolving Soon' : 'Application Lifespan'}
            </LifespanLabel>
            <LifespanBar>
              <LifespanFill percentage={appLifespan} />
            </LifespanBar>
          </LifespanContainer>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
};

export default Header; 