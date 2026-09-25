import { Link, useLocation } from 'react-router-dom';

import properties from '../data/properties';

function PropertyDetail() {
  const location = useLocation();

  const id = Number(location.pathname.split('/').pop());
  const property = properties.find((item) => item.id === id);

  if (!property) {
    return (
      <div style={{ padding: '50px' }}>
        <h1>Property tidak ditemukan</h1>
        <Link to="/">Kembali ke Home</Link>
      </div>
    );
  }

  // Menentukan halaman asal user
  const from = location.state?.from || '/';
  const backLabel = from === '/properties' ? '← Back to All Properties' : '← Back to Home';
  const whatsappMessage = `Halo Admin, saya tertarik dengan ${property.name} di ${property.location}. Apakah property ini masih tersedia?`;
  const whatsappUrl = `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="property-detail-page">
      <Link to={from} className="back-button">
        {backLabel}
      </Link>

      <div className="property-detail-image-wrapper">
        <img src={property.image} alt={property.name} className="property-detail-image" />
      </div>

      <div className="property-detail-content">
        <span className="property-category">{property.category}</span>

        <h1>{property.name}</h1>

        <p className="property-location">📍 {property.location}</p>

        {property.description && (
          <div className="property-description">
            <p className="description-label">ABOUT THIS PROPERTY</p>

            <p className="description-text">{property.description}</p>
          </div>
        )}

        <p className="property-price">Rp {property.price.toLocaleString('id-ID')}</p>

        <div className="property-detail-info">
          <div>
            <strong>🛏 {property.bedrooms}</strong>
            <span>Bedrooms</span>
          </div>

          <div>
            <strong>🚿 {property.bathrooms}</strong>
            <span>Bathrooms</span>
          </div>

          <div>
            <strong>{property.status}</strong>
            <span>Status</span>
          </div>
        </div>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="whatsapp-icon">
            <path
              fill="currentColor"
              d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.52 0 .2 5.32.2 11.87c0 2.09.55 4.13 1.6 5.92L.1 24l6.36-1.67a11.86 11.86 0 0 0 5.6 1.42h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.15-3.42-8.4ZM12.07 21.75h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.84 9.84 0 0 1-1.51-5.22C2.17 6.44 6.61 2 12.07 2c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.86-9.89 9.86Zm5.42-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
            />
          </svg>

          <span>Chat Admin via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default PropertyDetail;
