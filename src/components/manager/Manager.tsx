import { BarChartComponent } from "../chart/BarChartComponent.tsx";
import useLocalStorage from "use-local-storage";
import { sumData } from "../../utils/groupByField.tsx";
import "./Manager.css";

type ManagerPropsType = {
  managerName: string;
};

export const Manager = ({ managerName }: ManagerPropsType) => {
  const [rawData] = useLocalStorage("rawData", "");
  const sales = sumData(rawData ? JSON.parse(rawData) : [], "Sum", {
    Manager: managerName,
  });
  const akb = sumData(rawData ? JSON.parse(rawData) : [], "AKB", {
    Manager: managerName,
  });

  return (
    <div className="w-100">
      <h4 className="manager-header">{managerName}</h4>
      <div className="d-flex">
        <div className="manager-sales">
          <h5 className="manager-title">Sales</h5>
          <BarChartComponent aggregatedData={sales} height={90} />
        </div>
        <div className="manager-akb">
          <h5 className="manager-title">AKB</h5>
          <BarChartComponent aggregatedData={akb} height={90} />
        </div>
      </div>
    </div>
  );
};
