import { useState } from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const BADGE_COLOR = {
  ACTIVE: "success",
  INACTIVE: "secondary",
  SUSPENDED: "warning",
  BLOCKED: "danger",
};

const digits = (s) => String(s ?? "").replace(/\D/g, "");

const statusLabel = (status) =>
  status ? status[0] + status.slice(1).toLowerCase() : "";

const LatestSims = ({ sims }) => {
  const [query, setQuery] = useState("");
  const q = digits(query);

  if (!sims.length) return null;

  const list = sims
    .filter((s) => !q || digits(s.msisdn).includes(q))
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, q ? 8 : 5);

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h6">Latest added SIMs</CardTitle>
        <Input
          inputMode="numeric"
          placeholder="Search by number, e.g. 4915"
          aria-label="Search by number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ListGroup flush className="mt-2">
          {list.length === 0 ? (
            <ListGroupItem className="px-0 text-muted">
              No SIM found for this number.
            </ListGroupItem>
          ) : (
            list.map((s) => (
              <ListGroupItem
                key={s.id}
                className="d-flex align-items-center flex-wrap gap-3 px-0"
              >
                <span className="dash-mono">{s.msisdn}</span>
                <span className="text-muted">{s.carrier}</span>
                <span className="text-muted">{s.assignedTo}</span>
                <span className="text-muted">
                  {String(s.createdAt).slice(0, 10)}
                </span>
                <Badge
                  className={`ms-auto ${s.status === "SUSPENDED" ? "text-dark" : ""}`}
                  color={BADGE_COLOR[s.status] ?? "secondary"}
                >
                  {statusLabel(s.status)}
                </Badge>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

LatestSims.propTypes = {
  sims: PropTypes.array.isRequired,
};

export default LatestSims;