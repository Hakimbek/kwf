import type { DataType } from "../type/import.ts";

type GroupDataType = {
  Plan_Oy: 0,
  Plan_Kun: 0,
  Fact_Kun: 0,
}

export function group(data: DataType[] = []): GroupDataType[] {
  const total: GroupDataType = {
    Plan_Oy: 0,
    Plan_Kun: 0,
    Fact_Kun: 0,
  };

  for (const item of data) {
    total.Plan_Oy += Math.round(+item.Plan_Oy);
    total.Plan_Kun += Math.round(+item.Plan_Kun);
    total.Fact_Kun += Math.round(+item.Fact_Kun);
  }

  return [total];
}
