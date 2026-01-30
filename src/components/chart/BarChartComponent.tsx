import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BarComponent } from "./BarComponent.tsx";
import useLocalStorage from "use-local-storage";
import { group } from "../../utils/group.tsx";
import type { Filter } from "../../utils/type.ts";
import { useMemo } from "react";
import { storage } from "../../utils/data.ts";
import type { StorageType } from "../../utils/type.ts";
import "./BarChart.css";

export type BarChartPropsType = {
  productName?: string;
  regionName?: string;
  type: Filter;
  title?: string;
  width?: number;
};

export const BarChartComponent = ({
  productName = "All",
  regionName = "All",
  type,
  title,
  width,
}: BarChartPropsType) => {
  const [data] = useLocalStorage<{ MP: []; KWF: [] }>("data", {
    MP: [],
    KWF: [],
  });
  const [manager] = useLocalStorage("manager", "All");
  const [key] = useLocalStorage<StorageType>("key", storage.KWF);
  const groupedData = useMemo(
    () => group(data[key], type, productName, regionName, manager),
    [data, manager, regionName, productName, type, key],
  );
  let percent = Math.round(
    (groupedData[0]?.Fact_Kun * 100) / groupedData[0]?.Plan_Kun,
  );

  if (Number.isNaN(percent)) {
    percent = 0;
  }

  if (!Number.isFinite(percent)) {
    percent = groupedData[0]?.Fact_Kun + 100;
  }

  let color = "green";

  if (percent < 80) {
    color = "red";
  }

  if (percent > 120) {
    color = "blue";
  }

  return (
    <div className="w-100">
      <p className="d-flex justify-content-center m-0 fw-medium gap-1">
        <span>{title}</span>
        <span>/</span>
        <span className={color}>{percent}%</span>
        <span>/</span>
        <span>{groupedData[0]?.Fact_Kun - groupedData[0]?.Plan_Kun}</span>
      </p>
      <ResponsiveContainer
        className={`bar-wrapper ${color === "red" && groupedData[0]?.Plan_Kun !== 0 ? "blinking" : ""}`}
        width={width}
        height={150}
      >
        <BarChart data={groupedData} margin={{ left: -30, right: 40 }} layout="vertical">
          <XAxis type="number" axisLine={false} tick={false} />
          <YAxis type="category" axisLine={false} tick={false} />
          <BarComponent
            dataKey="Plan_Oy"
            isFact={false}
            fill="var(--dark-gray)"
          />
          <BarComponent
            dataKey="Plan_Kun"
            isFact={false}
            fill="var(--dark-gray)"
          />
          <BarComponent dataKey="Fact_Kun" isFact={true} color={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
