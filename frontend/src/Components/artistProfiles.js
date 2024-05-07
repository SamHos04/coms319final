import React, { useEffect, useState } from 'react';

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
      const response = await fetch('/getArtists');
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error('Error fetching artist profiles:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {/* Map through artists array and render artist profiles */}
          {artists.map(artist => (
            <div key={artist._id} className="col">
              <div className="artist-profile">
                <img src={artist.imageOfPerson} alt={`Portrait of ${artist.name}`} />
                <h2>{artist.name}</h2>
                <p><strong>Most Famous Piece:</strong> {artist.mostFamousPiece}</p>
                <p><strong>Country of Origin:</strong> {artist.countryOfOrigin}</p>
                <p><strong>Other Work:</strong> {artist.otherWork}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistProfiles;
