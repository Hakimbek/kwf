import { useEffect, useMemo, useState } from "react";
import type { IFactItem, IRegion } from "../../../type/type.ts";
import {
  REGION_COLLECTION,
  subscribeToCollection,
} from "../../../firebase/services.ts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface IRegionProps {
  fact: IFactItem[];
}

interface IRegionMargin {
  region: string;
  cost: number;
  margin: number;
}

export const RegionMargin = ({ fact }: IRegionProps) => {
  const [regions, setRegions] = useState<IRegion[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(REGION_COLLECTION, setRegions);

    return () => unsubscribe();
  }, []);

  const margin = useMemo(() => {
    return regions.map(({ id, name }): IRegionMargin => {
      const regionFacts = fact.filter((f) => f.regionId === id);

      const totals = regionFacts.reduce(
        (acc, curr) => {
          const marginAmt = curr.amount * (curr.margin / 100);
          const costAmt = curr.amount - marginAmt;

          return {
            margin: acc.margin + marginAmt,
            cost: acc.cost + costAmt,
          };
        },
        { margin: 0, cost: 0 },
      );

      return {
        region: name || "Unknown",
        cost: Math.round(totals.cost),
        margin: Math.round(totals.margin),
      };
    });
  }, [regions, fact]);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h3 style={{ fontWeight: "350" }}>Region Margin</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={margin} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis width="auto" />
          <Legend />
          <Bar
            dataKey="cost"
            stackId="a"
            fill="#8884d8"
            isAnimationActive={true}
          >
            <LabelList dataKey="cost" position="top" />
          </Bar>
          <Bar
            dataKey="margin"
            stackId="a"
            fill="#82ca9d"
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
