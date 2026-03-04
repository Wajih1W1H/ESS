import React, { useState } from 'react';

function TestCors() {
  const [result, setResult] = useState('');

  const testLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'monadmin@shop.com',
          password: 'monpass123'
        })
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
      console.log('Token reçu:', data.token);
    } catch (error) {
      setResult('ERREUR: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test de connexion React → API</h2>
      <button onClick={testLogin}>Tester la connexion</button>
      <pre style={{ background: '#f0f0f0', padding: '10px', marginTop: '20px' }}>
        {result}
      </pre>
    </div>
  );
}

export default TestCors;