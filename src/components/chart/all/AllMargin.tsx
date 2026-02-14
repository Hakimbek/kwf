import { useMemo } from "react";
import type { IFactItem } from "../../../type/type.ts";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface IAllProps {
  fact: IFactItem[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export const AllMargin = ({ fact }: IAllProps) => {
  const margin = useMemo(() => {
    const buckets = {
      "30%+": 0,
      "25-29%": 0,
      "20-24%": 0,
      "15-19%": 0,
      "10-14%": 0,
      "Under 10%": 0,
    };

    fact.forEach((f) => {
      const m = f.margin;
      if (m >= 30) buckets["30%+"]++;
      else if (m >= 25) buckets["25-29%"]++;
      else if (m >= 20) buckets["20-24%"]++;
      else if (m >= 15) buckets["15-19%"]++;
      else if (m >= 10) buckets["10-14%"]++;
      else buckets["Under 10%"]++;
    });

    return Object.entries(buckets)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));
  }, [fact]);

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <h3 style={{ fontWeight: "350", textAlign: "center" }}>All Margin</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={margin}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={200}
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {margin.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
