import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import {
  FiCheckCircle,
  FiMinusCircle,
  FiPauseCircle,
  FiSlash,
} from "react-icons/fi";
import Jumbotron from "../Jumbotron/jumbotron";
import { searchByMsisdn } from "../api/simCard";
import "../styles/checkSim.css";

const STATUS_INFO = {
  ACTIVE: {
    Icon: FiCheckCircle,
    color: "#16A34A",
    tint: "#DCFCE7",
    text: "#14532D",
    help: "Your SIM is working normally.",
  },
  INACTIVE: {
    Icon: FiMinusCircle,
    color: "#6B7280",
    tint: "#F3F4F6",
    text: "#374151",
    help: "Your SIM is not active right now. Contact support to activate it.",
  },
  SUSPENDED: {
    Icon: FiPauseCircle,
    color: "#F59E0B",
    tint: "#FEF3C7",
    text: "#78350F",
    help: "Your SIM is suspended. Contact support to restore it.",
  },
  BLOCKED: {
    Icon: FiSlash,
    color: "#DC2626",
    tint: "#FEE2E2",
    text: "#7F1D1D",
    help: "Your SIM is blocked. Contact support to get it reopened.",
  },
};

const digits = (s) => String(s ?? "").replace(/\D/g, "");
const sameNumber = (a, b) => digits(a).slice(-10) === digits(b).slice(-10);
const maskName = (name) =>
  String(name ?? "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0] + "****")
    .join(" ");
const formatDate = (d) => (d ? String(d).slice(0, 10) : "-");
const statusLabel = (s) => (s ? s[0] + s.slice(1).toLowerCase() : "");

const CheckSim = () => {
  const [msisdn, setMsisdn] = useState("");
  const [cnicLast4, setCnicLast4] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sim, setSim] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSim(null);

    const number = msisdn.trim();
    const last4 = digits(cnicLast4);
    if (!digits(number) || last4.length !== 4) {
      setError("Enter your mobile number and the last 4 digits of your CNIC.");
      return;
    }

    setLoading(true);
    try {
      const res = await searchByMsisdn(number);
      const candidates = Array.isArray(res.data) ? res.data : [res.data];
      const found = candidates.find(
        (s) =>
          s &&
          sameNumber(s.msisdn, number) &&
          digits(s.cnic).slice(-4) === last4,
      );

      if (!found) {
        setError("We couldn't find a SIM with these details.");
      } else {
        setSim({
          msisdn: found.msisdn,
          carrier: found.carrier,
          status: found.status,
          planType: found.planType,
          assignedTo: found.assignedTo,
          activationDate: found.activationDate,
          updatedAt: found.updatedAt,
        });
      }
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "We couldn't find a SIM with these details."
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const info = sim ? (STATUS_INFO[sim.status] ?? STATUS_INFO.INACTIVE) : null;

  return (
    <div>
      <Jumbotron>
        <h1 className="text-center fw-bold">CHECK YOUR SIM STATUS</h1>
        <p className="text-center mb-0">
          Enter your number to see your SIM details in seconds.
        </p>
      </Jumbotron>

      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="check-sim-card mb-3">
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="msisdn">Mobile number</Label>
                    <Input
                      id="msisdn"
                      inputMode="numeric"
                      placeholder="e.g. 03110007919"
                      value={msisdn}
                      onChange={(e) => setMsisdn(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="cnic4">Last 4 digits of your CNIC</Label>
                    <Input
                      id="cnic4"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="e.g. 7421"
                      value={cnicLast4}
                      onChange={(e) => setCnicLast4(e.target.value)}
                    />
                  </FormGroup>
                  <Button className="check-sim-btn w-100" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Check status"}
                  </Button>
                </Form>
              </CardBody>
            </Card>

            {error && <Alert color="danger">{error}</Alert>}

            {sim && (
              <Card
                className="check-sim-result"
                style={{
                  "--st-color": info.color,
                  "--st-tint": info.tint,
                  "--st-text": info.text,
                }}
              >
                <CardBody>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="check-sim-icon">
                      <info.Icon />
                    </div>
                    <div>
                      <div className="check-sim-num">{sim.msisdn}</div>
                      <small className="text-muted">{sim.carrier}</small>
                    </div>
                    <span
                      className={`check-sim-pill ${sim.status === "SUSPENDED" ? "check-sim-pill-dark" : ""}`}
                    >
                      {statusLabel(sim.status)}
                    </span>
                  </div>

                  <Row className="g-3 mb-3">
                    <Col xs={6}>
                      <span className="check-sim-label">Plan</span>
                      {sim.planType || "-"}
                    </Col>
                    <Col xs={6}>
                      <span className="check-sim-label">Registered to</span>
                      {maskName(sim.assignedTo) || "-"}
                    </Col>
                    <Col xs={6}>
                      <span className="check-sim-label">Activated on</span>
                      {formatDate(sim.activationDate)}
                    </Col>
                    <Col xs={6}>
                      <span className="check-sim-label">Last updated</span>
                      {formatDate(sim.updatedAt)}
                    </Col>
                  </Row>

                  <Alert color="light" className="check-sim-help mb-0">
                    {info.help}
                  </Alert>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckSim;