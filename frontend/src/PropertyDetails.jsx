import React from 'react';
import { Container, Row, Col, Button, Carousel, Card, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const PropertyDetails = () => {
  // Sample property data (in a real app, you'd fetch this based on ID)
  const properties = [
    {
      id: 1,
      title: 'Modern 2BHK Flat in City Center',
      price: '₹45,00,000',
      location: 'Indore, MP',
      area: '1200 sq.ft',
      bedrooms: 2,
      bathrooms: 2,
      description: 'This beautiful modern flat is located in the heart of the city with all amenities nearby. The property features a spacious living area, modern kitchen, and two well-sized bedrooms with attached bathrooms.',
      amenities: ['Parking', 'Power Backup', 'Lift', 'Security', 'Swimming Pool'],
      postedBy: 'John Doe',
      postedDate: '2 days ago',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      ],
      contact: 'john@example.com',
      postedByImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    // Add more properties as needed
  ];

  // Get the property ID from URL params
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));

  if (!property) {
    return (
      <Container className="py-5 text-center">
        <h2>Property not found</h2>
        <Link to="/" className="btn btn-success mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  return (
    <div className="property-details-page">
      {/* Header Section */}
      <div className="bg-dark text-white py-3">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="m-0">
              <span className="fw-bold" style={{ color: '#20c997' }}>Magic</span>BricksClone
            </h3>
            <Link to="/" className="btn btn-outline-light btn-sm">
              Back to Home
            </Link>
          </div>
        </Container>
      </div>

      {/* Property Content */}
      <Container className="py-5">
        <Row>
          {/* Property Images Carousel */}
          <Col lg={7} className="mb-4">
            <Carousel interval={null}>
              {property.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <div className="property-image-container" style={{ height: '500px' }}>
                    <img
                      className="d-block w-100 h-100"
                      src={img}
                      alt={`Property ${index + 1}`}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {/* Property Details */}
          <Col lg={5}>
            <div className="sticky-top" style={{ top: '20px' }}>
              <h2 className="fw-bold mb-3">{property.title}</h2>
              
              <div className="d-flex align-items-center mb-3">
                <Badge bg="success" className="fs-5 me-3">{property.price}</Badge>
                <span className="text-muted">
                  <i className="bi bi-geo-alt-fill me-1"></i> {property.location}
                </span>
              </div>

              <div className="d-flex gap-4 mb-4">
                <div>
                  <span className="d-block text-muted small">Area</span>
                  <span className="fw-bold">{property.area}</span>
                </div>
                <div>
                  <span className="d-block text-muted small">Bedrooms</span>
                  <span className="fw-bold">{property.bedrooms}</span>
                </div>
                <div>
                  <span className="d-block text-muted small">Bathrooms</span>
                  <span className="fw-bold">{property.bathrooms}</span>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">Description</h5>
                <p className="text-muted">{property.description}</p>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">Amenities</h5>
                <div className="d-flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} bg="light" text="dark" className="px-3 py-2">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Posted By Section */}
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <img
                      src={property.postedByImage}
                      alt={property.postedBy}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-1 fw-bold">{property.postedBy}</h6>
                      <p className="mb-0 text-muted small">Posted {property.postedDate}</p>
                    </div>
                    <Button
                      variant="success"
                      className="ms-auto"
                      style={{ backgroundColor: '#20c997', border: 'none' }}
                      href={`mailto:${property.contact}`}
                    >
                      Contact Owner
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
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

export default PropertyDetails;