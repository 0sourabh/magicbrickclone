import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Form, Alert, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading user data
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
  }, []);

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
    navigate('/login');
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
                    <img 
                      src={userData.profileImage} 
                      alt="Profile" 
                      className="rounded-circle" 
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  
                  {editMode ? (
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="file"
                        accept="image/*"
                        className="form-control-sm"
                      />
                    </Form.Group>
                  ) : (
                    <h4 className="mb-3">{userData.name}</h4>
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
                            value={userData.name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Form>
                    ) : (
                      <>
                        <p className="mb-2">
                          <i className="bi bi-envelope me-2"></i>
                          {userData.email}
                        </p>
                        <p className="mb-0">
                          <i className="bi bi-telephone me-2"></i>
                          {userData.phone}
                        </p>
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
                              <Col md={6} key={property.id}>
                                <Card className="h-100 border-0 shadow-sm">
                                  <img 
                                    src={property.image} 
                                    className="card-img-top" 
                                    alt={property.title}
                                    style={{ height: '180px', objectFit: 'cover' }}
                                  />
                                  <Card.Body>
                                    <Card.Title className="fs-6">{property.title}</Card.Title>
                                    <div className="d-flex justify-content-between">
                                      <span className="text-muted">{property.type}</span>
                                      <strong>{property.price}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                      <span className={`badge ${property.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                        {property.status}
                                      </span>
                                      <div>
                                        <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                                        <Button variant="outline-danger" size="sm">Delete</Button>
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
                    <Tab eventKey="saved" title="Saved Properties">
                      <div className="p-3 py-5 text-center">
                        <h5 style={{ color: '#20c997' }}>Your Saved Properties</h5>
                        <p className="text-muted">Properties you've saved will appear here</p>
                      </div>
                    </Tab>
                    <Tab eventKey="settings" title="Account Settings">
                      <div className="p-3">
                        <h5 style={{ color: '#20c997' }} className="mb-4">Account Settings</h5>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Change Password</Form.Label>
                            <Form.Control type="password" placeholder="Current Password" className="mb-2" />
                            <Form.Control type="password" placeholder="New Password" className="mb-2" />
                            <Form.Control type="password" placeholder="Confirm New Password" />
                          </Form.Group>
                          <Button 
                            variant="success" 
                            style={{ backgroundColor: '#20c997', border: 'none' }}
                          >
                            Update Password
                          </Button>
                        </Form>

                        <div className="mt-5 pt-3 border-top">
                          <h6 className="text-danger">Danger Zone</h6>
                          <p className="text-muted small mb-3">
                            Deleting your account will remove all your data permanently.
                          </p>
                          <Button variant="outline-danger" size="sm">
                            Delete My Account
                          </Button>
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