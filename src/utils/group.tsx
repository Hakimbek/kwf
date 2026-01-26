import type {
  KWFRowDataType,
  GroupDataType,
  MPRowDataType,
  Filter,
} from "./type.ts";

const cache = new Map();

const isActiveFilter = (value?: string) =>
  value !== undefined && value !== "All";

export function group(
  data: KWFRowDataType[] | MPRowDataType[],
  storage: "mpData" | "kwfData",
  type: Filter,
  product?: string,
  region?: string,
  manager?: string,
): GroupDataType[] {
  const key = type + product + region + manager + storage;

  if (cache.has(key)) {
    return cache.get(key);
  }

  const total: GroupDataType = { planOy: 0, planKun: 0, factKun: 0 };

  for (const item of data) {
    if (item.type !== type) continue;

    if (
      (isActiveFilter(product) && item.product !== product) ||
      (isActiveFilter(region) && item.region !== region) ||
      (isActiveFilter(manager) && item.manager !== manager)
    ) {
      continue;
    }

    total.planOy += Math.round(+item.planOy);
    total.planKun += Math.round(+item.planKun);
    total.factKun += Math.round(+item.factKun);
  }

  cache.set(key, [total]);
  return [total];
}
