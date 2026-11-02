import {
  FiCheckCircle,
  FiMinusCircle,
  FiPauseCircle,
  FiSlash,
  FiSmartphone,
} from "react-icons/fi";

export const STAT_META = [
  { key: "TOTAL", label: "Total SIMs", Icon: FiSmartphone },
  { key: "ACTIVE", label: "Active SIMs", Icon: FiCheckCircle },
  { key: "BLOCKED", label: "Blocked SIMs", Icon: FiSlash },
  { key: "SUSPENDED", label: "Suspended SIMs", Icon: FiPauseCircle },
  { key: "INACTIVE", label: "Inactive SIMs", Icon: FiMinusCircle },
];
