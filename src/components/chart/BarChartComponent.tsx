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
  titleSize?: number;
  labelSize?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
};

export const BarChartComponent = ({
  productName = "All",
  regionName = "All",
  type,
  title,
  titleSize,
  labelSize,
  width,
  height,
  x,
  y,
  right,
  left,
  top,
  bottom,
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

  let color = "green";

  if (percent < 80) {
    color = "red";
  }

  if (percent > 120) {
    color = "blue";
  }

  return (
    <ResponsiveContainer className="bar-wrapper" width={width} height={height}>
      <BarChart
        data={groupedData}
        margin={{ right, left, top, bottom }}
        layout="vertical"
      >
        <text
          x={x}
          y={y}
          textAnchor="start"
          className="bar-title"
          fontSize={titleSize}
        >
          <tspan fontWeight="bold">{title}</tspan>
          <tspan fontWeight="bold" dx={5}>-</tspan>
          <tspan fontWeight="bold" dx={5} className={color}>{percent}%</tspan>
        </text>
        <XAxis type="number" axisLine={false} tick={false} />
        <YAxis type="category" axisLine={false} tick={false} />
        <BarComponent
          dataKey="Plan_Oy"
          isFact={false}
          fill="var(--dark-gray)"
          labelSize={labelSize}
        />
        <BarComponent
          dataKey="Plan_Kun"
          isFact={false}
          fill="var(--dark-gray)"
          labelSize={labelSize}
        />
        <BarComponent
          dataKey="Fact_Kun"
          isFact={true}
          color={color}
          labelSize={labelSize}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
