import PropTypes from "prop-types";
import { Card, CardBody, CardTitle } from "reactstrap";
import { PieChart, Pie, Tooltip } from "recharts";

const StatusDonut = ({ data, total }) => {
  if (!total) return null;

  const visible = data
    .filter((d) => d.n > 0)
    .map((d) => ({ ...d, fill: d.color }));

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h6">Status breakdown</CardTitle>
        <div className="dash-donut-body">
          <div className="dash-donut-wrap">
            <PieChart width={180} height={180}>
              <Pie
                data={visible}
                dataKey="n"
                nameKey="label"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                cornerRadius={6}
                stroke="none"
              />
              <Tooltip />
            </PieChart>
            <div className="dash-donut-center">
              <b>{total}</b>
              <span>SIMs</span>
            </div>
          </div>
          <div className="dash-donut-legend">
            {visible.map((d) => (
              <span key={d.label}>
                <i style={{ color: d.color }}>&#9679;</i> {d.label} {d.n}
              </span>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

StatusDonut.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};

export default StatusDonut;