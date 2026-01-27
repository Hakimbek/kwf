import type {
  KWFRowDataType,
  GroupDataType,
  MPRowDataType,
  Filter,
} from "./type.ts";

// const cache = new Map();

const isActiveFilter = (value?: string) =>
  value !== undefined && value !== "All";

export function group(
  data: KWFRowDataType[] | MPRowDataType[] = [],
  type: Filter,
  product?: string,
  region?: string,
  manager?: string,
): GroupDataType[] {
  // const key = type + product + region + manager;

  // if (cache.has(key)) {
  //   return cache.get(key);
  // }

  const total: GroupDataType = { Plan_Oy: 0, Plan_Kun: 0, Fact_Kun: 0 };

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

  // cache.set(key, [total]);
  return [total];
}
