import { Button } from "reactstrap";
import Jumbotron from "../Jumbotron/jumbotron";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAllSimCards } from "../api/simCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
        </Jumbotron>

        <div className="container">
          <Row className="text-center g-3 justify-content-center mb-5">
            <Col md={3} sm={6}>
              <Card
                className="shadow-sm border-1"
                style={{ borderRadius: "12px" }}
              >
                <CardBody>
                  <h6 className="text-muted mb-2">Total SIMs</h6>
                  <h2 className="fw-bold text-primary">{totalSims}</h2>
                </CardBody>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card
                className="shadow-sm border-1"
                style={{ borderRadius: "12px" }}
              >
                <CardBody>
                  <h6 className="text-muted mb-2">Active SIMs</h6>
                  <h2 className="fw-bold text-success">{activeSims}</h2>
                </CardBody>
              </Card>
            </Col>

            <Col md={3} sm={6}>
              <Card
                className="shadow-sm border-1"
                style={{ borderRadius: "12px" }}
              >
                <CardBody>
                  <h6 className="text-muted mb-2">Blocked SIMs</h6>
                  <h2 className="fw-bold text-danger">{BlockedSims}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card
                className="shadow-sm border-1"
                style={{ borderRadius: "12px" }}
              >
                <CardBody>
                  <h6 className="text-muted mb-2">Suspended SIMs</h6>
                  <h2 className="fw-bold text-danger">{SuspendedSims}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} sm={6}>
              <Card
                className="shadow-sm border-1"
                style={{ borderRadius: "12px" }}
              >
                <CardBody>
                  <h6 className="text-muted mb-2">Inactive SIMs</h6>
                  <h2 className="fw-bold text-danger">{InactiveSims}</h2>
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
