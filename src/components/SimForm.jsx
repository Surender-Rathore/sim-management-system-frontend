import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
  Spinner,
} from "reactstrap";
import { formatCnic, validateSimForm } from "../utils/Validatesim";
import "../styles/form-ui.css";

const TEXT_FIELDS = [
  { name: "iccid", label: "ICCID", maxLength: 22 },
  {
    name: "cnic",
    label: "CNIC",
    maxLength: 15,
    placeholder: "44123-1234567-1",
  },
  {
    name: "msisdn",
    label: "Phone No",
    maxLength: 20,
    placeholder: "+92 336 3205846",
  },
  { name: "carrier", label: "Carrier", maxLength: 60 },
  { name: "planType", label: "Plan Type", maxLength: 60 },
  { name: "assignedTo", label: "Assigned To", maxLength: 100 },
];
const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BLOCKED", label: "Blocked" },
  { value: "SUSPENDED", label: "Suspended" },
];

const SimForm = ({
  heading,
  initialValues,
  activationHint,
  submitLabel,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (field, rawValue) => {
    const value = field === "cnic" ? formatCnic(rawValue) : rawValue;
    const updated = { ...values, [field]: value };
    setValues(updated);
    setErrors((prev) => ({
      ...prev,
      [field]: validateSimForm(updated)[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSimForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="sim-form-card">
      <CardHeader className="sim-form-header">
        <CloseButton
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => navigate("/")}
          className="float-end border-0 bg-transparent"
        />
        <h1 className="text-center">{heading}</h1>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} noValidate>
          {TEXT_FIELDS.map(({ name, label, ...inputProps }) => (
            <FormGroup className="sim-form-group" key={name}>
              <Label for={name} className="sim-form-label">
                {label}
              </Label>
              <Col>
                <Input
                  id={name}
                  type="text"
                  value={values[name] ?? ""}
                  onChange={(e) => handleFieldChange(name, e.target.value)}
                  invalid={!!errors[name]}
                  {...inputProps}
                />
                <FormFeedback>{errors[name]}</FormFeedback>
              </Col>
            </FormGroup>
          ))}

          <FormGroup className="sim-form-group">
            <Label for="activationDate" className="sim-form-label">
              Activation Date
            </Label>
            <Col>
              <Input
                id="activationDate"
                type="date"
                value={values.activationDate ?? ""}
                disabled
                invalid={!!errors.activationDate}
                style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
              />
              <FormFeedback>{errors.activationDate}</FormFeedback>
              <small className="text-muted">{activationHint}</small>
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
                value={values.status ?? ""}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                invalid={!!errors.status}
              >
                <option value="" disabled>
                  Select Status
                </option>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Input>
              <FormFeedback>{errors.status}</FormFeedback>
            </Col>
          </FormGroup>

          <div className="sim-form-actions">
            <Button color="success" type="submit" disabled={saving}>
              {saving ? <Spinner size="sm" /> : submitLabel}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

SimForm.propTypes = {
  heading: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  activationHint: PropTypes.string.isRequired,
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SimForm;
