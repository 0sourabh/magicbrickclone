import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Dropdown, Card } from 'react-bootstrap';
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

const sampleProperties = [
  {
    id: 1,
    title: 'Modern 2BHK Flat in City Center',
    price: '₹45,00,000',
    location: 'Indore, MP',
    area: '1200 sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    postedBy: 'John Doe',
    postedDate: '2 days ago',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    contact: 'john@example.com',
    postedByImage: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    title: 'Luxury Villa with Pool',
    price: '₹1,20,00,000',
    location: 'Bhopal, MP',
    area: '4500 sq.ft',
    bedrooms: 4,
    bathrooms: 3,
    postedBy: 'Jane Smith',
    postedDate: '1 week ago',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    contact: 'jane@example.com',
    postedByImage: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: 3,
    title: 'Residential Plot in Developing Area',
    price: '₹25,00,000',
    location: 'Dewas, MP',
    area: '2400 sq.ft',
    bedrooms: 0,
    bathrooms: 0,
    postedBy: 'Robert Johnson',
    postedDate: '3 days ago',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    contact: 'robert@example.com',
    postedByImage: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: 4,
    title: 'Commercial Space in Prime Location',
    price: '₹75,00,000',
    location: 'Indore, MP',
    area: '3000 sq.ft',
    bedrooms: 0,
    bathrooms: 2,
    postedBy: 'Sarah Williams',
    postedDate: '5 days ago',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    contact: 'sarah@example.com',
    postedByImage: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 5,
    title: '3BHK Apartment with Lake View',
    price: '₹65,00,000',
    location: 'Indore, MP',
    area: '1800 sq.ft',
    bedrooms: 3,
    bathrooms: 2,
    postedBy: 'Michael Brown',
    postedDate: '1 day ago',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    contact: 'michael@example.com',
    postedByImage: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [properties, setProperties] = useState(sampleProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === homeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter properties based on search criteria
    const filtered = sampleProperties.filter(property => {
      const matchesCity = property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = propertyType === '' || 
        property.title.toLowerCase().includes(propertyType.toLowerCase());
      const matchesBudget = budget === '' || 
        (parseInt(property.price.replace(/[^0-9]/g, '')) <= parseInt(budget.replace(/[^0-9]/g, '')));
      
      return matchesCity && matchesType && matchesBudget;
    });
    setProperties(filtered);
  };

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

            {/* Search Bar */}
            <Row className="justify-content-center mt-4">
              <Col md={10} lg={8}>
                <Form onSubmit={handleSearch} className="d-flex flex-column flex-md-row gap-2 bg-white shadow-sm p-3 rounded">
                  <Form.Control 
                    placeholder="Search by city e.g. Indore" 
                    className="border-0 shadow-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Form.Control 
                    placeholder="Property Type e.g. Flat, Villa" 
                    className="border-0 shadow-none"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  />
                  <Form.Control 
                    placeholder="Max Budget e.g. 5000000" 
                    className="border-0 shadow-none"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <Button
                    type="submit"
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

      {/* Recently Posted Properties Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h4 className="fw-bold mb-3">Recently Posted Properties</h4>
            <p className="text-muted">Find the latest properties posted by our users</p>
          </div>
          
          {properties.length === 0 ? (
            <div className="text-center py-5">
              <h5>No properties found matching your search criteria</h5>
              <Button 
                variant="success" 
                onClick={() => {
                  setProperties(sampleProperties);
                  setSearchTerm('');
                  setPropertyType('');
                  setBudget('');
                }}
                style={{ backgroundColor: '#20c997', border: 'none' }}
              >
                Reset Search
              </Button>
            </div>
          ) : (
            <Row className="g-4">
              {properties.map((property) => (
                <Col xs={12} md={6} lg={4} key={property.id}>
                  <Card className="h-100 shadow-sm border-0">
                    <Link to={`/property/${property.id}`} className="text-decoration-none">
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <img 
                          src={property.image} 
                          className="card-img-top w-100 h-100" 
                          alt={property.title}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-1">{property.title}</h5>
                        <span className="badge bg-success">{property.price}</span>
                      </div>
                      <p className="card-text text-muted small mb-2">
                        <i className="bi bi-geo-alt-fill me-1"></i> {property.location}
                      </p>
                      <div className="d-flex gap-3 mb-3">
                        <span className="text-muted small">
                          <i className="bi bi-house-door me-1"></i> {property.area}
                        </span>
                        <span className="text-muted small">
                          <i className="bi bi-door-closed me-1"></i> {property.bedrooms} Beds
                        </span>
                        <span className="text-muted small">
                          <i className="bi bi-bucket me-1"></i> {property.bathrooms} Baths
                        </span>
                      </div>
                      
                      <div className="d-flex align-items-center mt-3 pt-2 border-top">
                        <img 
                          src={property.postedByImage} 
                          alt={property.postedBy}
                          className="rounded-circle me-2"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div>
                          <p className="mb-0 small fw-bold">{property.postedBy}</p>
                          <p className="mb-0 text-muted small">Posted {property.postedDate}</p>
                        </div>
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="ms-auto"
                          style={{ borderColor: '#20c997', color: '#20c997' }}
                          href={`mailto:${property.contact}`}
                        >
                          Contact
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <div className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} MagicBricksClone. All rights reserved. Shrivanshu, Sourabh</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;