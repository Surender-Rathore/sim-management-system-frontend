import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

const HEADERS = [
  "Number",
  "Carrier",
  "Status",
  "Assigned to",
  "Plan",
  "Activation date",
  "Added on",
];

const esc = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
};

const toRow = (s) => [
  s.msisdn,
  s.carrier,
  s.status,
  s.assignedTo,
  s.planType,
  s.activationDate,
  String(s.createdAt ?? "").slice(0, 10),
];

const downloadCsv = (sims, name) => {
  if (!sims.length) {
    toast.error("There are no SIMs available to export.");
    return;
  }

  const body = [HEADERS, ...sims.map(toRow)]
    .map((r) => r.map(esc).join(","))
    .join("\r\n");

  const url = URL.createObjectURL(
    new Blob(["\uFEFF" + body], { type: "text/csv;charset=utf-8;" })
  );

  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const ExportReports = ({ sims }) => {
  const blocked = sims.filter((s) => s.status === "BLOCKED");

  return (
    <Card className="dash-export">
      <CardBody>
        <CardTitle tag="h6">Export reports</CardTitle>
        <p className="text-muted mb-3" style={{ fontSize: 13 }}>
          A CSV file will be downloaded. You can open it in Excel.
        </p>
        <div className="d-flex gap-2 flex-wrap">
          <Button
            outline
            color="secondary"
            onClick={() => downloadCsv(sims, "all-sims")}
          >
            All SIMs ({sims.length})
          </Button>
          <Button
            outline
            color="secondary"
            onClick={() => downloadCsv(blocked, "blocked-sims")}
          >
            Blocked only ({blocked.length})
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

ExportReports.propTypes = {
  sims: PropTypes.array.isRequired,
};

export default ExportReports;