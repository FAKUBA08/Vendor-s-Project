import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./Auth/SignUp";
import Login from "./Auth/Login";
import Forget from './components/Forget';
import Verify from "./components/Verify";
import Landing from "./components/Landing";
import PasswordReset from "./components/PasswordReset";
import VerifyEmail from "./components/VerifyEmail";
import Dashboard from "./components/Dashboard";
import Seller from "./components/Seller";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/forget-password" element={<Forget />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/verifyEmail" element={<VerifyEmail />}/>
        <Route path="/reset-password/:token" element={<PasswordReset />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
