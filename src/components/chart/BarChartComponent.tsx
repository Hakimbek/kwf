import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { GroupedDataType } from "../../utils/groupByField.tsx";
import { BarComponent } from "./BarComponent.tsx";

export type BarChartDataType = {
  aggregatedData: GroupedDataType[];
  height: number;
};

export const BarChartComponent = ({
  aggregatedData,
  height,
}: BarChartDataType) => {
  return (
    <ResponsiveContainer height={height}>
      <BarChart
        data={aggregatedData}
        margin={{ right: 50, left: 20 }}
        layout="vertical"
      >
        <XAxis type="number" axisLine={false} tick={false} />
        <YAxis dataKey="Group" type="category" axisLine={false} tick={false} />
        <BarComponent
          dataKey="Plan_Oy"
          aggregatedData={aggregatedData}
          isFact={false}
          fill="var(--orange)"
        />
        <BarComponent
          dataKey="Plan_Kun"
          aggregatedData={aggregatedData}
          isFact={false}
          fill="var(--orange)"
        />
        <BarComponent
          dataKey="Fact_Kun"
          aggregatedData={aggregatedData}
          isFact={true}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
