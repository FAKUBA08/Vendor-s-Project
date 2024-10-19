import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./Auth/SignUp";
import Login from "./Auth/Login";
import Forget from './components/Forget';
import Verify from "./components/Verify";
import Landing from "./components/Landing";
import PasswordReset from "./components/PasswordReset";
import VerifyEmail from "./components/VerifyEmail";


// Inside your routing logic
<Route path="/verify" element={<VerifyEmail />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/forget-password" element={<Forget />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/verifyEmail" element={<VerifyEmail />}/>
        <Route path="/reset-password/:token" element={<PasswordReset />} /> {/* Use element prop here */}
      </Routes>
    </Router>
  );
}

export default App;
