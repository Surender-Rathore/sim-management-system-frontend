import { Button } from "reactstrap";
import Jumbotron from "../Jumbotron/jumbotron";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAllSimCards } from "../api/simCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../styles/home.css"
import { FiCheckCircle, FiMinusCircle, FiPauseCircle, FiSlash, FiSmartphone } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();

  const [simData, setSimData] = useState([])

  useEffect(()=>{
    getAllSimCards().then((res)=> setSimData(res.data)).catch(()=> toast.error("Failed to load SIM data!!"))
  },[])
  const totalSims = simData.length;
  const activeSims = simData.filter((sim) => sim.status === "ACTIVE").length;
  const BlockedSims = simData.filter((sim)=> sim.status === "BLOCKED").length;
  const SuspendedSims = simData.filter((sim)=> sim.status === "SUSPENDED").length;
  const InactiveSims = simData.filter(
    (sim) => sim.status === "INACTIVE",
  ).length;
  return (
    <div>
      <div>
        <Jumbotron>
          <h1 className="text-center fw-bold">
            WELCOME TO SIM MANAGEMENT SYSTEM
          </h1>
          <p className="home-hero-sub">
            Track, manage and control every SIM from one place.
          </p>
        </Jumbotron>

        <div className="container">
          <Row className="text-center g-3 justify-content-center mb-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
            <Col lg md={4} sm={6} className="d-flex">
              <Card
                className="home-stat-card"
              >
                <CardBody>
                  <div className="home-stat-icon icon-total">
                    <FiSmartphone />
                  </div>
                  <h6 className="text-muted mb-2">Total SIMs</h6>
                  <h2 className="fw-bold num-total">{totalSims}</h2>
                </CardBody>
              </Card>
            </Col>

            <Col lg md={4} sm={6} className="d-flex">
              <Card
                className="home-stat-card"
              >
                <CardBody>
                  <div className="home-stat-icon icon-active">
                    <FiCheckCircle />
                  </div>
                  <h6 className="text-muted mb-2">Active SIMs</h6>
                  <h2 className="fw-bold num-active">{activeSims}</h2>
                </CardBody>
              </Card>
            </Col>

            <Col lg md={4} sm={6} className="d-flex">
              <Card
                className="home-stat-card"
              >
                <CardBody>
                  <div className="home-stat-icon icon-blocked">
                    <FiSlash />
                  </div>
                  <h6 className="text-muted mb-2">Blocked SIMs</h6>
                  <h2 className="fw-bold num-blocked">{BlockedSims}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col lg md={4} sm={6} className="d-flex">
              <Card
                className="home-stat-card"
              >
                <CardBody>
                  <div className="home-stat-icon icon-suspended">
                    <FiPauseCircle />
                  </div>
                  <h6 className="text-muted mb-2">Suspended SIMs</h6>
                  <h2 className="fw-bold num-suspended">{SuspendedSims}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col lg md={4} sm={6} className="d-flex">
              <Card
                className="home-stat-card"
              >
                <CardBody>
                  <div className="home-stat-icon icon-inactive">
                    <FiMinusCircle />
                  </div>
                  <h6 className="text-muted mb-2">Inactive SIMs</h6>
                  <h2 className="fw-bold num-inactive">{InactiveSims}</h2>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <hr className="my-4" style={{ width: "80%", margin: "20px auto" }} />

        <p className="text-center text-muted my-3">
          Manage your SIM inventory below
        </p>

        <div className="text-center my-4">
          <hr style={{ width: "60%", margin: "0 auto 15px" }} />
          <p className="text-muted mb-3">Quick Actions</p>
        </div>

        <div className="text-center">
          <Button color="success" onClick={() => navigate(`/sim-list`)}>
            View All SIMs
          </Button>
          <Button
            className="ms-2"
            color="primary"
            onClick={() => navigate(`/add-sim`)}
          >
            Register New Sim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
