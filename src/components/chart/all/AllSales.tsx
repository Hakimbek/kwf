import type { IPlanVersion, IFactItem } from "../../../type/type.ts";
import { useMemo, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

interface IAllProps {
  plan: IPlanVersion[];
  fact: IFactItem[];
}

export const AllSales = ({ plan, fact }: IAllProps) => {
  const [isDynamicVisible, setIsDynamicVisible] = useState(false);

  const now = new Date();
  const currentDay = now.getDate();
  const totalDays = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();

  const sales = useMemo(() => {
    const allPlan = plan.reduce((sum, p) => {
      return sum + (Number(p.amount) || 0);
    }, 0);

    const allFact = fact.reduce((sum, p) => {
      return sum + (Number(p.amount) || 0);
    }, 0);

    return {
      plan: allPlan,
      dynamic: Math.round((allPlan / totalDays) * currentDay),
      fact: Math.round(allFact),
    };
  }, [plan, fact]);

  const getBarColor = (fact: number, plan: number, dynamic: number) => {
    const performance = isDynamicVisible ? fact / dynamic : fact / plan;

    if (performance < 0.8) return "#ff7675";

    if (performance >= 0.8 && performance <= 1.2) return "#82ca9d";

    return "#22a6b3";
  };

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <div className="d-flex gap-3 justify-content-center">
        <h3 style={{ fontWeight: "350" }}>All Sales</h3>
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
        <BarChart data={[sales]} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
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
            {[sales].map((entry, index) => (
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
