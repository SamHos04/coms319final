import React from 'react';

function AboutUs() {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><a href="/">Homepage</a></li>
          <li><a href="/art-gallery">Art Gallery</a></li>
          <li><a href="/artist-profiles">Artist Profiles</a></li>
          <li><a href="/about-us">About Us</a></li>
        </ul>
      </nav>
      <div className="about-section">
        <h1>About Us</h1>
        <p>Final Project Art Gallery project</p>
        <p>This is for SE/Coms319 Construction of User Interfaces with Dr. Jannesari. This was done in Spring 2024.</p>
        <p>Date: May 6th, 2024</p>
        <p>Contributors: Sam Hostetter, Ali Tahmsebi</p>
        <p>Emails: samuelho@iastate.edu, ATahmas@iastate.edu</p>
      </div>
    </div>
  );
}

export default AboutUs;
