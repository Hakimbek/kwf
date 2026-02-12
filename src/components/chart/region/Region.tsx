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
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

interface IRegionProps {
  plan: IPlanVersion[];
  fact: IFactItem[];
}

interface IRegionSales {
  region: string;
  plan: number;
  fact: number;
}

// interface IRegionClients {
//   region: string;
//   [key: string]: number | string;
// }

export const Region = ({ plan, fact }: IRegionProps) => {
  const [regions, setRegions] = useState<IRegion[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(REGION_COLLECTION, setRegions);

    return () => unsubscribe();
  }, []);

  const sales = useMemo(() => {
    return regions.map(({ id, name }): IRegionSales => {
      const regionPlan = plan
        .filter((p) => p.regionId === id)
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
      const regionFact = fact
        .filter((f) => f.regionId === id)
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

      return {
        region: name || "Unknown",
        plan: regionPlan,
        fact: regionFact,
      };
    });
  }, [plan, fact, regions]);

  // const clients = useMemo(() => {
  //   return regions.map(({ id, name }) => {
  //     const result: Record<string, string | number> = {
  //       region: name || "Unknown",
  //     };
  //
  //     const regionFacts = fact.filter((f) => f.regionId === id);
  //
  //     regionFacts.forEach(({ clientId }) => {
  //       if (!clientId) return;
  //
  //       if (typeof result[clientId] === "number") {
  //         (result[clientId] as number) += 1;
  //       } else {
  //         result[clientId] = 1;
  //       }
  //     });
  //
  //     return result;
  //   });
  // }, [regions, fact]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis width="auto" />
          <Tooltip />
          <Legend />
          <Bar dataKey="plan" fill="#8884d8" isAnimationActive={true} />
          <Bar dataKey="fact" fill="#82ca9d" isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
      {/*<ResponsiveContainer width="100%" height="100%">*/}
      {/*    <BarChart data={sales}>*/}
      {/*        <CartesianGrid strokeDasharray="3 3" />*/}
      {/*        <XAxis dataKey="region" />*/}
      {/*        <YAxis width="auto" />*/}
      {/*        <Tooltip />*/}
      {/*        <Legend />*/}
      {/*        <Bar dataKey="plan" fill="#8884d8" isAnimationActive={true} />*/}
      {/*        <Bar dataKey="fact" fill="#82ca9d" isAnimationActive={true} />*/}
      {/*    </BarChart>*/}
      {/*</ResponsiveContainer>*/}
    </div>
  );
};
