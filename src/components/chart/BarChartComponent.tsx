import { useState, useEffect } from "react";
import { group } from "../../utils/group.tsx";
import useLocalStorage from "use-local-storage";
import { BarComponent } from "./BarComponent.tsx";
import { BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  CollectionName,
  ManagerName,
  StorageName,
  type CollectionType,
} from "../../type/import.ts";
import { getFilteredData } from "../../firebase/getFilteredData.ts";
import "./BarChart.css";

export type BarChartPropsType = {
  product?: string;
  region?: string;
  type: "Sum" | "AKB" | "KPI";
  title?: string;
  width?: number;
};

export const BarChartComponent = ({
  product = "All",
  region = "All",
  type,
  title,
  width,
}: BarChartPropsType) => {
  const { MANAGER, COLLECTION } = StorageName;
  const { ALL } = ManagerName;
  const { KWF } = CollectionName;
  const [data, setData] = useState<any[]>([]);
  const [manager] = useLocalStorage(MANAGER, ALL);
  const [collection] = useLocalStorage<CollectionType>(COLLECTION, KWF);
  const [kpi] = useLocalStorage("kpi", {});
  const groupedData = group(data);
  let percent = Math.round(
    (groupedData[0]?.Fact_Kun * 100) / groupedData[0]?.Plan_Kun,
  );
  const diff = groupedData[0]?.Fact_Kun - groupedData[0]?.Plan_Kun;

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

  useEffect(() => {
    const key =
      collection === "mp" && (product === "SnP" || product === "SnP Lam")
        ? "kwf"
        : collection;

    if (type !== "KPI") {
      const unsubscribe = getFilteredData(
        key,
        { type, region, manager, product },
        (results) => setData(results),
      );

      return () => unsubscribe();
    } else {
      setData([
        {
          Fact_Kun: Number(manager === ALL ? 0 : kpi[manager]),
          Plan_Kun:
            (25000 * new Date().getDate()) /
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0,
            ).getDate(),
          Plan_Oy: 25000,
        },
      ]);
    }
  }, [region, manager, product, collection]);

  return (
    <div className="w-100">
      <p className="d-flex justify-content-center m-0 fw-medium gap-1">
        <span>{title}</span>
        <span className={color}>{percent}%</span>
        <span className={`diff ${diff > 0 ? "green" : "red"}`}>
          {diff > 0
            ? "+" + diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            : diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </span>
      </p>
      <ResponsiveContainer
        className={`bar-wrapper ${color === "red" && groupedData[0]?.Plan_Kun !== 0 ? "blinking" : ""} ${type}`}
        width={width}
        height={150}
      >
        <BarChart data={groupedData} margin={{ left: -30 }} layout="vertical">
          <XAxis
            type="number"
            axisLine={false}
            tick={false}
            domain={[0, (dataMax) => dataMax / 0.8]}
          />
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
