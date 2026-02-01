type ValuesOf<T> = T[keyof T];

export const RegionName = {
  BuxoroNavoiyKWF: "Бухоро ва Навоий вилояти",
  VodiyKWF: "Водий: ФАН",
  KashSurxKWF: "Кашкадарё ва Сурхондарё вилояти",
  SamJizSirKWF: "Самарканд, Жиззах ва Сирдайрё вилояти",
  ToshkentKWF: "Тошкент вилояти ва шахри",
  XorazmQQPKWF: "Хоразм вилояти ва Коракалпогистон",
  EksportKushniKWF: "Экспорт (кушни)",
  EksportKushniEmasKWF: "Экспорт (кушни эмас)",
  BuxoroNavoiyMP: "Бухоро ва Навоий",
  VodiyMP: "Водий: (ФАН)",
  DillerMP: "Дилер: Union Paper",
  KashSurxKWFMP: "Кашкадарё ва Сурхондарё",
  SamJizSirMP: "Сам, Джиз, Сирд",
  ToshkentMP: "Тошкент вилоят ва шахар",
  XorazmQQPMP: "Хоразм ва Коракалпогистон",
  SnPMP: "SnP",
  KartonWorksMP: "Karton Works",
  EksportKushniMP: "Eksport (кушни)",
  EksportKushniEmasMP: "Eksport (кушни эмас)",
} as const;

export type RegionType = ValuesOf<typeof RegionName>;
