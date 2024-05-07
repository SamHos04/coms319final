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

      // Fetch image for each artist in parallel
      const artistData = await Promise.all(data.map(async artist => ({
        ...artist,
        image: await fetchImage(artist.imageOfPerson)
      })));

      setArtists(artistData);
    } catch (error) {
      console.error('Error fetching artist profiles:', error);
    }
  };

  // Function to fetch image from backend
  const fetchImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
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
                <img src={artist.image} alt={`Portrait of ${artist.name}`} />
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
