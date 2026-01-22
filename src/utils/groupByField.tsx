export type RowDataType = {
  Type: string;
  Region: string;
  Product: string;
  Manager: string;
  Plan_Oy: number;
  Plan_Kun: number;
  Fact_Kun: number;
};

export type GroupedDataType = {
  Group: string;
  Plan_Oy: number;
  Plan_Kun: number;
  Fact_Kun: number;
};

type Filters = {
  Product?: string;
  Region?: string;
  Manager?: string;
};

const isActiveFilter = (value?: string) =>
  value !== undefined && value !== "All";

export function sumData(
  data: RowDataType[],
  type: "Sum" | "AKB",
  filters: Filters = {},
): GroupedDataType[] {
  const total: GroupedDataType = {
    Group: "Total",
    Plan_Oy: 0,
    Plan_Kun: 0,
    Fact_Kun: 0,
  };

  for (const item of data) {
    if (item.Type !== type) continue;

    if (
      (isActiveFilter(filters.Product) && item.Product !== filters.Product) ||
      (isActiveFilter(filters.Region) && item.Region !== filters.Region) ||
      (isActiveFilter(filters.Manager) && item.Manager !== filters.Manager)
    ) {
      continue;
    }

    total.Plan_Oy += Math.round(+item.Plan_Oy);
    total.Plan_Kun += Math.round(+item.Plan_Kun);
    total.Fact_Kun += Math.round(+item.Fact_Kun);
  }

  return [total];
}
