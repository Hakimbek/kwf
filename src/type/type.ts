export interface ICollection {
  id: string;
  name: string;
  createdAt?: Date;
  lastEditedAt?: Date;
}

export interface ICompany extends ICollection {}
export interface IRegion extends ICollection {}
export interface IClient extends ICollection {}

export interface IProduct extends ICollection {
  companyId: string;
}

export interface IManager extends ICollection {
  companyId: string;
}

export interface IPlanVersion {
  id: string;
  managerId: string;
  productId: string;
  regionId: string;
  amount: number;
}

export interface IFactItem {
  id: string;
  managerId: string;
  productId: string;
  regionId: string;
  clientId: string;
  amount: number;
  margin: number;
}

export interface IPlan extends ICollection {
  companyId: string;
  items: IPlanVersion[];
}

export interface IFact extends ICollection {
  year: string;
  month: string;
  companyId: string;
  items: IFactItem[];
}
