import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-page">
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
                to="/login"
                style={{ borderColor: '#20c997', color: '#20c997' }}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Forgot Password Section */}
      <section className="forgot-password-section py-5" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 120px)' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="bg-white shadow-sm rounded p-4 p-md-5">
                <div className="text-center mb-4">
                  <h3 style={{ color: '#20c997' }} className="fw-bold">Reset Your Password</h3>
                  <p className="text-muted">Enter your details to recover your account</p>
                </div>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter your registered email" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                      type="tel" 
                      placeholder="Enter your registered phone number" 
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
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 rounded-pill py-2 mt-3"
                    style={{ backgroundColor: '#20c997', border: 'none' }}
                  >
                    Verify Identity
                  </Button>

                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Remember your password?{' '}
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

export default ForgotPasswordPage;