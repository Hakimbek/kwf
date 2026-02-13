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
import type { IFactItem, IProduct } from "../../../type/type.ts";
import {
  PRODUCTS_COLLECTION,
  subscribeToCollection,
} from "../../../firebase/services.ts";

interface IProductProps {
  fact: IFactItem[];
  companyId: string;
}

interface IProductClients {
  product: string;
  amount: number;
}

export const ProductClients = ({ fact, companyId }: IProductProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(PRODUCTS_COLLECTION, setProducts);

    return () => unsubscribe();
  }, []);

  const clients = useMemo(() => {
    return products
      .filter((p) => p.companyId === companyId)
      .map(({ id, name }): IProductClients => {
        const productFacts = fact.filter((f) => f.productId === id);
        const uniqueClientIds = new Set(
          productFacts.map((fact) => fact.clientId),
        );

        return {
          product: name || "Unknown",
          amount: uniqueClientIds.size,
        };
      });
  }, [products, fact]);

  const getBarColor = (amount: number) => (amount < 3 ? "#ff7675" : "#82ca9d");

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <h3 style={{ fontWeight: "350" }}>Product Clients</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={clients} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
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
