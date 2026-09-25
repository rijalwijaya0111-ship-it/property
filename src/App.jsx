import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import properties from './data/properties';
import PropertyCard from './components/PropertyCard';
import PropertyDetail from './pages/PropertyDetail';
import Properties from './pages/Properties';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [activeProperty, setActiveProperty] = useState(0);
  const propertySliderRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    const slider = propertySliderRef.current;
    if (!slider) return;

    isDragging.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;

    slider.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    const slider = propertySliderRef.current;
    if (!slider || !isDragging.current) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    slider.scrollLeft = scrollLeft.current - walk;

    updateActiveProperty();
  };

  const handleMouseUp = () => {
    const slider = propertySliderRef.current;
    if (!slider) return;

    isDragging.current = false;
    slider.style.cursor = 'grab';
  };

  const updateActiveProperty = () => {
    const slider = propertySliderRef.current;
    if (!slider) return;

    const cards = slider.querySelectorAll('.property-card');

    if (!cards.length) return;

    const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - sliderCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveProperty(closestIndex);
  };
  useEffect(() => {
    const slider = propertySliderRef.current;

    if (!slider) return;

    const handleSliderScroll = () => {
      updateActiveProperty();
    };

    slider.addEventListener('scroll', handleSliderScroll, {
      passive: true,
    });

    return () => {
      slider.removeEventListener('scroll', handleSliderScroll);
    };
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="logo">
          PROPERTY
        </a>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#featured-properties" onClick={() => setMenuOpen(false)}>
            Properties
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </div>

        <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-label">FIND YOUR PERFECT PLACE</p>

          <h1>
            Find a place
            <br />
            you'll love to call home.
          </h1>

          <p className="hero-description">Discover exceptional properties in Bali, from modern villas to beautiful homes in prime locations.</p>

          <div className="search-box">
            <div className="search-input-wrapper">
              <span className="search-icon">⌕</span>

              <input type="text" placeholder="Search location, city, or property..." />
            </div>

            <button type="button">Search</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <p className="section-label">ABOUT US</p>

            <h2>
              A Different Perspective
              <br />
              On Property.
            </h2>

            <p className="about-description">Kami menghadirkan pilihan properti yang dikurasi dengan pendekatan yang lebih personal, modern, dan terpercaya.</p>

            <a href="#featured-properties" className="about-button">
              Explore Properties
            </a>
          </div>

          <div className="about-image">
            <img src="/images/about.webp" alt="About Property" />
          </div>
        </div>
      </section>

      {/* PROPERTY */}
      <section className="properties-section" id="featured-properties">
        <div className="section-header">
          <div>
            <p className="section-label">OUR PROPERTIES</p>

            <h2>Featured Properties</h2>
          </div>
          <Link to="/properties">View All Properties →</Link>
        </div>

        <div className="property-slider" ref={propertySliderRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        <div className="property-dots">
          {properties.map((property, index) => (
            <span key={property.id} className={`property-dot ${activeProperty === index ? 'active' : ''}`} />
          ))}
        </div>
      </section>

      {/*  CONTACT   */}
      <section id="contact" className="contact-section">
        <div className="section-header contact-section-header">
          <div>
            <h2>Contact Us</h2>
          </div>
        </div>
        <div className="contact-card">
          {/* LEFT - FORM */}
          <div className="contact-form-area">
            <h3>Fill the form</h3>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Your first name" />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Your last name" />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Your email address" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="6" placeholder="Tell us what you're looking for..."></textarea>
              </div>

              <button type="submit" className="contact-submit">
                Send Inquiry
              </button>
            </form>
          </div>

          {/* RIGHT - CONTACT INFO */}
          <div className="contact-info-area">
            <p className="contact-label">GET IN TOUCH</p>

            <h2>Get in Touch.</h2>

            <p className="contact-intro">Whether you have questions about a property, need more information, or simply want to explore your options, our team is here to assist you.</p>

            <div className="contact-info-grid">
              <div className="contact-info-item">
                <div className="contact-icon">✉</div>

                <div>
                  <strong>Email</strong>
                  <span>hello@property.com</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">◉</div>

                <div>
                  <strong>Website</strong>
                  <span>property.com</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">☎</div>

                <div>
                  <strong>Phone</strong>
                  <span>+62 812 3456 7890</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">●</div>

                <div>
                  <strong>Location</strong>
                  <span>Bali, Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          {/* LEFT - BRAND & NEWSLETTER */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-mark">◢</span>
              <span>PROPERTY Inc.</span>
            </div>

            <p className="footer-newsletter-text">
              Stay in the loop and sign up for the
              <br />
              Property newsletter:
            </p>

            <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" />

              <button type="submit">→</button>
            </form>
          </div>

          {/* COMPANY */}
          <div className="footer-column">
            <h4>Company</h4>

            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#featured-properties">Properties</a>
            <a href="#contact">Contact</a>
            <a href="#contact">FAQ</a>
            <a href="#contact">Team</a>
          </div>

          {/* DOCUMENTATION */}
          <div className="footer-column">
            <h4>Documentation</h4>

            <a href="#contact">Help Centre</a>
            <a href="#contact">Contact</a>
            <a href="#contact">FAQ</a>
            <a href="#contact">Privacy Policy</a>
          </div>

          {/* SOCIAL */}
          <div className="footer-column">
            <h4>Social</h4>

            <a href="#" target="_blank" rel="noreferrer">
              Facebook
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              Instagram
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              Youtube
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              Twitter
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© RIYU_DEV. All Rights Reserved 2026</p>

          <a href="#contact">Terms &amp; Conditions</a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
