import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';


const IP_ADDRESS = 'http://3.83.52.33:8080'

function App() {

  const [websocket, setWebsocket] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // const [text, setText] = useState('');

  useEffect(() => {
    const ws = new WebSocket(`${IP_ADDRESS.replace('http', 'ws')}/register/`);

    ws.onopen = () => {
      console.log('Connected to the websocket server');
    };

    ws.onmessage = event => {
      setLoading(false);
      const data = JSON.parse(event.data);
      if (data.status === 'success') {
        error && setError(null);
      }
      if (data.hasOwnProperty('error')) {
        setError(data.error);
      }
      console.log("Data from backend", data);
    };

    ws.onerror = error => {
      setError(error?.message?.slice(0, 17));
      console.error('WebSocket error:', error);
      setLoading(false);
    };

    ws.onclose = () => {
      console.log('Disconnected from the websocket server');
    };

    setWebsocket(ws);

    return () => {
      ws.close();
    };
  }, [error]);


  const send = async () => {
    const data = {
      password: 'user.password',
      username: 'user.username',
      security_level: 'standard',
      first_name: 'user.first_name',
      last_name: 'user.last_name',
      city: 'user.city',
      state: 'user.state',
      country: 'user.country',
      security_id: 'user.security_id',
      zip_code: 'user.zip_code',
      phone_number: 'user.phone_number',
    };
    console.log('Printed data', data);
    setLoading(true);
    // websocket?.send(JSON.stringify({username: username.toLowerCase()}));
    websocket?.send(JSON.stringify(data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={ send }>
          SEND DATA
        </button>
      </header>
    </div>
  );
}

export default App;
