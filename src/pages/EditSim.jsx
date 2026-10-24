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
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getSimCardById, updateSimCard } from "../api/simCard";
import { formatCnic, validateSimForm } from "../utils/Validatesim";
import "../styles/form-ui.css";

const EditSim = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [simData, setSimData] = useState({
    iccid: "",
    cnic: "",
    msisdn: "",
    carrier: "",
    planType: "",
    status: "",
    assignedTo: "",
    activationDate: "",
  });

  useEffect(() => {
    getSimCardById(id)
      .then((res) => setSimData(res.data))
      .catch(() => toast.error("Failed to load SIM details!"));
  }, [id]);
  const [errors, setErrors] = useState({})

  const handleFieldChange = (field, rawValue) =>{

    if(field === "activationDate") return;

    const value = field === "cnic" ? formatCnic(rawValue) : rawValue;
    const updated = {...simData, [field] : value};

    setSimData(updated);

    const fieldErrors = validateSimForm(updated);
    setErrors((prev) => ({ ...prev, [field]:fieldErrors[field]}));
  }

  const handleSubmit = () => {
    const validationErrors = validateSimForm(simData);
    console.log("Validation errors:", validationErrors); 
    setErrors(validationErrors);

    if(Object.keys(validationErrors).length>0){
      toast.error("Please fix the highlighted fields")
      return;
    }


    updateSimCard(id, simData)
      .then(() => {
        toast.success("Updated Successfully!");
        navigate("/");
      })
      .catch(() => toast.error("Failed to update SIM details!"));
  };

  return (
    <div>
      <Jumbotron>
        <h1 className="text-center fw-bold">EDIT SIM DETAILS</h1>
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
            <h1 className="text-center">Edit Your SIM Detail</h1>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup rclassName="sim-form-group">
                <Label for="iccid" className="sim-form-label">
                  ICCID
                </Label>
                <Col>
                  <Input
                    id="iccid"
                    type="text"
                    maxLength={22}
                    value={simData.iccid ?? ""}
                    onChange={(e) =>
                      handleFieldChange("iccid", e.target.value)
                    }
                    invalid={!!errors.iccid}
                  />
                  <FormFeedback>{errors.iccid}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup rclassName="sim-form-group">
                <Label for="cnic" className="sim-form-label">
                  CNIC
                </Label>
                <Col>
                  <Input
                    id="cnic"
                    type="text"
                    placeholder="42302-1234567-1"
                    value={simData.cnic ?? ""}
                    onChange={(e) =>
                      handleFieldChange("cnic", e.target.value)
                    }
                    invalid={!!errors.cnic}
                  />

                  <FormFeedback>{errors.cnic}</FormFeedback>
                </Col>
              </FormGroup>

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
                    value={simData.msisdn ?? ""}
                    onChange={(e) =>
                      handleFieldChange("msisdn", e.target.value)
                    }
                    invalid={!!errors.msisdn}
                  />

                  <FormFeedback>{errors.msisdn}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup className="sim-form-group">
                <Label for="carrier" className="sim-form-label">
                  Carrier
                </Label>
                <Col>
                  <Input
                    id="carrier"
                    type="text"
                    maxLength={60}
                    value={simData.carrier ?? ""}
                    onChange={(e) =>

                      handleFieldChange("carrier", e.target.value)
                    }
                    invalid={!!errors.carrier}
                  />

                  <FormFeedback>{errors.carrier}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup className="sim-form-group">
                <Label for="planType" className="sim-form-label">
                  Plan Type
                </Label>
                <Col>
                  <Input
                    id="planType"
                    type="text"
                    maxLength={60}
                    value={simData.planType ?? ""}
                    onChange={(e) =>
                      handleFieldChange("planType", e.target.value)
                    }
                    invalid={!!errors.planType}
                  />
                  <FormFeedback>{errors.planType}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup className="sim-form-group">
                <Label for="assignedTo" className="sim-form-label">
                  Assigned To
                </Label>
                <Col>
                  <Input
                    id="assignedTo"
                    type="text"
                    maxLength={100}
                    value={simData.assignedTo ?? ""}
                    onChange={(e) =>
                      handleFieldChange("assignedTo", e.target.value)
                    }
                    invalid={!!errors.assignedTo}
                  />

                  <FormFeedback>{errors.assignedTo}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup className="sim-form-group">
                <Label for="activationDate" className="sim-form-label">
                  Activation Date
                </Label>
                <Col>
                  <Input
                    id="activationDate"
                    type="date"
                    value={simData.activationDate ?? ""}
                    readOnly
                    disabled
                    style={{
                      backgroundColor : "#e9ecef", cursor:"not-allowed"
                    }}
                  />
                  <small className="text-muted">Activation date can not be changed after registration</small>
                </Col>
              </FormGroup>

              <FormGroup className="sim-form-group">
                <Label for="status" className="sim-form-label">
                  Status
                </Label>
                <Col>
                  <Input
                    id="status"
                    type="select"
                    className="w-100"
                    value={simData.status ?? ""}
                    onChange={(e) =>
                      handleFieldChange("status", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="BLOCKED">Blocked</option>
                    <option value="SUSPENDED">Suspended</option>
                  </Input>
                </Col>
              </FormGroup>

              <div className="sim-form-actions">
                <Button type="button" color="success" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EditSim;
