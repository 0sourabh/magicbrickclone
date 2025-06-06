import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Form, Alert, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [deleteMsg, setDeleteMsg] = useState('');
  const navigate = useNavigate();

  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 401) {
          navigate('/');
          return;
        }
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  // Fetch user's properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/properties/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        setProperties([]);
      }
    };
    fetchProperties();
  }, []);

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          dob: userData.dob
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage('Profile updated successfully!');
        setEditMode(false);
      } else {
        setSuccessMessage(data.msg || 'Failed to update profile');
      }
    } catch (err) {
      setSuccessMessage('Failed to update profile');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Handle profile field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setPasswordMsg('New passwords do not match.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMsg('Password updated successfully!');
        setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      } else {
        setPasswordMsg(data.msg || 'Failed to update password');
      }
    } catch (err) {
      setPasswordMsg('Failed to update password');
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    setDeleteMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/auth/delete-account`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setDeleteMsg('Account deleted successfully!');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setDeleteMsg(data.msg || 'Failed to delete account');
      }
    } catch (err) {
      setDeleteMsg('Failed to delete account');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProperties(properties.filter(p => p._id !== propertyId));
        setSuccessMessage('Property deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 2000);
      } else {
        alert(data.msg || 'Failed to delete property');
      }
    } catch (err) {
      alert('Failed to delete property');
    }
  };

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
                to="/Dashboard"
                style={{ borderColor: '#20c997', color: '#20c997' }}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm py-2 border-bottom">
        <Container>
          <div className="d-flex flex-wrap gap-4">
            <Link to="/buy" className="text-dark text-decoration-none fw-semibold">Buy</Link>
            <Link to="/rent" className="text-dark text-decoration-none fw-semibold">Rent</Link>
            <Link to="/sell" className="text-dark text-decoration-none fw-semibold">Sell</Link>
            <Link to="/commercial" className="text-dark text-decoration-none fw-semibold">Commercial</Link>
            <Link to="/HelpPage" className="text-dark text-decoration-none ms-md-auto">Help</Link>
          </div>
        </Container>
      </nav>

      {/* Main Content */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 120px)' }}>
        <Container>
          {successMessage && (
            <Alert variant="success" className="text-center">
              {successMessage}
            </Alert>
          )}

          <Row className="g-4">
            <Col lg={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="text-center p-4">
                  <div className="mb-4">
                    {/* Always show animated lion as profile image */}
                    <img 
                      src="https://cdn.pixabay.com/photo/2017/01/31/13/14/animal-2023924_1280.png" 
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover', background: '#fff' }}
                    />
                  </div>
                  
                  {editMode ? (
                    <h4 className="mb-3">{userData?.name}</h4>
                  ) : (
                    <h4 className="mb-3">{userData?.name}</h4>
                  )}

                  <div className="d-flex justify-content-center gap-2 mb-4">
                    {editMode ? (
                      <>
                        <Button 
                          variant="outline-danger" 
                          onClick={() => setEditMode(false)}
                          className="rounded-pill px-3"
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="success" 
                          type="submit" 
                          form="profileForm"
                          className="rounded-pill px-3"
                          style={{ backgroundColor: '#20c997', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline-primary" 
                          onClick={() => setEditMode(true)}
                          className="rounded-pill px-3"
                        >
                          Edit Profile
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          onClick={handleLogout}
                          className="rounded-pill px-3"
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="text-start">
                    <h5 className="mb-3" style={{ color: '#20c997' }}>Contact Info</h5>
                    {editMode ? (
                      <Form id="profileForm" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={userData?.name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        {/* Email is not editable */}
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={userData?.email}
                            disabled
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={userData?.phone}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={userData?.address}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        {/* DOB field removed from edit mode */}
                      </Form>
                    ) : (
                      <>
                        <p className="mb-2">
                          <i className="bi bi-envelope me-2"></i>
                          {userData?.email}
                        </p>
                        <p className="mb-0">
                          <i className="bi bi-telephone me-2"></i>
                          {userData?.phone}
                        </p>
                        <p className="mb-0">
                          <i className="bi bi-geo-alt me-2"></i>
                          {userData?.address}
                        </p>
                        {userData?.dob && (
                          <p className="mb-0">
                            <i className="bi bi-calendar me-2"></i>
                            {new Date(userData.dob).toLocaleDateString()}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={8}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-0">
                  <Tabs defaultActiveKey="properties" id="profile-tabs" className="mb-3 px-3 pt-3">
                    <Tab eventKey="properties" title="My Properties">
                      <div className="p-3">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 style={{ color: '#20c997' }}>My Listed Properties</h5>
                          <Button 
                            as={Link}
                            to="/PostProperty"
                            variant="success"
                            size="sm"
                            style={{ backgroundColor: '#20c997', border: 'none' }}
                          >
                            + Add New Property
                          </Button>
                        </div>

                        {loading ? (
                          <div className="text-center py-5">
                            <div className="spinner-border text-success" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        ) : properties.length === 0 ? (
                          <div className="text-center py-5">
                            <p>You haven't listed any properties yet.</p>
                            <Button 
                              as={Link}
                              to="/PostProperty"
                              variant="success"
                              style={{ backgroundColor: '#20c997', border: 'none' }}
                            >
                              List Your First Property
                            </Button>
                          </div>
                        ) : (
                          <Row className="g-4">
                            {properties.map(property => (
                              <Col md={6} key={property._id}>
                                <Card className="h-100 border-0 shadow-sm">
                                  <img 
                                    src={property.images && property.images.length > 0 ? property.images[0] : "https://via.placeholder.com/300x180?text=No+Image"} 
                                    className="card-img-top" 
                                    alt={property.title}
                                    style={{ height: '180px', objectFit: 'cover' }}
                                  />
                                  <Card.Body>
                                    <Card.Title className="fs-6">{property.title}</Card.Title>
                                    <div className="d-flex justify-content-between">
                                      <span className="text-muted">{property.propertyType}</span>
                                      <strong>{property.price}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                      <span className={`badge ${property.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                        {property.status || "Active"}
                                      </span>
                                      <div>
                                        <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProperty(property._id)}>Delete</Button>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey="settings" title="Account Settings">
                      <div className="p-3">
                        <h5 style={{ color: '#20c997' }} className="mb-4">Account Settings</h5>
                        <Form onSubmit={handlePasswordSubmit}>
                          <Form.Group className="mb-3">
                            <Form.Label>Change Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="currentPassword"
                              placeholder="Current Password"
                              className="mb-2"
                              value={passwords.currentPassword}
                              onChange={handlePasswordChange}
                            />
                            <Form.Control
                              type="password"
                              name="newPassword"
                              placeholder="New Password"
                              className="mb-2"
                              value={passwords.newPassword}
                              onChange={handlePasswordChange}
                            />
                            <Form.Control
                              type="password"
                              name="confirmNewPassword"
                              placeholder="Confirm New Password"
                              value={passwords.confirmNewPassword}
                              onChange={handlePasswordChange}
                            />
                          </Form.Group>
                          <Button 
                            variant="success" 
                            style={{ backgroundColor: '#20c997', border: 'none' }}
                            type="submit"
                          >
                            Update Password
                          </Button>
                          {passwordMsg && (
                            <Alert variant={passwordMsg.includes('success') ? 'success' : 'danger'} className="mt-2">
                              {passwordMsg}
                            </Alert>
                          )}
                        </Form>

                        <div className="mt-5 pt-3 border-top">
                          <h6 className="text-danger">Danger Zone</h6>
                          <p className="text-muted small mb-3">
                            Deleting your account will remove all your data permanently.
                          </p>
                          <Button variant="outline-danger" size="sm" onClick={handleDeleteAccount}>
                            Delete My Account
                          </Button>
                          {deleteMsg && (
                            <Alert variant={deleteMsg.includes('success') ? 'success' : 'danger'} className="mt-2">
                              {deleteMsg}
                            </Alert>
                          )}
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer - Consistent with other pages */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <div className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} MagicBricksClone. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default ProfilePage;