import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      {/* Header - Consistent with HomePage */}
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

      {/* Login Section */}
      <section className="login-section py-5" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 120px)' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="bg-white shadow-sm rounded p-4 p-md-5">
                <div className="text-center mb-4">
                  <h3 style={{ color: '#20c997' }} className="fw-bold">Welcome Back</h3>
                  <p className="text-muted">Sign in to access your account</p>
                </div>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter your email" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Enter your password" 
                      className="border-1 shadow-none"
                      style={{ borderColor: '#20c997' }}
                    />
                    <div className="text-end mt-2">
                      <Link to="/forgot-password" style={{ color: '#0d6efd', textDecoration: 'none' }}>
                        Forgot Password?
                      </Link>
                    </div>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 rounded-pill py-2 mt-3"
                    style={{ backgroundColor: '#20c997', border: 'none' }}
                  >
                    Sign In
                  </Button>

                  <div className="d-flex align-items-center my-4">
                    <div style={{ borderTop: '1px solid #dee2e6', flexGrow: 1 }}></div>
                    <span className="px-3 text-muted">OR</span>
                    <div style={{ borderTop: '1px solid #dee2e6', flexGrow: 1 }}></div>
                  </div>

                  

                  <div className="text-center mt-4">
                    <p className="text-muted">
                      Don't have an account?{' '}
                      <Link to="/register" style={{ color: '#0d6efd', textDecoration: 'none' }}>
                        Sign up
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer - Consistent with HomePage */}
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

export default LoginPage;