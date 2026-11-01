import {
  FiCheckCircle,
  FiMinusCircle,
  FiPauseCircle,
  FiSlash,
  FiSmartphone,
} from "react-icons/fi";

export const STAT_META = [
  { key: "TOTAL", label: "Total SIMs", icon: FiSmartphone },
  { key: "ACTIVE", label: "Active SIMs", icon: FiCheckCircle },
  { key: "BLOCKED", label: "Blocked SIMs", icon: FiSlash },
  { key: "SUSPENDED", label: "Suspended SIMs", icon: FiPauseCircle },
  { key: "INACTIVE", label: "Inactive SIMs", icon: FiMinusCircle },
];
