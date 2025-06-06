import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Carousel, Card, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${API_BASE_URL}/api/properties/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (!property || property.msg === "Property not found") {
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
              {(property.images || []).map((img, index) => (
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

              {/* Add property type here */}
              <div className="mb-3">
                <span className="badge bg-info text-dark">{property.propertyType}</span>
              </div>

              <div className="d-flex gap-4 mb-4">
                <div>
                  <span className="d-block text-muted small">Area</span>
                  <span className="fw-bold">{property.area} sq.ft</span>
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
                  {(property.amenities || []).map((amenity, index) => (
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
                      src="https://cdn.pixabay.com/photo/2017/01/31/13/14/animal-2023924_1280.png"
                      alt={property.userId?.name || "Owner"}
                      className="rounded-circle me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-1 fw-bold">{property.userId?.name || "Owner"}</h6>
                      <p className="mb-0 text-muted small">
                        {property.createdAt ? `Posted ${new Date(property.createdAt).toLocaleDateString()}` : ""}
                      </p>
                      {property.userId?.email && (
                        <a
                          href={`mailto:${property.userId.email}?subject=Enquiry about your property "${property.title}"`}
                          className="btn btn-outline-success btn-sm mt-2"
                          style={{ backgroundColor: '#fff', borderColor: '#20c997', color: '#20c997' }}
                        >
                          Contact Owner
                        </a>
                      )}
                    </div>
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