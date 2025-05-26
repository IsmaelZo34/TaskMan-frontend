import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  if(!isLoggedIn){
    return showRegister ? (
      <Register 
        onRegister = {() =>{
          setShowRegister(false);
        }}
        goToLogin = {() => setShowRegister(false)}
        />
    ) : (
      <Login
        onLogin={() =>setIsLoggedIn(true)}
        goToRegister={() => setShowRegister(true)}
      />
    );
  }
  return <Tasks />
}

export default App;

