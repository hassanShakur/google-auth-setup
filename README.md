## Basic Google oAuth 2 Setup For React

### Installs

1. `jwt-decode` - For decoding the web token sent from `google` into some meaningful info.
2. `index.html` script tag as below.

```js
<script
  src='https://accounts.google.com/gsi/client'
  async
  defer
></script>
```

### Procedure

In a `useEffect`, inform the server for the presence of a google object present in your html so no errors are encountered.

```js
/* global google */
```

Later using `google.accounts.id`;

1. Initialization.

```js
google.accounts.id.initialize({
  client_id:
    '956329766193-cdgv0o9gv6vtf1o1166l0fhnf72hudg4.apps.googleusercontent.com',
  callback: handleGoogleCallbackResponse,
});
```

2. Render Button Creation

```js
google.accounts.id.renderButton(
  document.getElementById('sign-in-btn'),
  {
    theme: 'outline',
    size: 'large',
  }
);
```

3. Handling Response

```js
const [user, setUser] = useState({});

const handleGoogleCallbackResponse = (response) => {
  console.log('Encoded JWT ID token: ' + response.credential);
  var userObject = jwtDecode(response.credential);
  //TODO USE REDUX TO SET USER
  setUser(userObject);
};
```

### General Structure

```js
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const [user, setUser] = useState({});

  const handleGoogleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    var userObject = jwtDecode(response.credential);
    setUser(userObject);
    document.getElementById('sign-in-btn').hidden = true;
  };

  const handleSignOut = () => {
    setUser({});
    document.getElementById('sign-in-btn').hidden = false;
  };

  useEffect(() => {
    /* global google */
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
        <div id='sign-in-btn'></div>
        {user && (
          <div>
            <img src={user.picture} />
            <h4>{user.name}</h4>
          </div>
        )}
      </div>
      {Object.keys(user).length !== 0 && (
        <button onClick={handleSignOut}>sign out</button>
      )}
    </div>
  );
}

export default App;
```
