export type RowDataType = {
  Type: "Sum" | "AKB";
  Region: string;
  Product: string;
  Manager: string;
  Plan_Oy: number;
  Plan_Kun: number;
  Fact_Kun: number;
};

export type GroupedDataType = Pick<RowDataType, "Plan_Oy" | "Plan_Kun" | "Fact_Kun">;

const cache = new Map();

const isActiveFilter = (value?: string) =>
  value !== undefined && value !== "All";

export function sumData(
  data: RowDataType[],
  storage: "mpData" | "kwfData",
  type: RowDataType["Type"],
  product?: string,
  region?: string,
  manager?: string,
): GroupedDataType[] {
  if (cache.has(type + product + region + manager + storage)) {
    return cache.get(type + product + region + manager + storage);
  }

  const total: GroupedDataType = {
    Plan_Oy: 0,
    Plan_Kun: 0,
    Fact_Kun: 0,
  };

  for (const item of data) {
    if (item.Type !== type) continue;

    if (
      (isActiveFilter(product) && item.Product !== product) ||
      (isActiveFilter(region) && item.Region !== region) ||
      (isActiveFilter(manager) && item.Manager !== manager)
    ) {
      continue;
    }

    total.Plan_Oy += Math.round(+item.Plan_Oy);
    total.Plan_Kun += Math.round(+item.Plan_Kun);
    total.Fact_Kun += Math.round(+item.Fact_Kun);
  }

  cache.set(type + product + region + manager + storage, [total]);
  return [total];
}
