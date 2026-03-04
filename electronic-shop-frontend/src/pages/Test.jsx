import React from 'react';

const Test = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'Arial',
      background: 'linear-gradient(to right, #2563eb, #1e40af)',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ fontSize: '24px' }}>
        ✅ API Connectée ! <br/>
        <a href="/login" style={{ color: 'yellow', marginTop: '20px', display: 'block' }}>
          Aller à la page de connexion
        </a>
      </div>
    </div>
  );
};

export default Test;