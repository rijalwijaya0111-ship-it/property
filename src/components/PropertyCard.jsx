import { Link } from 'react-router-dom';

function PropertyCard({ property, from = '/' }) {
  return (
    <Link to={`/property/${property.id}`} state={{ from }} className="property-card">
      <img src={property.image} alt={property.name} className="property-card-image" />

      <div className="property-card-content">
        <span className="property-category">{property.category}</span>

        <h3>{property.name}</h3>

        <p className="property-location">📍 {property.location}</p>

        <p className="property-price">Rp {property.price.toLocaleString('id-ID')}</p>

        <div className="property-info">
          <span>🛏 {property.bedrooms} Bedrooms</span>
          <span>🚿 {property.bathrooms} Bathrooms</span>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
