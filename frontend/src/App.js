import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './Components/homePage';
import ArtGallery from './Components/artGallery';
import ArtistProfiles from './Components/artistProfiles';
import AboutUs from './Components/aboutUs';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Homepage</Link></li>
            <li><Link to="/art-gallery">Art Gallery</Link></li>
            <li><Link to="/artist-profiles">Artist Profiles</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/art-gallery" element={<ArtGallery />} />
          <Route path="/artist-profiles" element={<ArtistProfiles />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
