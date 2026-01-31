import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";
import { Title } from "../../title/Title.tsx";

export const MPReports = () => {
  return (
    <div className="d-flex">
      <div className="sales">
        <Title name="Сотув" />
        <BarChartComponent type="Sum" title="ЖАМИ" />
        <Title name="Продукт" />
        <div className="d-flex gap-3">
          <BarChartComponent
            productName="Karton CelLayner"
            type="Sum"
            title="CelLa"
          />
          <BarChartComponent
            productName="Karton OqLayner"
            type="Sum"
            title="OqLa"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            productName="Karton К0 120гр"
            type="Sum"
            title="К0"
          />
          <BarChartComponent
            productName="Karton К1 120гр"
            type="Sum"
            title="К1"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent productName="Karton B0" type="Sum" title="B0" />
          <BarChartComponent productName="Karton B1" type="Sum" title="B1" />
          <BarChartComponent
            productName="Karton B2+ 100gr"
            type="Sum"
            title="B2+ 100gr"
          />
          <BarChartComponent
            productName="Karton B2+ 120gr"
            type="Sum"
            title="B2+ 120gr"
          />
        </div>
        <Title name="Регион" />
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Хоразм ва Коракалпогистон"
            type="Sum"
            title="Хоразм ва ККП"
          />
          <BarChartComponent
            regionName="Бухоро ва Навоий"
            type="Sum"
            title="Бухоро ва Навоий"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Водий: (ФАН)"
            type="Sum"
            title="Водий: (ФАН)"
          />
          <BarChartComponent
            regionName="Сам, Джиз, Сирд"
            type="Sum"
            title="Сам, Джиз, Сирд"
          />
          <BarChartComponent
            regionName="Тошкент вилоят ва шахар"
            type="Sum"
            title="Тошкент"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Кашкадарё ва Сурхондарё"
            type="Sum"
            title="Каш. ва Сурх."
          />
          <BarChartComponent
            regionName="Eksport (кушни)"
            type="Sum"
            title="Экспорт к."
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Karton Works"
            type="Sum"
            title="Karton Works"
          />
          <BarChartComponent regionName="SnP" type="Sum" title="SnP" />
          <BarChartComponent
            regionName="Дилер: Union Paper"
            type="Sum"
            title="Диллер"
          />
        </div>
      </div>
      <div className="akb">
        <Title name="АКБ" />
        <BarChartComponent type="AKB" title="ЖАМИ" />
        <Title name="Продукт" />
        <div className="d-flex gap-3">
          <BarChartComponent
            productName="Karton CelLayner"
            type="AKB"
            title="CelLa"
          />
          <BarChartComponent
            productName="Karton OqLayner"
            type="AKB"
            title="OqLa"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            productName="Karton К0 120гр"
            type="AKB"
            title="К0"
          />
          <BarChartComponent
            productName="Karton К1 120гр"
            type="AKB"
            title="К1"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent productName="Karton B0" type="AKB" title="B0" />
          <BarChartComponent productName="Karton B1" type="AKB" title="B1" />
          <BarChartComponent
            productName="Karton B2+ 100gr"
            type="AKB"
            title="B2+ 100gr"
          />
          <BarChartComponent
            productName="Karton B2+ 120gr"
            type="AKB"
            title="B2+ 120gr"
          />
        </div>
        <Title name="Регион" />
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Хоразм ва Коракалпогистон"
            type="AKB"
            title="Хоразм ва ККП"
          />
          <BarChartComponent
            regionName="Бухоро ва Навоий"
            type="AKB"
            title="Бухоро ва Навоий"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Водий: (ФАН)"
            type="AKB"
            title="Водий: (ФАН)"
          />
          <BarChartComponent
            regionName="Сам, Джиз, Сирд"
            type="AKB"
            title="Сам, Джиз, Сирд"
          />
          <BarChartComponent
            regionName="Тошкент вилоят ва шахар"
            type="AKB"
            title="Тошкент"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Кашкадарё ва Сурхондарё"
            type="AKB"
            title="Каш. ва Сурх."
          />
          <BarChartComponent
            regionName="Eksport (кушни)"
            type="AKB"
            title="Экспорт к."
          />
        </div>
      </div>
    </div>
  );
};
