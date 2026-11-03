import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import Jumbotron from "../Jumbotron/jumbotron";
import { searchByMsisdn } from "../api/simCard";
import "../styles/checkSim.css";

const STATUS_INFO = {
  ACTIVE: {
    color: "success",
    line: "#16A34A",
    help: "Your SIM is working normally.",
  },
  INACTIVE: {
    color: "secondary",
    line: "#6B7280",
    help: "Your SIM is not active right now. Contact support to activate it.",
  },
  SUSPENDED: {
    color: "warning",
    line: "#F59E0B",
    help: "Your SIM is suspended. Contact support to restore it.",
  },
  BLOCKED: {
    color: "danger",
    line: "#DC2626",
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
          digits(s.cnic).slice(-4) === last4
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
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const info = sim ? STATUS_INFO[sim.status] ?? STATUS_INFO.INACTIVE : null;

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
            <Card className="mb-3">
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
                  <Button color="primary" className="w-100" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Check status"}
                  </Button>
                </Form>
              </CardBody>
            </Card>

            {error && <Alert color="danger">{error}</Alert>}

            {sim && (
              <Card
                className="check-sim-result"
                style={{ borderTopColor: info.line }}
              >
                <CardBody>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div>
                      <CardTitle tag="h5" className="mb-0 check-sim-num">
                        {sim.msisdn}
                      </CardTitle>
                      <small className="text-muted">{sim.carrier}</small>
                    </div>
                    <Badge
                      className={`ms-auto ${sim.status === "SUSPENDED" ? "text-dark" : ""}`}
                      color={info.color}
                    >
                      {statusLabel(sim.status)}
                    </Badge>
                  </div>

                  <Row className="g-3 mb-3">
                    <Col xs={6}>
                      <small className="text-muted d-block">Plan</small>
                      {sim.planType || "-"}
                    </Col>
                    <Col xs={6}>
                      <small className="text-muted d-block">Registered to</small>
                      {maskName(sim.assignedTo) || "-"}
                    </Col>
                    <Col xs={6}>
                      <small className="text-muted d-block">Activated on</small>
                      {formatDate(sim.activationDate)}
                    </Col>
                    <Col xs={6}>
                      <small className="text-muted d-block">Last updated</small>
                      {formatDate(sim.updatedAt)}
                    </Col>
                  </Row>

                  <Alert color={info.color} className="mb-0">
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