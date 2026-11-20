export function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function maskCnic(cnic = "") {
  return cnic.replace(/^(\d{5})-(\d{7})-(\d)$/, "$1-*******-$3");
}

export function maskPhone(phone = "") {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return phone;
  return `${digits.slice(0, 4)}-${"*".repeat(digits.length - 6)}${digits.slice(-2)}`;
}

export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
