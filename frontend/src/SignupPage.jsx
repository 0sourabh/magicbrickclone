import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const SignupPage = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      if (value.length === 10) {
        setPhoneError('');
      } else {
        setPhoneError('Phone number must be 10 digits');
      }
    }
  };

  return (
    <div className="signup-page">
      {/* Header - Consistent with other pages */}
      <header className="bg-dark text-white py-3">
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

      {/* Signup Section */}
      <section className="signup-section py-5" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 120px)' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="bg-white shadow-sm rounded p-4 p-md-5">
                <div className="text-center mb-4">
                  <h3 style={{ color: '#20c997' }} className="fw-bold">Create Your Account</h3>
                  <p className="text-muted">Join us to get started</p>
                </div>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your full name" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter your email" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                      type="tel" 
                      placeholder="Enter 10-digit phone number" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      maxLength={10}
                    />
                    {phoneError && <div className="text-danger small">{phoneError}</div>}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Create a password" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      required
                    />
                    <small className="text-muted">Use 8 or more characters with a mix of letters, numbers & symbols</small>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Confirm your password" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Enter your full address" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                      type="date" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      required
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const formattedDate = date.toISOString().split('T')[0];
                        e.target.value = formattedDate;
                      }}
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 rounded-pill py-2 mt-3"
                    style={{ backgroundColor: '#20c997', border: 'none' }}
                    disabled={phoneError || phone.length !== 10}
                  >
                    Create Account
                  </Button>

                  <div className="d-flex align-items-center my-4">
                    <div style={{ borderTop: '1px solid #dee2e6', flexGrow: 1 }}></div>
                    <span className="px-3 text-muted">OR</span>
                    <div style={{ borderTop: '1px solid #dee2e6', flexGrow: 1 }}></div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Already have an account?{' '}
                      <Link to="/login" style={{ color: '#0d6efd', textDecoration: 'none' }}>
                        Login here
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
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

export default SignupPage;