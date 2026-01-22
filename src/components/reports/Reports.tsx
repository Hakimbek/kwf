import { sumData } from "../../utils/groupByField.tsx";
import useLocalStorage from "use-local-storage";
import { Manager } from "../manager/Manager.tsx";
import { FilterManager } from "../filter/FilterManager.tsx";
import { FilterRegion } from "../filter/FilterRegion.tsx";
import { FilterProduct } from "../filter/FilterProduct.tsx";

export const Reports = () => {
  const [rawData] = useLocalStorage("rawData", "");
  const [manager] = useLocalStorage("manager", "All");
  const [region] = useLocalStorage("region", "All");
  const [product] = useLocalStorage("product", "All");
  const sales = sumData(rawData ? JSON.parse(rawData) : [], "Sum", {
    Manager: manager,
    Region: region,
    Product: product,
  });
  const akb = sumData(rawData ? JSON.parse(rawData) : [], "AKB", {
    Manager: manager,
    Region: region,
    Product: product,
  });

  return (
    <>
      <FilterManager />
      <FilterRegion />
      <FilterProduct />
      <Manager sales={sales} akb={akb} />
    </>
  );
};
