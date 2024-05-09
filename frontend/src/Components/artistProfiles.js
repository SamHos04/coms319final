import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap';

function ArtistProfiles() {
  // State to store artist profiles
  const [artists, setArtists] = useState([]);

  // Effect to fetch artist profiles when component mounts
  useEffect(() => {
    fetchArtistProfiles();
  }, []);

  // Function to fetch artist profiles from backend
  const fetchArtistProfiles = async () => {
    try {
      // Fetch artist profiles from backend API
      const response = await fetch("http://localhost:8081/listArtists");
      const data = await response.json();

      const artistData = await Promise.all(data.map(async artist => ({
        ...artist,
      })));

      setArtists(artistData);
    } catch (error) {
      console.error('Error fetching artist profiles:', error);
    }
  };

  return (
    <div>
      <div className="album py-5 bg-body-tertiary">
        <Container>
          <Row xs={1} sm={2} md={3} className="g-3">
            {artists.map(artists => (
              <Col key={artists._id}>
                <Card>
                  <Card.Img variant="top" src={artists.imageOfPerson} />
                  <Card.Body>
                    <Card.Text>Most Famous Piece {artists.mostFamousPiece}</Card.Text>
                    <Card.Title>Country: {artists.countryOfOrigin}</Card.Title>
                    <Card.Title>Other work: {artists.otherWork}</Card.Title>
                    
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

export default ArtistProfiles;