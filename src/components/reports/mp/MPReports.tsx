import { BarChartComponent } from "../../chart/BarChartComponent.tsx";

type ReportsPropsType = {
  manager?: string;
};

export const MPReports = ({ manager = "All" }: ReportsPropsType) => {
  return (
    <div className="report-wrapper">
      <p className="vertical">{manager}</p>
      <div className="d-flex flex-column gap-1">
        <p className="vertical flex-fill">Sotuv</p>
        <p className="vertical flex-fill">A K B</p>
      </div>
      <div className="report w-25">
        <div className="flex-fill">
          <BarChartComponent type="Sum" data="mpData" managerName={manager} />
        </div>
        <div className="flex-fill">
          <BarChartComponent type="AKB" data="mpData" managerName={manager} />
        </div>
      </div>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-column gap-1">
          <p className="vertical flex-fill ch-1">Product</p>
          <p className="vertical flex-fill ch-2">Regions</p>
        </div>
        <div className="d-flex flex-column gap-1">
          <p className="vertical flex-fill ch-1">Product</p>
          <p className="vertical flex-fill ch-2">Regions</p>
        </div>
      </div>
      <div className="report">
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            productName="Karton B0"
            title="B0"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            productName="Karton B2+ 100gr"
            title="B2 100"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            productName="Karton B2+ 120gr"
            title="B2 120"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            productName="Karton CelLayner"
            title="CelLa"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            productName="Karton OqLayner"
            title="OqLa"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            productName="Karton К0 120гр"
            title="K0"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            productName="Karton К1 120гр"
            title="K1"
          />
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Бухоро ва Навоий"
            title="Buxoro va Navoiy"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Водий: (ФАН)"
            title="Vodiy: FAN"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Дилер: Union Paper"
            title="Kash va Surx"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Кашкадарё ва Сурхондарё"
            title="Sam, Jizz, Sir"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Сам, Джиз, Сирд"
            title="Toshkent"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Тошкент вилоят ва шахар"
            title="Xorazm va QQP"
          />
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Тошкент вилоят ва шахар"
            title="Xorazm va QQP"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Хоразм ва Коракалпогистон"
            title="Xorazm va QQP"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="SnP"
            title="Eksport (kushni)"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Karton Works"
            title="Eksport (kushni)"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Eksport (кушни)"
            title="Eksport (kushni)"
          />
          <BarChartComponent
            type="Sum"
            data="mpData"
            managerName={manager}
            regionName="Eksport (кушни эмас)"
            title="Eksport (kushni emas)"
          />
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            productName="Karton B0"
            title="B0"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            productName="Karton B2+ 100gr"
            title="B2 100"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            productName="Karton B2+ 120gr"
            title="B2 120"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            productName="Karton CelLayner"
            title="CelLa"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            productName="Karton OqLayner"
            title="OqLa"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            productName="Karton К0 120гр"
            title="K0"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            productName="Karton К1 120гр"
            title="K1"
          />
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Бухоро ва Навоий"
            title="Buxoro va Navoiy"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Водий: (ФАН)"
            title="Vodiy: FAN"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Дилер: Union Paper"
            title="Kash va Surx"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Кашкадарё ва Сурхондарё"
            title="Sam, Jizz, Sir"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Сам, Джиз, Сирд"
            title="Toshkent"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Тошкент вилоят ва шахар"
            title="Xorazm va QQP"
          />
        </div>
        <div className="d-flex flex-fill gap-1">
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Тошкент вилоят ва шахар"
            title="Xorazm va QQP"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Хоразм ва Коракалпогистон"
            title="Xorazm va QQP"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="SnP"
            title="Eksport (kushni)"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Karton Works"
            title="Eksport (kushni)"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Eksport (кушни)"
            title="Eksport (kushni)"
          />
          <BarChartComponent
            type="AKB"
            data="mpData"
            managerName={manager}
            regionName="Eksport (кушни эмас)"
            title="Eksport (kushni emas)"
          />
        </div>
      </div>
    </div>
  );
};
