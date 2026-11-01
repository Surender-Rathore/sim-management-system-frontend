import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap"

const StatCard = ({label, value, Icon, tone}) => {
  return (
    <Col lg md={4} sm={6} className="d-flex">
        <Card className="home-stat-card">
                <CardBody>
                        <div className={`home-stat-icon icon-${tone}`}>
                                <Icon />
                        </div>
                        <h6 className="text-muted mb-2">{label}</h6>
                        <h2 className={`fw-bold num-${tone}`}>{value}</h2>
                </CardBody>
        </Card>
    </Col>
  );
};

StatCard.propTypes = {
        label:PropTypes.string.isRequired,
        value:PropTypes.number.isRequired,
        Icon:PropTypes.elementType.isRequired,
        tone:PropTypes.string.isRequired,
}

export default StatCard