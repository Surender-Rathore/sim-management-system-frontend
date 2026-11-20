import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import "../styles/profile.css";
import PropTypes from "prop-types";
import { MOCK_USER } from "../data/mockUser";
import { useState } from "react";
import { formatDate, maskCnic } from "../utils/userFormat";
import { FiArrowLeft, FiEdit, FiEye, FiEyeOff } from "react-icons/fi"; // CHANGED: FiArrowLeft add kiya
import UserAvatar from "../components/UserAvatars";
import { Link, useLocation, useNavigate } from "react-router-dom"; // CHANGED: useLocation, useNavigate add kiye

const DetailCard =({title, rows}) =>{
  return(
    <Card className="profile-card shadow-sm h-100">
      <CardBody>
        <CardTitle tag="h5" className="mb-3">{title}</CardTitle>
        {
          rows.map((row) =>(
            <Row key={row.label} className="py-2 border-bottom align-items-center">
              <Col xs="5" className="profile-label">{row.label}</Col>
              <Col xs="7" className="text-end">{row.value}{row.action}</Col>
            </Row>
          ))
        }
      </CardBody>
    </Card>
  )
}
DetailCard.propTypes={
  title:PropTypes.string.isRequired,
  rows:PropTypes.arrayOf(
    PropTypes.shape({
      label:PropTypes.string.isRequired,
      value:PropTypes.node.isRequired,
      action:PropTypes.node,
    })
  ).isRequired,
}
const Profile = () => {
  const user = MOCK_USER;
  const [showCnic, setShowCnic] = useState(false);

  // NEW: back button ke liye
  const navigate = useNavigate();
  const location = useLocation();

  // NEW: pichle page par jao. Agar history nahi hai (seedha link khola) to Home par.
  const handleBack = () => {
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const personalRows = [
    {label:"Full name", value:user.name},
    {label:"Email", value:user.email},
    {label:"Phone", value:user.phone},
    {
      label:"CNIC",
      value: showCnic ? user.cnic : maskCnic(user.cnic),
      action:(
        <Button
        color="link"
        size="sm"
        className="p-0 ms-2"
        onClick={()=> setShowCnic(!showCnic)}
        aria-label={showCnic ? "Hide CNIC" : "Show CNIC"}
        >
          {showCnic ? <FiEyeOff /> : <FiEye />}
        </Button>
      ),
    },
  ];

  const accountRows = [
    {label:"Role", value:<Badge pill className="user-role-badge">{user.role}</Badge>},
    {label:"Employee ID", value: user.employeeId},
    {label:"Joined", value: formatDate(user.joinedAt)},
    {label:"Last login", value: new Date(user.lastLoginAt).toLocaleString("en-GB")},
  ];
  return (
    <Container className="py-4">
      {/* NEW: Back button */}
      <Button color="link" className="p-0 mb-3 text-decoration-none" onClick={handleBack}>
        <FiArrowLeft className="me-1" /> Back
      </Button>

      <Card className="profile-card shadow-sm mb-3">
        <CardBody className="d-flex flex-wrap align-items-center gap-3">
          <div className="profile-avatar-wrap">
            <UserAvatar name={user.name} src={user.avatarUrl} size={88}/>
          </div>
          <div className="flex-grow-1">
            <h4 className="mb-0">{user.name}</h4>
            <div className="profile-label mb-2">{user.email}</div>
            <Badge pill className="user-role-badge me-2">{user.role}</Badge>
            <Badge pill color="success">Active</Badge>
          </div>
          <Button color="primary" outline tag={Link} to="/settings">
            <FiEdit className="me-1"/> Edit Profile
          </Button>
        </CardBody>
      </Card>
      <Row className="g-3">
        <Col md="6">
          <DetailCard title="Personal details" rows={personalRows}/>
        </Col>
        <Col md="6">
          <DetailCard title="Accounts" rows={accountRows}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile