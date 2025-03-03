import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #212529;
  color: #f8f9fa;
  padding: 1.5rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

const ConceptNote = styled.p`
  font-size: 0.9rem;
  max-width: 500px;
  text-align: right;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <Copyright>
            &copy; {new Date().getFullYear()} Ephemeral Computing Concept
          </Copyright>
          
          <ConceptNote>
            This application demonstrates the concept of purpose-driven software
            that transforms or dissolves after fulfilling its intended purpose.
          </ConceptNote>
        </FooterContent>
      </div>
    </FooterContainer>
  );
};

export default Footer; 