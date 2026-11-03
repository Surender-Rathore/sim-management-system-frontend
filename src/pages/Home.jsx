import { Alert, Button, Col, Container, Row } from "reactstrap";
import Jumbotron from "../Jumbotron/jumbotron";
import { useNavigate } from "react-router-dom";
import { getAllSimCards } from "../api/simCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../styles/home.css";
import { FiList, FiPlusCircle } from "react-icons/fi";
import { STAT_META } from "./../components/dash/statMeta";
import StatCard from "../components/dash/StatCard";
import StatusDonut from "../components/dash/StatusDonut";
import CarrierBars from "../components/dash/CarrierBars";
import LatestSims from "../components/dash/LatestSims";

const CARRIER_FIELD = "carrier";
const getGreeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
};

const Home = () => {
  const navigate = useNavigate();
  const [simData, setSimData] = useState([]);

  useEffect(() => {
    getAllSimCards()
      .then((res) => setSimData(res.data))
      .catch(() => toast.error("Failed to load SIM data!!"));
  }, []);

  const countByStatus = (status) =>
    status === "TOTAL"
      ? simData.length
      : simData.filter((sim) => sim.status === status).length;

  const blocked = countByStatus("BLOCKED");
  const suspended = countByStatus("SUSPENDED");

  const donutData = STAT_META.filter((m) => m.key !== "TOTAL").map((m) => ({
    label: m.label,
    color: m.color,
    n: countByStatus(m.key),
  }));

  const carriers = [
    ...new Set(simData.map((s) => s[CARRIER_FIELD]).filter(Boolean)),
  ];
  const carrierData = carriers.map((label) => ({
    label,
    value: simData.filter((s) => s[CARRIER_FIELD] === label).length,
  }));
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <Jumbotron>
        <h1 className="text-center fw-bold">
          WELCOME TO SIM MANAGEMENT SYSTEM
        </h1>
        <p className="home-hero-sub">
          Track, manage and control every SIM from one place.
        </p>
      </Jumbotron>

      <Container className="pb-3">
        <div className="dash-greeting">
          <h2>{getGreeting()}</h2>
          <p>
            {today} · {simData.length} SIMs in the system
          </p>
        </div>

        <Row className="dash-stat-row text-center justify-content-center mb-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
          {STAT_META.map(({ key, label, Icon, color, tint }) => (
            <StatCard
              key={key}
              label={label}
              value={countByStatus(key)}
              Icon={Icon}
              color={color}
              tint={tint}
            />
          ))}
        </Row>

        {blocked + suspended > 0 && (
          <Alert color="warning">
            {blocked} blocked and {suspended} suspended SIMs.
          </Alert>
        )}

        <Row className="g-3 mb-3">
          <Col md={6}>
            <StatusDonut data={donutData} total={simData.length} />
          </Col>
          <Col md={6}>
            <CarrierBars data={carrierData} />
          </Col>
        </Row>
        <LatestSims sims={simData} />
      </Container>

      <hr className="my-4" style={{ width: "80%", margin: "20px auto" }} />

      <div className="text-center my-4">
        <p className="text-muted mb-3">Quick Actions</p>
      </div>

      <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
        <Button
          color="success"
          className="home-action-btn"
          onClick={() => navigate(`/sim-list`)}
        >
          <FiList /> View All SIMs
        </Button>
        <Button
          color="primary"
          className="home-action-btn"
          onClick={() => navigate(`/add-sim`)}
        >
          <FiPlusCircle /> Register New Sim
        </Button>
      </div>
    </div>
  );
};

export default Home;
