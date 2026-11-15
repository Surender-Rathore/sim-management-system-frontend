import PropTypes from "prop-types";
import { Card, CardBody, CardTitle } from "reactstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0EA5E9", "#6366F1", "#14B8A6", "#F59E0B", "#EC4899"];
const OTHERS_COLOR = "#94A3B8";
const MAX_BARS = 5;

const CarrierBars = ({ data }) => {
  if (!data.length) return null;

  const sorted = [...data].sort((a, b) => b.value - a.value);
  const top = sorted.slice(0, MAX_BARS);
  const restTotal = sorted.slice(MAX_BARS).reduce((sum, d) => sum + d.value, 0);

  const rows = (
    restTotal > 0 ? [...top, { label: "Others", value: restTotal }] : top
  ).map((d, i) => ({
    ...d,
    fill: d.label === "Others" ? OTHERS_COLOR : COLORS[i % COLORS.length],
  }));

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h6">SIMs per carrier</CardTitle>
        <ResponsiveContainer width="100%" height={rows.length * 44 + 20}>
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 36, bottom: 4, left: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="label"
              width={80}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: "#475569" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(14, 165, 233, 0.06)" }}
              formatter={(value) => [`${value} SIMs`, ""]}
              contentStyle={{ borderRadius: 8, fontSize: 13 }}
            />
            <Bar
              dataKey="value"
              name="SIMs"
              barSize={22}
              radius={[0, 8, 8, 0]}
              background={{ fill: "#F1F5F9", radius: 8 }}
            >
              <LabelList
                dataKey="value"
                position="right"
                style={{ fontSize: 13, fontWeight: 500, fill: "#1E293B" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

CarrierBars.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CarrierBars;
