import type { IPlanVersion, IFactItem, IRegion } from "../../../type/type.ts";
import { useEffect, useMemo, useState } from "react";
import {
  REGION_COLLECTION,
  subscribeToCollection,
} from "../../../firebase/services.ts";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

interface IRegionProps {
  plan: IPlanVersion[];
  fact: IFactItem[];
}

interface IRegionSales {
  region: string;
  plan: number;
  dynamic: number;
  fact: number;
}

export const RegionSales = ({ plan, fact }: IRegionProps) => {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [isDynamicVisible, setIsDynamicVisible] = useState(false);

  const now = new Date();
  const currentDay = now.getDate();
  const totalDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  useEffect(() => {
    const unsubscribe = subscribeToCollection(REGION_COLLECTION, setRegions);

    return () => unsubscribe();
  }, []);

  const sales = useMemo(() => {
    return regions.map(({ id, name }): IRegionSales => {
      const regionPlan = plan.reduce((sum, p) => {
        return p.regionId === id ? sum + (Number(p.amount) || 0) : sum;
      }, 0);

      const regionFact = fact.reduce((sum, p) => {
        return p.regionId === id ? sum + (Number(p.amount) || 0) : sum;
      }, 0);

      return {
        region: name || "Unknown",
        plan: regionPlan,
        dynamic: Math.round((regionPlan / totalDays) * currentDay),
        fact: Math.round(regionFact),
      };
    });
  }, [plan, fact, regions]);

  const getBarColor = (fact: number, plan: number, dynamic: number) => {
    const performance = isDynamicVisible ? fact / dynamic : fact / plan;

    if (performance < 0.8) return "#ff7675";

    if (performance >= 0.8 && performance <= 1.2) return "#82ca9d";

    return "#22a6b3";
  };

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <div className="d-flex gap-3">
        <h3 style={{ fontWeight: "350" }}>Region Sales</h3>
        <button
          className="border-0 rounded bg-transparent text-primary"
          onClick={() => setIsDynamicVisible(!isDynamicVisible)}
        >
          {isDynamicVisible ? (
            <i className="bi bi-toggle-on"></i>
          ) : (
            <i className="bi bi-toggle-off"></i>
          )}
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sales} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis width="auto" />
          <Legend />
          <Bar dataKey="plan" fill="#b2bec3" isAnimationActive={true}>
            <LabelList dataKey="plan" position="top" />
          </Bar>
          <Bar
            hide={!isDynamicVisible}
            dataKey="dynamic"
            fill="#b2bec3"
            isAnimationActive={true}
          >
            <LabelList dataKey="dynamic" position="top" />
          </Bar>
          <Bar dataKey="fact" fill="#82ca9d" isAnimationActive={true}>
            {sales.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.fact, entry.plan, entry.dynamic)}
              />
            ))}
            <LabelList dataKey="fact" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
