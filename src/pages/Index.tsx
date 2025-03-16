
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate('/dashboard');
  }, [navigate]);

  return <div className="min-h-screen bg-background"></div>;
};

export default Index;
