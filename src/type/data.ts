import type { RegionType, ProductType, ManagerType } from "./import.ts";

export type DataType = {
  id: string;
  Product: ProductType;
  Region: RegionType;
  Manager: ManagerType;
  Type: "Sum" | "AKB";
  Plan_Oy: number;
  Plan_Kun: number;
  Fact_Kun: number;
};
