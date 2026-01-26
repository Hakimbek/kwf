import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BarComponent } from "./BarComponent.tsx";
import useLocalStorage from "use-local-storage";
import { group } from "../../utils/group.tsx";
import type { Filter } from "../../utils/type.ts";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import type { StorageType } from "../../utils/type.ts";
import "./BarChart.css";

export type BarChartPropsType = {
  productName?: string;
  regionName?: string;
  type: Filter;
  title?: string;
  width?: number;
  height?: number;
};

export const BarChartComponent = ({
  productName = "All",
  regionName = "All",
  type,
  title,
  width,
  height,
}: BarChartPropsType) => {
  const [data] = useLocalStorage<{ MP: []; KWF: [] }>("data", {
    MP: [],
    KWF: [],
  });
  const { pathname } = useLocation();
  const [storageType, manager] = decodeURIComponent(pathname)
    .split("/")
    .filter(Boolean);
  const groupedData = useMemo(
    () =>
      group(
        data[storageType as StorageType],
        type,
        productName,
        regionName,
        manager,
      ),
    [data, manager, regionName, productName, type, storageType],
  );

  return (
    <ResponsiveContainer className="bar-wrapper" width={width} height={height}>
      <BarChart
        data={groupedData}
        margin={{ right: 50, left: 40 }}
        layout="vertical"
      >
        <text x={20} y={20} textAnchor="start">
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
