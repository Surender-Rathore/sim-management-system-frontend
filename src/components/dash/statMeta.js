import {
  FiCheckCircle,
  FiLayers,
  FiMinusCircle,
  FiPauseCircle,
  FiSlash,
} from "react-icons/fi";

export const STAT_META = [
  { key: "TOTAL", label: "Total", Icon: FiLayers, color: "#0EA5E9", tint: "#E0F2FE" },
  { key: "ACTIVE", label: "Active", Icon: FiCheckCircle, color: "#16A34A", tint: "#DCFCE7" },
  { key: "INACTIVE", label: "Inactive", Icon: FiMinusCircle, color: "#6B7280", tint: "#F3F4F6" },
  { key: "SUSPENDED", label: "Suspended", Icon: FiPauseCircle, color: "#F59E0B", tint: "#FEF3C7" },
  { key: "BLOCKED", label: "Blocked", Icon: FiSlash, color: "#DC2626", tint: "#FEE2E2" },
];