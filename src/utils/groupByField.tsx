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

export function groupByField(
  data: RowDataType[],
  field: keyof Pick<RowDataType, 'Region' | 'Product' | 'Manager'>,
  type: "Sum" | "AKB",
): GroupedDataType[] {
  const map = new Map<string, GroupedDataType>();

  data.forEach(item => {
    const groupKey = String(item[field]);

    if (!map.has(groupKey)) {
      map.set(groupKey, {
        Group: groupKey,
        Plan_Oy: 0,
        Plan_Kun: 0,
        Fact_Kun: 0,
      });
    }

    if (item.Type === type) {
      const acc = map.get(groupKey)!;
      acc.Plan_Oy += Math.round(Number(item.Plan_Oy));
      acc.Plan_Kun += Math.round(Number(item.Plan_Kun));
      acc.Fact_Kun += Math.round(Number(item.Fact_Kun));
    }
  });

  return Array.from(map.values());
}
