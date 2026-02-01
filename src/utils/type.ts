import {
  kwfManagers,
  kwfProducts,
  kwfRegion,
  mpManagers,
  mpProducts,
  mpRegions,
} from "./data.ts";

type KWFDataType = {
  Product: (typeof kwfProducts)[number];
  Region: (typeof kwfRegion)[number];
  Manager: (typeof kwfManagers)[number];
};

type MPDataType = {
  Product: (typeof mpProducts)[number];
  Region: (typeof mpRegions)[number];
  Manager: (typeof mpManagers)[number];
};

export type Filter = "Sum" | "AKB";

export type GroupDataType = {
  Plan_Oy: number;
  Plan_Kun: number;
  Fact_Kun: number;
  Fact_SnP: number;
};

export type KWFRowDataType = GroupDataType & KWFDataType & { Type: Filter };

export type MPRowDataType = GroupDataType & MPDataType & { Type: Filter };
