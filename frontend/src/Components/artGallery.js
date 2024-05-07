import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap';


function ArtGallery() {
  const [artwork, setArtwork] = useState([]);

  useEffect(() => {
    fetchArtwork();
  }, []);

  const fetchArtwork = async () => {
    try {
      const response = await fetch("http://localhost:8081/listArtwork"); // Updated endpoint
      const data = await response.json();
      setArtwork(data);
    } catch (error) {
      console.error('Error fetching artwork:', error);
    }
  };

  return (
    <div>
      <div className="album py-5 bg-body-tertiary">
        <Container>
          <Row xs={1} sm={2} md={3} className="g-3">
            {artwork.map(art => (
              <Col key={art._id}>
                <Card>
                  <Card.Img variant="top" src={art.imageOfArt} />
                  <Card.Body>
                    <Card.Title>{art.name}</Card.Title>
                    <Card.Text>Price: ${art.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ArtGallery;
