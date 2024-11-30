import PropTypes from 'prop-types';

const AmenitiesItem = ({ icon, label }) => {
  return (
    <div
      className="flex flex-col justify-center items-center bg-white shadow-lg mt-2 mb-2 p-2 rounded-full transition-all duration-300 amenity-hover"
      style={{
        width: '200px',
        height: '200px',
      }}
    >
      {/* Icono centrado */}
      <i className={`${icon} text-4xl text-decorativo mb-4`}></i>
      {/* Texto centrado */}
      <div className="text-center">
        <h3 className="font-semibold text-Royal text-xl leading-snug">{label}</h3>
      </div>
    </div>
  );
};

AmenitiesItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default AmenitiesItem;
