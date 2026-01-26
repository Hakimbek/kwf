import {
  kwfManagers,
  kwfProducts,
  kwfRegion,
  mpManagers,
  mpProducts,
  mpRegions,
} from "./data.ts";

type KWFDataType = {
  product: (typeof kwfProducts)[number];
  region: (typeof kwfRegion)[number];
  manager: (typeof kwfManagers)[number];
};

type MPDataType = {
  product: (typeof mpProducts)[number];
  region: (typeof mpRegions)[number];
  manager: (typeof mpManagers)[number];
};

export type Filter = "Sum" | "AKB";

export type GroupDataType = {
  planOy: number;
  planKun: number;
  factKun: number;
};

export type KWFRowDataType = GroupDataType & KWFDataType & { type: Filter };

export type MPRowDataType = GroupDataType & MPDataType & { type: Filter };
