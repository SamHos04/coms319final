import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

function ArtGallery() {
  const [artwork, setArtwork] = useState([]);

  useEffect(() => {
    fetchArtwork();
  }, []);

  const fetchArtwork = async () => {
    try {
      const response = await fetch("http://localhost:8081/listArtwork");
      const data = await response.json();
      setArtwork(data);
    } catch (error) {
      console.error('Error fetching artwork', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/deleteArtwork/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setArtwork(artwork.filter(art => art._id !== id));
      } else {
        alert('Failed to delete artwork');
      }
    } catch (error) {
      console.error('Error deleting artwork', error);
    }
  };

  const handleUpdate = (id) => {
    // Placeholder for update functionality
    // This could redirect to an update form or trigger a modal
    console.log('Update functionality not implemented yet');
  };

  return (
    <Container>
      <Row xs={1} sm={2} md={3} className="g-3">
        {artwork.map(art => (
          <Col key={art._id}>
            <Card>
              <Card.Img variant="top" src={art.imageOfArt} />
              <Card.Body>
                <Card.Title>{art.name}</Card.Title>
                <Card.Text>Price: ${art.price}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(art._id)}>Delete</Button>
                <Button variant="primary" onClick={() => handleUpdate(art._id)}>Update</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArtGallery;
