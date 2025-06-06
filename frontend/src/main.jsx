import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage'; 
import ForgotPasswordPage from './ForgotPasswordPage';
import SignupPage from './SignupPage';
import HelpPage from './HelpPage';
import PostProperty from './PostProperty';
import ProfilePage from './ProfilePage';
import PropertyDetails from './PropertyDetails';
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<HomePage/>} />
        <Route path="/" element={<LoginPage/>} />
        
        <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/HelpPage" element={<HelpPage />} />
        <Route path="/PostProperty" element={<PostProperty/>} />
        <Route path="/ProfilePage" element={<ProfilePage/>} />
         <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  </StrictMode>
);