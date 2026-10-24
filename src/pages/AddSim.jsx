import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Jumbotron from "../Jumbotron/jumbotron";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createSimCard } from "../api/simCard";
import { formatCnic, validateSimForm } from "../utils/Validatesim";
import "../styles/form-ui.css";

const AddSim = () => {
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split("T")[0];

  const [newSim, setNewSim] = useState({
    iccid: "",
    cnic: "",
    msisdn: "",
    carrier: "",
    planType: "",
    status: "",
    assignedTo: "",
    activationDate: todayStr,
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, rawValue) => {
    const value = field === "cnic" ? formatCnic(rawValue) : rawValue;

    const updated = {
      ...newSim,
      [field]: value,
    };

    setNewSim(updated);

    const fieldErrors = validateSimForm(updated);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleAddSim = () => {
    const validationErrors = validateSimForm(newSim);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlited fields");
      return;
    }

    createSimCard(newSim)
      .then(() => {
        toast.success("SIM Added Successfully!");
        navigate("/");
      })
      .catch((err) => {
        const message = err?.response?.data?.detail || "Failed to add SIM!";
        toast.error(message);
      });
  };

  return (
    <div>
      <Jumbotron>
        <h1 className="text-center fw-bold">REGISTER NEW SIM</h1>
      </Jumbotron>
      <div
        className="container"
        style={{
          overflowX: "hidden",
        }}
      >
        <Card
          className="sim-form-card"
        >
          <CardHeader className="sim-form-header">
            <CloseButton
              style={{
                color: "red",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
              className="float-end border-0 bg-transparent"
            />
            <h1 className="text-center">Add Your SIM Details</h1>
          </CardHeader>
          <CardBody>
            {/* ICCID Field */}
            <Form>
              <FormGroup className="sim-form-group">
                <Label for="iccid" className="sim-form-label">
                  ICCID
                </Label>
                <Col>
                  <Input
                    id="iccid"
                    type="text"
                    maxLength={22}
                    value={newSim.iccid}
                    onChange={(e) => handleFieldChange("iccid", e.target.value)}
                    invalid={!!errors.iccid}
                  />
                  <FormFeedback>{errors.iccid}</FormFeedback>
                </Col>
              </FormGroup>
              </Form>
            {/* cnic Field */}
            <Form>
              <FormGroup className="sim-form-group">
                <Label for="cnic" className="sim-form-label">
                  CNIC
                </Label>
                <Col>
                  <Input
                    id="cnic"
                    type="text"
                    maxLength={15}
                    placeholder="44123-1234567-1"
                    value={newSim.cnic}
                    onChange={(e) => handleFieldChange("cnic", e.target.value)}
                    invalid={!!errors.cnic}
                  />
                  <FormFeedback>{errors.cnic}</FormFeedback>
                </Col>
              </FormGroup>

              {/* MSISDN Field */}

              <FormGroup className="sim-form-group">
                <Label for="msisdn" className="sim-form-label">
                  Phone No
                </Label>
                <Col>
                  <Input
                    id="msisdn"
                    type="text"
                    placeholder="+92 336 3205846"
                    maxLength={20}
                    value={newSim.msisdn}
                    onChange={(e) =>
                      handleFieldChange("msisdn", e.target.value)
                    }
                    invalid={!!errors.msisdn}
                  />
                  <FormFeedback>{errors.msisdn}</FormFeedback>
                </Col>
              </FormGroup>

              {/* Carrier Field */}
              <FormGroup className="sim-form-group">
                <Label for="carrier" className="sim-form-label">
                  Carrier
                </Label>
                <Col>
                  <Input
                    id="carrier"
                    type="text"
                    maxLength={60}
                    value={newSim.carrier}
                    onChange={(e) =>
                      handleFieldChange("carrier", e.target.value)
                    }
                    invalid={!!errors.carrier}
                  />
                  <FormFeedback>{errors.carrier}</FormFeedback>
                </Col>
              </FormGroup>

              {/* Plan Type */}
              <FormGroup className="sim-form-group">
                <Label for="planType" className="sim-form-label">
                  Plan Type
                </Label>
                <Col>
                  <Input
                    id="planType"
                    type="text"
                    maxLength={60}
                    value={newSim.planType}
                    onChange={(e) =>
                      handleFieldChange("planType", e.target.value)
                    }
                    invalid={!!errors.planType}
                  />
                  <FormFeedback>{errors.planType}</FormFeedback>
                </Col>
              </FormGroup>

              {/* Assigned To Field */}
              <FormGroup className="sim-form-group">
                <Label for="assignedTo" className="sim-form-label">
                  Assigned To
                </Label>
                <Col>
                  <Input
                    id="assignedTo"
                    type="text"
                    maxLength={100}
                    value={newSim.assignedTo}
                    onChange={(e) =>
                      handleFieldChange("assignedTo", e.target.value)
                    }
                    invalid={!!errors.assignedTo}
                  />
                  <FormFeedback>{errors.assignedTo}</FormFeedback>
                </Col>
              </FormGroup>

              {/* Activation date Field */}
              <FormGroup className="sim-form-group">
                <Label for="activationDate" className="sim-form-label">
                  Activation Date
                </Label>
                <Col>
                  <Input
                    id="activationDate"
                    type="date"
                    max={todayStr}
                    value={newSim.activationDate}
                    readOnly
                    disabled
                    style={{
                      backgroundColor: "#e9ecef",
                      cursor: "not-allowed",
                    }}
                  />
                  <small className="text-muted">
                    Automatically set to today's date
                  </small>
                </Col>
              </FormGroup>

              {/* Status Field  */}

              <FormGroup className="sim-form-group">
                <Label for="status" className="sim-form-label">
                  Status
                </Label>

                <Col>
                  <Input
                    id="status"
                    type="select"
                    className="w-100"
                    value={newSim.status}
                    onChange={(e) =>
                      handleFieldChange("status", e.target.value)
                    }
                    invalid={!!errors.status}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="BLOCKED">Blocked</option>
                    <option value="SUSPENDED">Suspended</option>
                  </Input>
                  <FormFeedback>{errors.status}</FormFeedback>
                </Col>
              </FormGroup>
              {/* Button */}
              <div className="sim-form-actions">
                <Button type="button" color="success" onClick={handleAddSim}>
                  Add SIM
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/*  */}
      </div>
    </div>
  );
};

export default AddSim;
