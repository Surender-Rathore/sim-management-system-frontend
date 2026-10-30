import PropTypes from 'prop-types';

const Jumbotron = ({ tag: Tag = 'div', fluid = true, className = '', children, ...props }) => {
  // Video me ye poori screen cover kar raha hai (fluid), isliye corners sharp (rounded-0) rakhenge
  const fluidClass = fluid ? 'container-fluid rounded-0' : 'rounded-3';

  return (
    <Tag 
      // py-5 se top-bottom padding achhi ho jayegi, text-start se text left side par rahega
      className={`hero-banner py-5 px-4 mb-4 text-start ${fluidClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

Jumbotron.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  fluid: PropTypes.bool,
  className: PropTypes.string
};

export default Jumbotron;
