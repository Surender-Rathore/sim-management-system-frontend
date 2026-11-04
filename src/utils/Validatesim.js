export const validateSimForm = (data) => {
  const errors = {};

  if (!data.iccid?.trim()) {
    errors.iccid = "ICCID is required";
  } else if (!/^\d{19,22}$/.test(data.iccid.trim())) {
    errors.iccid = "ICCID must be 19-22 digits";
  }

  if (!data.cnic?.trim()) {
    errors.cnic = "CNIC is required";
  } else if (!/^\d{5}-\d{7}-\d{1}$/.test(data.cnic)) {
    errors.cnic = "CNIC must be in format 12345-1234567-1";
  }

  if (!data.msisdn?.trim()) {
    errors.msisdn = "Phone number is required";
  } else {
    const digitsOnly = data.msisdn.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.msisdn = "Phone number must be 7-15 digits";
    }
  }

  if (!data.carrier?.trim()) {
    errors.carrier = "Carrier is required";
  } else if (data.carrier.length > 60) {
    errors.carrier = "Carrier must be under 60 characters";
  }

  if (!data.planType?.trim()) {
    errors.planType = "Plan type is required";
  } else if (data.planType.length > 60) {
    errors.planType = "Plan type must be under 60 characters";
  }

  if (!data.assignedTo?.trim()) {
    errors.assignedTo = "Assigned To is required";
  } else if (data.assignedTo.length > 100) {
    errors.assignedTo = "Assigned To must be under 100 characters";
  }
  if (
    data.activationDate &&
    data.activationDate > new Date().toLocaleDateString("en-CA")
  ) {
    errors.activationDate = "Activation date cannot be in the future";
  }

  if (!data.status?.trim()) {
    errors.status = "Status is required";
  }

  return errors;
};

export const formatCnic = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
};
