import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BarComponent } from "./BarComponent.tsx";
import useLocalStorage from "use-local-storage";
import { group } from "../../utils/group.tsx";
import { useMemo } from "react";
import "./BarChart.css";

export type BarChartPropsType = {
  managerName?: string;
  productName?: string;
  regionName?: string;
  type: "Sum" | "AKB";
  data: "kwfData" | "mpData";
  title?: string;
};

export const BarChartComponent = ({
  managerName = "All",
  productName = "All",
  regionName = "All",
  type,
  data,
  title,
}: BarChartPropsType) => {
  const [kwfData] = useLocalStorage(data, "");
  const groupedData = useMemo(
    () =>
      group(
        kwfData ? JSON.parse(kwfData) : [],
        data,
        type,
        productName,
        regionName,
        managerName,
      ),
    [kwfData, managerName, regionName, managerName, type, data],
  );

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
