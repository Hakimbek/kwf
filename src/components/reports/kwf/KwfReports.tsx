import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";

type ReportsPropsType = {
  manager?: string;
};

export const KwfReports = ({ manager = "All" }: ReportsPropsType) => {
  return (
    <div className="report-wrapper">
      <p className="vertical">{manager}</p>
      <div className="d-flex flex-column gap-1">
        <p className="vertical flex-fill">Sotuv</p>
        <p className="vertical flex-fill">A K B</p>
      </div>
      <div className="report w-25">
        <div className="flex-fill">
          <BarChartComponent type="Sum" data="kwfData" managerName={manager} />
        </div>
        <div className="flex-fill">
          <BarChartComponent type="AKB" data="kwfData" managerName={manager} />
        </div>
      </div>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column gap-1">
          <p className="vertical flex-fill">Product</p>
          <p className="vertical flex-fill">Regions</p>
        </div>
        <div className="d-flex flex-column gap-1">
          <p className="vertical flex-fill">Product</p>
          <p className="vertical flex-fill">Regions</p>
        </div>
      </div>
      <div className="report">
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            productName="wRSC"
            title="wRSC"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            productName="non-RSC"
            title="non-RSC"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            productName="RSC"
            title="RSC"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            productName="SnP"
            title="SnP"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            productName="SnP Lam"
            title="SnP Lam"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            productName="Гофролист"
            title="Гофролист"
          />
          {/*<BarChartComponent type="Sum" data="kwfData" managerName={manager} productName="Монокартон" title="Монокартон" />*/}
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            regionName="Бухоро ва Навоий вилояти"
            title="Buxoro va Navoiy"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            regionName="Водий: ФАН"
            title="Vodiy: FAN"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            regionName="Кашкадарё ва Сурхондарё вилояти"
            title="Kash va Surx"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
            title="Sam, Jizz, Sir"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            regionName="Тошкент вилояти ва шахри"
            title="Toshkent"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            regionName="Хоразм вилояти ва Коракалпогистон"
            title="Xorazm va QQP"
          />
          <BarChartComponent
            type="Sum"
            data="kwfData"
            managerName={manager}
            regionName="Экспорт (кушни)"
            title="Eksport (kushni)"
          />
          {/*<BarChartComponent type="Sum" data="kwfData" managerName={manager} regionName="Экспорт (кушни эмас)" title="Eksport (kushni emas)" />*/}
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            productName="wRSC"
            title="wRSC"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            productName="non-RSC"
            title="non-RSC"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            productName="RSC"
            title="RSC"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            productName="SnP"
            title="SnP"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            productName="SnP Lam"
            title="SnP Lam"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            productName="Гофролист"
            title="Гофролист"
          />
          {/*<BarChartComponent type="AKB" data="kwfData" managerName={manager} productName="Монокартон" title="Монокартон" />*/}
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            regionName="Бухоро ва Навоий вилояти"
            title="Buxoro va Navoiy"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            regionName="Водий: ФАН"
            title="Vodiy: FAN"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            regionName="Кашкадарё ва Сурхондарё вилояти"
            title="Kash va Surx"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
            title="Sam, Jizz, Sir"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            regionName="Тошкент вилояти ва шахри"
            title="Toshkent"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            regionName="Хоразм вилояти ва Коракалпогистон"
            title="Xorazm va QQP"
          />
          <BarChartComponent
            type="AKB"
            data="kwfData"
            managerName={manager}
            regionName="Экспорт (кушни)"
            title="Eksport (kushni)"
          />
          {/*<BarChartComponent type="AKB" data="kwfData" managerName={manager} regionName="Экспорт (кушни эмас)" title="Eksport (kushni emas)" />*/}
        </div>
      </div>
    </div>
  );
};
