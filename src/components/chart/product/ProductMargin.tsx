import { useEffect, useMemo, useState } from "react";
import type { IFactItem, IProduct } from "../../../type/type.ts";
import {
  PRODUCTS_COLLECTION,
  subscribeToCollection,
} from "../../../firebase/services.ts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface IProductProps {
  fact: IFactItem[];
  companyId: string;
}

interface IProductMargin {
  product: string;
  cost: number;
  margin: number;
}

export const ProductMargin = ({ fact, companyId }: IProductProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(PRODUCTS_COLLECTION, setProducts);

    return () => unsubscribe();
  }, []);

  const margin = useMemo(() => {
    return products
      .filter((p) => p.companyId === companyId)
      .map(({ id, name }): IProductMargin => {
        const productFacts = fact.filter((f) => f.productId === id);

        const totals = productFacts.reduce(
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
          product: name || "Unknown",
          cost: Math.round(totals.cost),
          margin: Math.round(totals.margin),
        };
      });
  }, [products, fact]);

  return (
    <div style={{ width: "100%", height: "700px" }}>
      <h3 style={{ fontWeight: "350" }}>Product Margin</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={margin} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis width="auto" />
          <Legend />
          <Bar
            dataKey="cost"
            stackId="a"
            fill="#8884d8"
            isAnimationActive={true}
          />
          <Bar
            dataKey="margin"
            stackId="a"
            fill="#82ca9d"
            isAnimationActive={true}
          >
            <LabelList dataKey="margin" position="top" offset={10} />
            <LabelList dataKey="cost" position="top" offset={25} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
