import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ArtGallery() {
  const [artwork, setArtwork] = useState([]);
  const [newArtwork, setNewArtwork] = useState({
    title: '',
    artist: '',
    description: '',
    image: '',
    price: ''
  });

  useEffect(() => {
    fetchArtwork();
  }, []);

  const fetchArtwork = async () => {
    const response = await fetch("http://localhost:8081/listArtwork");
    const data = await response.json();
    setArtwork(data);
  };

  const handleCreate = async () => {
    await fetch('http://localhost:8081/createArtwork', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArtwork)
    });
    fetchArtwork();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8081/deleteArtwork/${id}`, {
      method: 'DELETE'
    });
    fetchArtwork();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArtwork(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={newArtwork.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Artist</Form.Label>
              <Form.Control type="text" name="artist" value={newArtwork.artist} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={newArtwork.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="image" value={newArtwork.image} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={newArtwork.price} onChange={handleChange} />
            </Form.Group>
            <Button onClick={handleCreate}>Add New Artwork</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {artwork.map((art) => (
          <Col key={art._id} xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src={art.image} />
              <Card.Body>
                <Card.Title>{art.title}</Card.Title>
                <Card.Text>{art.description}</Card.Text>
                <Button variant="danger" onClick={() => handleDelete(art._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArtGallery;
