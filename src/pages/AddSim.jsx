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
          className="mx-auto"
          color="dark"
          outline
          style={{
            width: "100%",
            maxWidth: "40rem",
          }}
        >
          <CardHeader style={{ backgroundColor: "#57d3e4" }}>
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
              <FormGroup row className="justify-content-center">
                <Label for="iccid" className="mx-2" sm={2}>
                  ICCID
                </Label>
                <Col sm={6}>
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
              <FormGroup row className="justify-content-center">
                <Label for="cnic" className="mx-2" sm={2}>
                  CNIC
                </Label>
                <Col sm={6}>
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

              <FormGroup row className="justify-content-center">
                <Label for="msisdn" sm={2} className="mx-2">
                  Phone No
                </Label>
                <Col sm={6}>
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
              <FormGroup row className="justify-content-center">
                <Label for="carrier" sm={2} className="mx-2">
                  Carrier
                </Label>
                <Col sm={6}>
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
              <FormGroup row className="justify-content-center">
                <Label for="planType" sm={2} className="mx-2">
                  Plan Type
                </Label>
                <Col sm={6}>
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
              <FormGroup row className="justify-content-center">
                <Label for="assignedTo" sm={2} className="mx-2">
                  Assigned To
                </Label>
                <Col sm={6}>
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
              <FormGroup row className="justify-content-center">
                <Label for="activationDate" sm={2} className="mx-2">
                  Activation Date
                </Label>
                <Col sm={6}>
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

              <FormGroup row className="justify-content-center">
                <Label for="status" className="mx-2" sm={2}>
                  Status
                </Label>

                <Col sm={6}>
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
              <div className="text-center">
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
