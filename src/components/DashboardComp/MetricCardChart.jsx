import { CartesianGrid, Line, LineChart } from "recharts"

const data = [
  { value: 186 },
  { value: 305 },
  { value: 237 },
  { value: 73 },
  { value: 209 },
  { value: 214 },
]

export function MetricCardChart() {
  return (
    <LineChart
      width={400}
      height={200}
      data={data}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <CartesianGrid stroke="#f0f0f0" vertical={false} />
      <Line
        type="linear"
        dataKey="value"
        stroke="#8884d8"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  )
}