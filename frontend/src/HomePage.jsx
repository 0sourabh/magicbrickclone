import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

const categories = [
  {
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Flats',
    count: '150+',
  },
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Villas',
    count: '90+',
  },
  {
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Plots',
    count: '200+',
  },
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Commercial',
    count: '75+',
  },
];

const homeImages = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === homeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="bg-dark text-white py-3 sticky-top">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="m-0">
              <span className="fw-bold" style={{ color: '#20c997' }}>Magic</span>BricksClone
            </h3>
            <div className="d-flex gap-3 align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic" size="sm">
                  Indore
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Delhi</Dropdown.Item>
                  <Dropdown.Item>Mumbai</Dropdown.Item>
                  <Dropdown.Item>Dewas</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div>
                <Button
                  as={Link}
                  to="/ProfilePage"
                  variant="outline-light"
                  size="sm"
                  className="me-2"
                >
                  Profile
                </Button>
                <Button
                  as={Link}
                  to="/PostProperty"
                  variant="success"
                  size="sm"
                  style={{ backgroundColor: '#20c997', border: 'none' }}
                >
                  Post Property
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm py-2 border-bottom">
        <Container>
          <div className="d-flex flex-wrap gap-4">
            <a href="#" className="text-dark text-decoration-none fw-semibold">
              Buy
            </a>
            <a href="#" className="text-dark text-decoration-none fw-semibold">
              Rent
            </a>
            <a href="#" className="text-dark text-decoration-none fw-semibold">
              Sell
            </a>
            <a href="#" className="text-dark text-decoration-none fw-semibold">
              Commercial
            </a>
            <a href="/HelpPage" className="text-dark text-decoration-none ms-md-auto">
              Help
            </a>
          </div>
        </Container>
      </nav>

      {/* Hero Section with Background Slideshow */}
      <section 
        className="hero-section py-5 position-relative" 
        style={{ 
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Background Images */}
        <div className="position-absolute w-100 h-100" style={{ overflow: 'hidden' }}>
          {homeImages.map((img, index) => (
            <div 
              key={index}
              className={`position-absolute w-100 h-100 transition-opacity ${index === currentImageIndex ? 'opacity-50' : 'opacity-0'}`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 1.5s ease-in-out',
                zIndex: 0
              }}
            />
          ))}
        </div>

        {/* Content */}
        <Container className="py-4 position-relative" style={{ zIndex: 1 }}>
          <div className="text-center">
            <h2 className="mb-4 fw-bold display-4">
              Find a home you'll <span style={{ color: '#20c997' }}>love</span>
            </h2>
            <p className="text-white mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              Discover your perfect property from our curated collection
            </p>
           {/* ... (previous code remains the same until the buttons section) ... */}

<div className="d-flex justify-content-center flex-wrap gap-3 my-4">
  <Button 
    variant="dark" 
    className="px-4 rounded-pill"
    style={{ backgroundColor: '#000', border: 'none' }}
  >
    Buy
  </Button>
  <Button 
    variant="dark" 
    className="px-4 rounded-pill"
    style={{ backgroundColor: '#000', border: 'none' }}
  >
    Rent
  </Button>
  <Button 
    variant="success" 
    className="px-4 rounded-pill"
    style={{ backgroundColor: '#20c997', border: 'none' }}
  >
    PG
  </Button>
</div>

{/* ... (rest of the code remains the same) ... */}

            {/* Search Bar */}
            <Row className="justify-content-center mt-4">
              <Col md={10} lg={8}>
                <Form className="d-flex flex-column flex-md-row gap-2 bg-white shadow-sm p-3 rounded">
                  <Form.Control 
                    placeholder="City e.g. Bangalore" 
                    className="border-0 shadow-none"
                  />
                  <Form.Control 
                    placeholder="Property Type e.g. Flat" 
                    className="border-0 shadow-none"
                  />
                  <Form.Control 
                    placeholder="Budget" 
                    className="border-0 shadow-none"
                  />
                  <Button
                    variant="success"
                    className="w-100 w-md-auto rounded-pill px-4"
                    style={{ backgroundColor: '#20c997', border: 'none' }}
                  >
                    Search Properties
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* Category Section */}
      <section className="category-section py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h4 className="fw-bold mb-3">We've got properties for everyone</h4>
            <p className="text-muted">Browse our carefully selected properties</p>
          </div>
          <Row className="g-4">
            {categories.map((item, idx) => (
              <Col xs={12} sm={6} md={3} key={idx}>
                <div className="shadow-sm rounded overflow-hidden h-100 card-hover border-0">
                  <img 
                    src={item.img} 
                    className="img-fluid w-100" 
                    alt={item.title} 
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="p-4">
                    <h6 className="m-0 text-dark fw-bold">{item.count} Properties</h6>
                    <small className="text-muted d-block mb-2">{item.title}</small>
                    <a href="#" className="text-decoration-none fw-medium" style={{ color: '#20c997' }}>
                      Explore Properties →
                    </a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <div className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} MagicBricksClone. All rights reserved.Shrivanshu,Sourabh</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;