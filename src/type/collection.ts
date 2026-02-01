type ValuesOf<T> = T[keyof T];

export const CollectionName = {
  KWF: "kwf",
  MP: "mp",
} as const;

export type CollectionType = ValuesOf<typeof CollectionName>;
