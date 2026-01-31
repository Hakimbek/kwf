import { Title } from "../title/Title.tsx";
import "./KPI.css";

export const KPI = () => {
  return (
    <div className="kpi-wrapper">
      <div className="ideal">
          <Title name="Ideal" />
          <div className="salary">15000</div>
      </div>
      <div className="fact">
          <Title name="Fact" />
          <div className="salary">25000</div>
      </div>
    </div>
  );
};
