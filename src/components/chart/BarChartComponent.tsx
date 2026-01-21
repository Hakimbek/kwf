import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { GroupedDataType } from "../../utils/groupByField.tsx";
import { BarComponent } from "./BarComponent.tsx";

export type BarChartDataType = {
  aggregatedData: GroupedDataType[];
  xOffset: number;
  height: number;
};

export const BarChartComponent = ({
  aggregatedData,
  xOffset,
  height,
}: BarChartDataType) => {
  return (
    <ResponsiveContainer width="100%" height={height} className="border">
      <BarChart
        data={aggregatedData}
        responsive
        margin={{ top: 40 }}
        layout="vertical"
      >
        <XAxis fontWeight="bold" tick={false} type="number" axisLine={false} />
        <YAxis dataKey="Group" type="category" angle={-90} axisLine={false} />
        <BarComponent
          dataKey="Plan_Oy"
          xOffset={xOffset}
          aggregatedData={aggregatedData}
          isFact={false}
          fill="var(--dark-gray)"
        />
        <BarComponent
          dataKey="Plan_Kun"
          xOffset={xOffset}
          aggregatedData={aggregatedData}
          isFact={false}
          fill="var(--dark-gray)"
        />
        <BarComponent
          dataKey="Fact_Kun"
          xOffset={xOffset}
          aggregatedData={aggregatedData}
          isFact={true}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
