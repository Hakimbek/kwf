import { Reports } from "./Reports.tsx";

export const ReportGroup = () => {
    return (
        <div className="d-flex flex-column gap-3">
            <Reports />
            <Reports manager="Шарипов Мурод" />
            <Reports manager="Одилбеков Фаррухбек" />
            <Reports manager="Искандаров Шокиржон" />
        </div>
    )
}