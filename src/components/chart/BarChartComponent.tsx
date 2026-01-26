import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BarComponent } from "./BarComponent.tsx";
import useLocalStorage from "use-local-storage";
import { group } from "../../utils/group.tsx";
import type { Filter, StorageType } from "../../utils/type.ts";
import { useMemo } from "react";
import "./BarChart.css";

export type BarChartPropsType = {
  productName?: string;
  regionName?: string;
  type: Filter;
  title?: string;
};

export const BarChartComponent = ({
  productName = "All",
  regionName = "All",
  type,
  title,
}: BarChartPropsType) => {
  const [storage] = useLocalStorage<StorageType>("storageType", "kwf");
  const [manager] = useLocalStorage("manager", "");
  const [data] = useLocalStorage(storage, "");
  const groupedData = useMemo(
    () =>
      group(
        data ? JSON.parse(data) : [],
        storage,
        type,
        productName,
        regionName,
        manager,
      ),
    [data, manager, regionName, productName, type, storage],
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
          dataKey="planOy"
          aggregatedData={groupedData}
          isFact={false}
          fill="var(--orange)"
        />
        <BarComponent
          dataKey="planKun"
          aggregatedData={groupedData}
          isFact={false}
          fill="var(--orange)"
        />
        <BarComponent
          dataKey="factKun"
          aggregatedData={groupedData}
          isFact={true}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
