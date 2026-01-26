import { BarChartComponent } from "../chart/BarChartComponent.tsx";

export const Reports = () => {
  return (
      <div>
          <BarChartComponent type="Sum" />
          <BarChartComponent type="AKB" />
      </div>
  );
};
