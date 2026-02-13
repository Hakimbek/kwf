import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  LabelList,
  Cell,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import type { IFactItem, IRegion } from "../../../type/type.ts";
import {
  REGION_COLLECTION,
  subscribeToCollection,
} from "../../../firebase/services.ts";

interface IRegionProps {
  fact: IFactItem[];
}

interface IRegionClients {
  region: string;
  amount: number;
}

export const RegionClients = ({ fact }: IRegionProps) => {
  const [regions, setRegions] = useState<IRegion[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(REGION_COLLECTION, setRegions);

    return () => unsubscribe();
  }, []);

  const clients = useMemo(() => {
    return regions.map(({ id, name }): IRegionClients => {
      const regionFacts = fact.filter((f) => f.regionId === id);
      const uniqueClientIds = new Set(regionFacts.map((fact) => fact.clientId));

      return {
        region: name || "Unknown",
        amount: uniqueClientIds.size,
      };
    });
  }, [regions, fact]);

  const getBarColor = (amount: number) => (amount < 3 ? "#ff7675" : "#82ca9d");

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h3 style={{ fontWeight: "350" }}>Region Clients</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={clients} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis width="auto" />
          <Legend />
          <Bar dataKey="amount" fill="#82ca9d" isAnimationActive={true}>
            {clients.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.amount)} />
            ))}
            <LabelList dataKey="amount" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
