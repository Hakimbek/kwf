import { Reports } from "./Reports.tsx";

export const ReportGroup = () => {
    return (
        <div className="d-flex flex-column gap-3">
            <Reports />
            <Reports manager="Murod" />
            <Reports manager="Farrux" />
            <Reports manager="Shokirjon" />
        </div>
    )
}