// utils/validateSim.js

export const validateSimForm = (data) => {
  const errors = {};

  // ICCID: required, 19-22 digits
  if (!data.iccid?.trim()) {
    errors.iccid = "ICCID is required";
  } else if (!/^\d{19,22}$/.test(data.iccid)) {
    errors.iccid = "ICCID must be 19-22 digits";
  }

  // CNIC: required, format 12345-1234567-1
  if (!data.cnic?.trim()) {
    errors.cnic = "CNIC is required";
  } else if (!/^\d{5}-\d{7}-\d{1}$/.test(data.cnic)) {
    errors.cnic = "CNIC must be in format 12345-1234567-1";
  }

  // MSISDN: required, 7-15 digits (any country code allowed, digits only counted)
  if (!data.msisdn?.trim()) {
    errors.msisdn = "Phone number is required";
  } else {
    const digitsOnly = data.msisdn.replace(/\D/g, ""); // strip +, spaces, dashes
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errors.msisdn = "Phone number must be 7-15 digits";
    }
  }

  // Carrier: required, max 60 chars
  if (!data.carrier?.trim()) {
    errors.carrier = "Carrier is required";
  } else if (data.carrier.length > 60) {
    errors.carrier = "Carrier must be under 60 characters";
  }

  // Plan Type: required, max 60 chars
  if (!data.planType?.trim()) {
    errors.planType = "Plan type is required";
  } else if (data.planType.length > 60) {
    errors.planType = "Plan type must be under 60 characters";
  }

  // Assigned To: required, max 100 chars
  if (!data.assignedTo?.trim()) {
    errors.assignedTo = "Assigned To is required";
  } else if (data.assignedTo.length > 100) {
    errors.assignedTo = "Assigned To must be under 100 characters";
  }

  // Activation Date: cannot be in the future
  if (data.activationDate) {
    const selected = new Date(data.activationDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // allow up to end of today

    if (selected > today) {
      errors.activationDate = "Activation date cannot be in the future";
    }
  }

  // Status: required
  if (!data.status?.trim()) {
    errors.status = "Status is required";
  }

  return errors; // empty object = no errors
};

// Formats raw digits into CNIC pattern as the user types: 12345-1234567-1
export const formatCnic = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
};
