import { BarChartComponent } from "../chart/BarChartComponent.tsx";
import "./Reports.css";

type ReportsPropsType = {
  manager?: string;
}

export const Reports = ({ manager = "All" }: ReportsPropsType) => {
  return (
      <div className="report-wrapper">
        <p className="vertical">{manager}</p>
        <div className="d-flex flex-column gap-1">
          <p className="vertical flex-fill">Sotuv</p>
          <p className="vertical flex-fill">A K B</p>
        </div>
        <div className="report w-25">
          <div className="flex-fill">
            <BarChartComponent type="Sum" data="kwfData" />
          </div>
          <div className="flex-fill">
            <BarChartComponent type="AKB" data="kwfData" />
          </div>
        </div>
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-column gap-1">
            <p className="vertical flex-fill">Product</p>
            <p className="vertical flex-fill">Reg ion</p>
          </div>
          <div className="d-flex flex-column gap-1">
            <p className="vertical flex-fill">Product</p>
            <p className="vertical flex-fill">Reg ion</p>
          </div>
        </div>
        <div className="report">
          <div className="d-flex flex-fill gap-1">
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="wRSC" title="wRSC" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="non-RSC" title="non-RSC" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="RSC" title="RSC" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="SnP" title="SnP" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="SnP Lam" title="SnP Lam" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="Gofrolist" title="Gofrolist" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="Monokarton" title="Monokarton" />
          </div>
          <div className="d-flex flex-fill gap-1">
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Buxoro va Navoiy" title="Buxoro va Navoiy" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Vodiy: FAN" title="Vodiy: FAN" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Kash va Surx" title="Kash va Surx" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Sam, Jizz, Sir" title="Sam, Jizz, Sir" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Toshkent" title="Toshkent" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Xorazm va QQP" title="Xorazm va QQP" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Eksport (kushni)" title="Eksport (kushni)" />
            <BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Eksport (kushni emas)" title="Eksport (kushni emas)" />
          </div>
          <div className="d-flex flex-fill gap-1">
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="wRSC" title="wRSC" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="non-RSC" title="non-RSC" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="RSC" title="RSC" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="SnP" title="SnP" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="SnP Lam" title="SnP Lam" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="Gofrolist" title="Gofrolist" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="Monokarton" title="Monokarton" />
          </div>
          <div className="d-flex flex-fill gap-1">
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Buxoro va Navoiy" title="Buxoro va Navoiy" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Vodiy: FAN" title="Vodiy: FAN" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Kash va Surx" title="Kash va Surx" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Sam, Jizz, Sir" title="Sam, Jizz, Sir" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Toshkent" title="Toshkent" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Xorazm va QQP" title="Xorazm va QQP" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Eksport (kushni)" title="Eksport (kushni)" />
            <BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Eksport (kushni emas)" title="Eksport (kushni emas)" />
          </div>
        </div>
      </div>
  );
};
