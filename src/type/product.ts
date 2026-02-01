type ValuesOf<T> = T[keyof T];

export const ProductName = {
  wRSC: "wRSC",
  RSC: "RSC",
  nonRSC: "non-RSC",
  SnP: "SnP",
  SnPLam: "SnP Lam",
  Gofrolist: "Гофролист",
  Monokarton: "Монокартон",
  B0: "Karton B0",
  B1: "Karton B1",
  B2_100: "Karton B2+ 100gr",
  B2_120: "Karton B2+ 120gr",
  CelLayner: "Karton CelLayner",
  OqLayner: "Karton OqLayner",
  K0: "Karton К0 120гр",
  K1: "Karton К1 120гр",
} as const;

export type ProductType = ValuesOf<typeof ProductName>;
