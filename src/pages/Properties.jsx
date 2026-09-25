import { Link } from 'react-router-dom';
import properties from '../data/properties';
import PropertyCard from '../components/PropertyCard';

function Properties() {
  return (
    <div className="properties-page">
      <div className="properties-header">
        <Link to="/" className="properties-back">
          ← Back to Home
        </Link>

        <div className="properties-title">
          <p className="section-label">OUR PROPERTIES</p>

          <h1>All Properties</h1>

          <p>Explore our complete collection of properties in Bali.</p>
        </div>
      </div>

      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} from="/properties" />
        ))}
      </div>
    </div>
  );
}

export default Properties;
