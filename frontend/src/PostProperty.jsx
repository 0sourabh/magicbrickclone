import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const PostProperty = () => {
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    price: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    furnishing: '',
    amenities: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security',
    'Lift', 'Power Backup', 'Water Supply', 'Play Area',
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    setError('');
    setSuccess(false);

    if (images.length < 5) {
      setError('Please upload at least 5 images.');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => formDataToSend.append(key, item));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      images.forEach((image) => formDataToSend.append('images', image));

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/properties', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'Failed to post property');
      }

      const data = await response.json();
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        propertyType: '',
        price: '',
        location: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        furnishing: '',
        amenities: [],
      });
      setImages([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + images.length > 10) {
        alert('Maximum 10 images allowed');
        return;
      }
      setImages([...images, ...files]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmenityChange = (amenity) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter((a) => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  return (
    <div className="post-property-page">
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

      {/* Main Form Section */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 120px)' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="mb-4 text-center" style={{ color: '#20c997' }}>Post Your Property</h3>

                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && (
                    <Modal show={success} onHide={() => setSuccess(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Your property has been posted successfully!</Modal.Body>
                      <Modal.Footer>
                        <Button variant="success" onClick={() => setSuccess(false)}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <h5 className="mb-3">Basic Information</h5>
                    <Row className="mb-4">
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="title">
                          <Form.Label>Property Title*</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="title"
                            placeholder="e.g. Beautiful 3BHK Apartment in City Center"
                            value={formData.title}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a property title.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="propertyType">
                          <Form.Label>Property Type*</Form.Label>
                          <Form.Select
                            required
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                          >
                            <option value="">Select Type</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Plot">Plot</option>
                            <option value="Commercial">Commercial</option>
                            <option value="PG">PG</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select property type.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Group controlId="description">
                          <Form.Label>Description*</Form.Label>
                          <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder="Describe your property in detail..."
                            value={formData.description}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a description.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Pricing & Location */}
                    <h5 className="mb-3">Pricing & Location</h5>
                    <Row className="mb-4">
                      <Col md={4} className="mb-3">
                        <Form.Group controlId="price">
                          <Form.Label>Price (₹)*</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            name="price"
                            placeholder="e.g. 5000000"
                            value={formData.price}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid price.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group controlId="location">
                          <Form.Label>Location*</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="location"
                            placeholder="e.g. Indore, MP"
                            value={formData.location}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide location.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group controlId="area">
                          <Form.Label>Area (sq.ft)*</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            name="area"
                            placeholder="e.g. 1500"
                            value={formData.area}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please provide area.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Property Details */}
                    <h5 className="mb-3">Property Details</h5>
                    <Row className="mb-4">
                      <Col md={4} className="mb-3">
                        <Form.Group controlId="bedrooms">
                          <Form.Label>Bedrooms*</Form.Label>
                          <Form.Select
                            required
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select bedrooms.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group controlId="bathrooms">
                          <Form.Label>Bathrooms*</Form.Label>
                          <Form.Select
                            required
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5+">5+</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select bathrooms.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Form.Group controlId="furnishing">
                          <Form.Label>Furnishing*</Form.Label>
                          <Form.Select
                            required
                            name="furnishing"
                            value={formData.furnishing}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="Furnished">Furnished</option>
                            <option value="Semi-Furnished">Semi-Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select furnishing.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Amenities */}
                    <h5 className="mb-3">Amenities</h5>
                    <Row className="mb-4">
                      {amenitiesList.map((amenity, index) => (
                        <Col xs={6} sm={4} md={3} key={index} className="mb-2">
                          <Form.Check
                            type="checkbox"
                            id={`amenity-${index}`}
                            label={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                          />
                        </Col>
                      ))}
                    </Row>

                    {/* Image Upload */}
                    <h5 className="mb-3">Upload Images*</h5>
                    <Row className="mb-4">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Minimum 5 images required (Max 10)</Form.Label>
                          <Form.Control
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mb-3"
                          />
                          {images.length < 5 && validated && (
                            <Alert variant="danger">
                              Please upload at least 5 images.
                            </Alert>
                          )}
                          <div className="d-flex flex-wrap gap-3">
                            {images.map((image, index) => (
                              <div key={index} className="position-relative" style={{ width: '100px', height: '100px' }}>
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Property ${index + 1}`}
                                  className="img-fluid rounded h-100 w-100 object-fit-cover"
                                />
                                <Button
                                  variant="danger"
                                  size="sm"
                                  className="position-absolute top-0 end-0 rounded-circle p-0"
                                  style={{ width: '24px', height: '24px' }}
                                  onClick={() => removeImage(index)}
                                >
                                  ×
                                </Button>
                              </div>
                            ))}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                      <Button
                        variant="success"
                        type="submit"
                        className="rounded-pill px-5 py-2"
                        style={{ backgroundColor: '#20c997', border: 'none' }}
                        disabled={loading}
                      >
                        {loading ? 'Posting...' : 'Post Property'}
                      </Button>
                    </div>
                  </Form>
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

export default PostProperty;