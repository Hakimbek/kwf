import {BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import { BarComponent } from "./BarComponent.tsx";
import useLocalStorage from "use-local-storage";
import { sumData } from "../../utils/groupByField.tsx";
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
  const groupedData = sumData(kwfData ? JSON.parse(kwfData) : [], type, {
    Manager: managerName,
    Product: productName,
    Region: regionName,
  });

  return (
    <ResponsiveContainer className="bar-wrapper">
      <BarChart data={groupedData} margin={{ right: 50, left: 20, top: 30, bottom: 0 }} layout="vertical">
        <text x={20} y={20} fill="white" fontSize={14} textAnchor="start">{title}</text>
        <XAxis type="number" axisLine={false} tick={false} />
        <YAxis dataKey="Group" type="category" axisLine={false} tick={false} />
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
