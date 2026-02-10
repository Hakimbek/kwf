import type { IPlan, IFact, ICompany } from "../../type/type.ts";
import { useState, useEffect, useMemo } from "react";
import {
  FACT_COLLECTION,
  PLAN_COLLECTION,
  subscribeToCollection,
} from "../../firebase/services.ts";
import { where, documentId } from "firebase/firestore";
import styles from "./Analytics.module.css";

export const Analytics = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<string>("February");
  const [managerFilter, setManagerFilter] = useState<string>("all");

  const [planDoc, setPlanDoc] = useState<IPlan | null>(null);
  const [factDoc, setFactDoc] = useState<IFact | null>(null);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    if (!selectedPlanId) return;
    return subscribeToCollection<IPlan>(
      PLAN_COLLECTION,
      (data) => setPlanDoc(data[0] || null),
      where(documentId(), "==", selectedPlanId),
    );
  }, [selectedPlanId]);

  useEffect(() => {
    if (!selectedCompany) return;
    return subscribeToCollection<IFact>(
      FACT_COLLECTION,
      (data) => setFactDoc(data[0] || null),
      where("companyId", "==", selectedCompany),
      where("year", "==", selectedYear),
      where("month", "==", selectedMonth),
    );
  }, [selectedCompany, selectedYear, selectedMonth]);

  const chartData = useMemo(() => {
    if (!planDoc || !factDoc) return null;

    const fPlanItems =
      managerFilter === "all"
        ? planDoc.items
        : planDoc.items.filter((i) => i.managerId === managerFilter);

    const fFactItems =
      managerFilter === "all"
        ? factDoc.items
        : factDoc.items.filter((i) => i.managerId === managerFilter);

    const regions = Array.from(
      new Set([...fPlanItems, ...fFactItems].map((i) => i.regionId)),
    );
    const barData = regions.map((rId) => ({
      region: rId,
      plan: fPlanItems
        .filter((p) => p.regionId === rId)
        .reduce((s, i) => s + i.amount, 0),
      fact: fFactItems
        .filter((f) => f.regionId === rId)
        .reduce((s, i) => s + i.amount, 0),
    }));

    const clientMap: Record<string, number> = {};
    fFactItems.forEach((f) => {
      clientMap[f.clientId] = (clientMap[f.clientId] || 0) + f.amount;
    });
    const clientPieData = Object.entries(clientMap).map(([id, amount]) => ({
      client: id,
      amount,
    }));

    const marginMap: Record<string, number> = {};
    fFactItems.forEach((f) => {
      const profit = f.amount * (f.margin || 0); // Margin as decimal (0.15)
      marginMap[f.productId] = (marginMap[f.productId] || 0) + profit;
    });
    const marginPieData = Object.entries(marginMap).map(([id, profit]) => ({
      product: id,
      profit,
    }));

    return { barData, clientPieData, marginPieData };
  }, [planDoc, factDoc, managerFilter]);

    const barOptions: AgChartOptions = {
        data: chartData?.barData || [],
        title: { text: "Region Performance: Plan vs Fact" },
        series: [
            { type: "column", xKey: "region", yKey: "plan", yName: "Plan", fill: "#bdc3c7" },
            { type: "column", xKey: "region", yKey: "fact", yName: "Fact", fill: "#007bff" },
        ],
    };

  const clientOptions: AgChartOptions = {
    data: chartData?.clientPieData || [],
    title: { text: "Revenue by Client" },
    series: [{ type: "pie", angleKey: "amount", calloutLabelKey: "client", sectorLabelKey: "amount" }],
  };

  const marginOptions: AgChartOptions = {
    data: chartData?.marginPieData || [],
    title: { text: "Profit Contribution (Margin × Amount)" },
    series: [{ type: "pie", angleKey: "profit", calloutLabelKey: "product", fillOpacity: 0.8 }],
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Analytics</h2>
      {/*<div className={styles.filterBar}>*/}
      {/*  <select onChange={(e) => setSelectedCompany(e.target.value)} value={selectedCompany}>*/}
      {/*    <option value="">Select Company</option>*/}
      {/*  </select>*/}

      {/*  <select onChange={(e) => setSelectedPlanId(e.target.value)} value={selectedPlanId}>*/}
      {/*    <option value="">Select Plan Name</option>*/}
      {/*  </select>*/}

      {/*  <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>*/}
      {/*    {["January", "February", "March", "April"].map(m => <option key={m} value={m}>{m}</option>)}*/}
      {/*  </select>*/}

      {/*  <select onChange={(e) => setManagerFilter(e.target.value)} value={managerFilter}>*/}
      {/*    <option value="all">All Managers</option>*/}
      {/*  </select>*/}
      {/*</div>*/}

      {/*{!chartData ? (*/}
      {/*    <div className={styles.noData}>Please select filters to view analytics.</div>*/}
      {/*) : (*/}
      {/*    <div className={styles.chartGrid}>*/}
      {/*      <div className={styles.fullWidth}>*/}
      {/*        <AgChartsReact options={barOptions} />*/}
      {/*      </div>*/}
      {/*      <div className={styles.halfWidth}>*/}
      {/*        <AgChartsReact options={clientOptions} />*/}
      {/*      </div>*/}
      {/*      <div className={styles.halfWidth}>*/}
      {/*        <AgChartsReact options={marginOptions} />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*)}*/}
    </div>
  );
};
