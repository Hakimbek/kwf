import { BarChartComponent } from "../chart/BarChartComponent.tsx";
import useLocalStorage from "use-local-storage";
import { sumData } from "../../utils/groupByField.tsx";
import "./Product.css";

type ProductPropsType = {
  productName: string;
  managerName: string;
};

export const Product = ({ productName, managerName }: ProductPropsType) => {
  const [rawData] = useLocalStorage("rawData", "");
  const sales = sumData(rawData ? JSON.parse(rawData) : [], "Sum", {
    Manager: managerName,
    Product: productName
  });
  const akb = sumData(rawData ? JSON.parse(rawData) : [], "AKB", {
    Manager: managerName,
    Product: productName
  });

  return (
    <div className="w-100">
      <p className="manager-header">{productName}</p>
      <div>
        <div className="manager-sales">
          <p className="manager-title">Sales</p>
          <BarChartComponent aggregatedData={sales} height={90} />
        </div>
        <div className="manager-akb">
          <p className="manager-title">AKB</p>
          <BarChartComponent aggregatedData={akb} height={90} />
        </div>
      </div>
    </div>
  );
};
