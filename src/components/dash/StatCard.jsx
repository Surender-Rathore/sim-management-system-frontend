import PropTypes from "prop-types";
import { Col } from "reactstrap"

const StatCard = ({label, value, Icon, color, tint}) => {
  return (
    <Col lg md={4} sm={6} className="d-flex">
        <div
        className="dash-stat-card"
        style={{
                "--stat-color":color, "--stat-tint":tint
        }}
        >
                <div className="dash-stat-icon">
                        <Icon size={20}/>
                </div>
                <div className="dash-stat-value">{value}</div>
                <div className="dash-stat-label">{label}</div>

        </div>
    </Col>
  );
};

StatCard.propTypes = {
        label:PropTypes.string.isRequired,
        value:PropTypes.number.isRequired,
        Icon:PropTypes.elementType.isRequired,
        color:PropTypes.string.isRequired,
        tint:PropTypes.string.isRequired,
}

export default StatCard