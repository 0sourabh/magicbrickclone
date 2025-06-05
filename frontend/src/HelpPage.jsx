import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const HelpPage = () => {
  return (
    <div className="help-page">
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

      {/* Help Section */}
      <section className="help-section py-5" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 120px)' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <div className="bg-white shadow-sm rounded p-4 p-md-5">
                <div className="text-center mb-4">
                  <h3 style={{ color: '#20c997' }} className="fw-bold">Help & Support</h3>
                  <p className="text-muted">How can we help you today?</p>
                </div>

                <Row className="g-4 mb-5">
                  <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center p-4">
                      <div className="mb-3" style={{ color: '#20c997', fontSize: '2rem' }}>
                        <i className="bi bi-telephone"></i>
                      </div>
                      <h5>Call Us</h5>
                      <p className="text-muted small">Available 24/7</p>
                      <Button 
                        variant="outline-primary" 
                        className="rounded-pill mt-2"
                        style={{ borderColor: '#20c997', color: '#20c997' }}
                      >
                        1800-123-4567
                      </Button>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center p-4">
                      <div className="mb-3" style={{ color: '#20c997', fontSize: '2rem' }}>
                        <i className="bi bi-chat-dots"></i>
                      </div>
                      <h5>Live Chat</h5>
                      <p className="text-muted small">Instant support</p>
                      <Button 
                        variant="primary" 
                        className="rounded-pill mt-2"
                        style={{ backgroundColor: '#20c997', border: 'none' }}
                      >
                        Start Chat
                      </Button>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center p-4">
                      <div className="mb-3" style={{ color: '#20c997', fontSize: '2rem' }}>
                        <i className="bi bi-envelope"></i>
                      </div>
                      <h5>Email Us</h5>
                      <p className="text-muted small">Response within 24 hours</p>
                      <Button 
                        variant="outline-primary" 
                        className="rounded-pill mt-2"
                        style={{ borderColor: '#20c997', color: '#20c997' }}
                      >
                        support@magicbricksclone.com
                      </Button>
                    </Card>
                  </Col>
                </Row>

                <div className="mb-5">
                  <h4 className="mb-4" style={{ color: '#20c997' }}>Frequently Asked Questions</h4>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="mb-3 border">
                      <Accordion.Header>How do I reset my password?</Accordion.Header>
                      <Accordion.Body>
                        You can reset your password by clicking on "Forgot Password" on the login page. 
                        You'll receive an email with instructions to create a new password.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className="mb-3 border">
                      <Accordion.Header>How can I update my profile information?</Accordion.Header>
                      <Accordion.Body>
                        Go to your account settings after logging in. You can edit your personal 
                        information, contact details, and preferences from there.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className="mb-3 border">
                      <Accordion.Header>What payment methods do you accept?</Accordion.Header>
                      <Accordion.Body>
                        We accept all major credit/debit cards, net banking, UPI, and popular 
                        digital wallets. All transactions are securely processed.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div>
                  <h4 className="mb-4" style={{ color: '#20c997' }}>Contact Form</h4>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Your Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter your name" 
                            className="border-1 shadow-none"
                            style={{ borderColor: '#20c997' }}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
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
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="What's this about?" 
                        className="border-1 shadow-none"
                        style={{ borderColor: '#20c997' }}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={4} 
                        placeholder="How can we help you?" 
                        className="border-1 shadow-none"
                        style={{ borderColor: '#20c997' }}
                        required
                      />
                    </Form.Group>
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="rounded-pill py-2 px-4"
                      style={{ backgroundColor: '#20c997', border: 'none' }}
                    >
                      Send Message
                    </Button>
                  </Form>
                </div>
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

export default HelpPage;