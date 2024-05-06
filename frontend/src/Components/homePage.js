import React from 'react';

function HomePage() {
  return (
    <header>
      <h1>Welcome to Our Art Gallery</h1>
      <p>Discover the world of art through our collections.</p>
      <section className="intro">
        <h2>Explore, Discover, and Get Inspired</h2>
        <p>This virtual gallery is designed to showcase the diverse and dynamic world of art, offering a platform for artists to present their work and for art enthusiasts to explore and appreciate these creations. From classical to contemporary, our curated collections aim to enlighten, inspire, and provoke thought.</p>
      </section>
      <section className="featured-art">
        <h2>Featured Artwork</h2>
        <img src="./Artwork/Pietá.jpg" alt="Featured Artwork" style={{ maxWidth: '30%', height: 'auto' }} />
        <h3>Pietá by Michelangelo</h3>
        <p>This is the featured work because of its excellent marble structure, and its beauty.</p>
      </section>
    </header>
  );
}

export default HomePage;
