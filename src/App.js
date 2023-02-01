import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import './App.css';

function App() {
  const [user, setUser] = useState({});
  const handleGoogleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    var userObject = jwtDecode(response.credential);
    //TODO USE REDUX TO SET USER
    setUser(userObject);
    console.log(userObject);
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        '956329766193-cdgv0o9gv6vtf1o1166l0fhnf72hudg4.apps.googleusercontent.com',
      callback: handleGoogleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('sign-in-btn'),
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }, []);
  return (
    <div className='App'>
      <div className='sign-in'>
        <button id='sign-in-btn'></button>
        {user && (
          <div>
            <img src={user.picture} alt='Profile pic' />
            <h4>{user.name}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
