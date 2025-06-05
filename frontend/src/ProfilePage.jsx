import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Form, Alert, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  });
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('token');
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(!!token && loggedIn);
    setAuthChecked(true);

    if (token && loggedIn) {
      // Simulate loading user data only if authenticated
      setLoading(true);
      setTimeout(() => {
        setProperties([
          {
            id: 1,
            title: 'Beautiful 3BHK Apartment in City Center',
            type: 'Apartment',
            price: '₹75,00,000',
            status: 'Active',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
          },
          {
            id: 2,
            title: 'Luxury Villa with Pool',
            type: 'Villa',
            price: '₹1,25,00,000',
            status: 'Sold',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, []);

  // Redirect to login if not authenticated
  if (authChecked && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccessMessage('Profile updated successfully!');
      setEditMode(false);
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Show loading while checking auth status
  if (!authChecked) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Header - Consistent with other pages */}
      <header className="bg-dark text-white py-3 sticky-top">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="m-0">
              <span style={{ color: '#20c997' }} className="fw-bold">Magic</span>BricksClone
            </h3>
            <div className="d-flex gap-3 align-items-center">
              <Button 
                variant="outline-light" 
                size="sm" 
                as={Link} 
                to="/"
                style={{ borderColor: '#20c997', color: '#20c997' }}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Rest of your profile page component remains the same */}
      {/* ... */}
    </div>
  );
};

export default ProfilePage;