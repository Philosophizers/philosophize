// AboutPage.js
import React from 'react';
import './about.css';
import linkedInLogo from './LinkedIn_logo_initials.png'; 
import githubLogo from './githublogopng.png'; 
import yoseph from './yosimg.jpeg';
import yoslogo from './yoslogosamp1.webp'

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <h1>About Philosophize</h1>
      <p>Philosophize is a philosophical debate platform designed by Yoseph Latif with the goal of promoting informed and focused conversations.
        <br />
        <br /> 
        The idea began as a conscious effort to counteract doomscrolling and the mass consumption of content on most social media websites. 
        There are intentional limitations as each day there is only one central topic to discuss and users only get one vote and one comment. 
        The goal is to enter, gain some insight, 
        provide your opinions if you like, then close the site for the rest of the day and come back tomorrow if you would like.
        <br />
        <br />
        Philosophize is not in its final form and will continue to grow. Soon-to-be implemented plans include an "Archive" section to see topics of the past,
        a "Resrouce" section to provide readings or video pertaining to the topic, and eventually a "Live Debate" feature, something that will radically change the website. </p>
      
      <h2>About the Developer</h2>
      <div className="developer-img">
        <img src={yoseph} alt="Yoseph Latif" />
      </div>
      <div className="social-links">
        <a href="https://www.linkedin.com/in/yoseph-latif/" target="_blank" rel="noopener noreferrer">
          <img src={linkedInLogo} alt="LinkedIn" />
        </a>
        <a href="https://yosfolio.vercel.app/" target="_blank" rel="noopener noreferrer">
          <img src={yoslogo} alt="Yosfolio" />
          </a>
        <a href="https://github.com/yoslatif" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub" />
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
