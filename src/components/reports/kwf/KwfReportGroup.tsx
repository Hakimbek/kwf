import { KwfReports } from "./KwfReports.tsx";

export const KwfReportGroup = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <KwfReports />
      <KwfReports manager="Шарипов Мурод" />
      <KwfReports manager="Одилбеков Фаррухбек" />
      <KwfReports manager="Искандаров Шокиржон" />
    </div>
  );
};
