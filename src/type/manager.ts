type ValuesOf<T> = T[keyof T];

export const ManagerName = {
  ALL: "All",
  MUROD: "Шарипов Мурод",
  FARRUX: "Одилбеков Фаррухбек",
  SHOKIRJON: "Искандаров Шокиржон",
  XURSAND: "Бозорбоев Хурсандбек",
  ULUGBEK: "Шомуратов Улугбек",
  UMID: "Хаджиов Умид",
} as const;

export type ManagerType = ValuesOf<typeof ManagerName>;
