import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export function RiskChart({ logs }) {

  const data = logs.map((log) => ({
    id: log.id,
    risk: log.risk_score
  }));

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
    >
      <XAxis dataKey="id" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="risk" fill="#8884d8" />
    </BarChart>
  );
}