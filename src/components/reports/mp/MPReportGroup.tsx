import { MPReports } from "./MPReports.tsx";

export const MPReportGroup = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <MPReports />
      <MPReports manager="Шомуратов Улугбек" />
      <MPReports manager="Хаджиов Умид" />
    </div>
  );
};
