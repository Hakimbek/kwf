import { BarChartComponent } from "../chart/BarChartComponent.tsx";
import type { GroupedDataType } from "../../utils/groupByField.tsx";
import "./Manager.css";

type ManagerPropsType = {
  sales: GroupedDataType[];
  akb: GroupedDataType[];
};

export const Manager = ({ sales, akb }: ManagerPropsType) => {
  return (
    <div className="manager-container">
      <div className="manager-sales">
        <h4 className="manager-title">Sales</h4>
        <BarChartComponent aggregatedData={sales} height={200} />
      </div>
      <div className="manager-akb">
        <h4 className="manager-title">AKB</h4>
        <BarChartComponent aggregatedData={akb} height={200} />
      </div>
    </div>
  );
};
