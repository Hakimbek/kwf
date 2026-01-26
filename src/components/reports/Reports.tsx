import { BarChartComponent } from "../chart/BarChartComponent.tsx";
import "./Reports.css";

export const Reports = () => {
  return (
      <div className="reports-wrapper">
          <div className="d-flex gap-4">
              <BarChartComponent type="Sum" height={200} title="Sotuv" />
              <BarChartComponent type="AKB" height={200} title="AKB" />
          </div>
      </div>
  );
};
