import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BarComponent } from "./BarComponent.tsx";
import { memo } from "react";
import type { GroupedDataType } from "../../utils/group.tsx";

type MemoBarChartPropsType = {
  title?: string;
  groupedData: GroupedDataType[];
};

const MemoBarChart = ({ groupedData, title }: MemoBarChartPropsType) => {
  return (
    <ResponsiveContainer className="bar-wrapper" minHeight={100} minWidth={200}>
      <BarChart
        data={groupedData}
        margin={{ right: 50, left: 20, top: 30, bottom: 0 }}
        layout="vertical"
      >
        <text x={20} y={20} fill="white" fontSize={14} textAnchor="start">
          {title}
        </text>
        <XAxis type="number" axisLine={false} tick={false} />
        <YAxis type="category" axisLine={false} tick={false} />
        <BarComponent
          dataKey="Plan_Oy"
          aggregatedData={groupedData}
          isFact={false}
          fill="var(--orange)"
        />
        <BarComponent
          dataKey="Plan_Kun"
          aggregatedData={groupedData}
          isFact={false}
          fill="var(--orange)"
        />
        <BarComponent
          dataKey="Fact_Kun"
          aggregatedData={groupedData}
          isFact={true}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(MemoBarChart);
