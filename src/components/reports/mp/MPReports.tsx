import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";
import { Title } from "../../title/Title.tsx";

export const MPReports = () => {
  return (
    <>
      <div className="d-flex align-items-center gap-3 px-3">
        <div className="w-100 d-flex flex-column gap-3">
          <Title name="Сотув" />
          <BarChartComponent type="Sum" title="ЖАМИ" />
        </div>
        <div className="w-100 d-flex flex-column gap-3">
          <Title name="KPI" />
          <BarChartComponent type="Sum" title="KPI" />
        </div>
        <div className="w-100 d-flex flex-column gap-3">
          <Title name="АКБ" />
          <BarChartComponent type="AKB" title="ЖАМИ" />
        </div>
      </div>
      <div className="d-flex">
        <div className="sales">
          <Title name="Продукт" />
          <div className="d-flex gap-3">
            <BarChartComponent
              product="Karton CelLayner"
              type="Sum"
              title="CelLa"
            />
            <BarChartComponent
              product="Karton OqLayner"
              type="Sum"
              title="OqLa"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent
              product="Karton К0 120гр"
              type="Sum"
              title="К0"
            />
            <BarChartComponent
              product="Karton К1 120гр"
              type="Sum"
              title="К1"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent product="Karton B1" type="Sum" title="B1" />
            <BarChartComponent
              product="Karton B2+ 100gr"
              type="Sum"
              title="B2+ 100gr"
            />
            <BarChartComponent
              product="Karton B2+ 120gr"
              type="Sum"
              title="B2+ 120gr"
            />
          </div>
          <Title name="Регион" />
          <div className="d-flex gap-3">
            <BarChartComponent
              region="Хоразм ва Коракалпогистон"
              type="Sum"
              title="Хоразм ва ККП"
            />
            <BarChartComponent
              region="Бухоро ва Навоий"
              type="Sum"
              title="Бухоро ва Навоий"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent
              region="Водий: (ФАН)"
              type="Sum"
              title="Водий: (ФАН)"
            />
            <BarChartComponent
              region="Сам, Джиз, Сирд"
              type="Sum"
              title="Сам, Джиз, Сирд"
            />
            <BarChartComponent
              region="Тошкент вилоят ва шахар"
              type="Sum"
              title="Тошкент"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent
              region="Кашкадарё ва Сурхондарё"
              type="Sum"
              title="Каш. ва Сурх."
            />
            <BarChartComponent
              region="Eksport (кушни)"
              type="Sum"
              title="Экспорт к."
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent
              region="Karton Works"
              type="Sum"
              title="Karton Works"
            />
            <BarChartComponent
              region="Дилер: Union Paper"
              type="Sum"
              title="Диллер"
            />
          </div>
        </div>
        <div className="akb">
          <Title name="Продукт" />
          <div className="d-flex gap-3">
            <BarChartComponent
              product="Karton CelLayner"
              type="AKB"
              title="CelLa"
            />
            <BarChartComponent
              product="Karton OqLayner"
              type="AKB"
              title="OqLa"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent
              product="Karton К0 120гр"
              type="AKB"
              title="К0"
            />
            <BarChartComponent
              product="Karton К1 120гр"
              type="AKB"
              title="К1"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent product="Karton B1" type="AKB" title="B1" />
            <BarChartComponent
              product="Karton B2+ 100gr"
              type="AKB"
              title="B2+ 100gr"
            />
            <BarChartComponent
              product="Karton B2+ 120gr"
              type="AKB"
              title="B2+ 120gr"
            />
          </div>
          <Title name="Регион" />
          <div className="d-flex gap-3">
            <BarChartComponent
              region="Хоразм ва Коракалпогистон"
              type="AKB"
              title="Хоразм ва ККП"
            />
            <BarChartComponent
              region="Бухоро ва Навоий"
              type="AKB"
              title="Бухоро ва Навоий"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent
              region="Водий: (ФАН)"
              type="AKB"
              title="Водий: (ФАН)"
            />
            <BarChartComponent
              region="Сам, Джиз, Сирд"
              type="AKB"
              title="Сам, Джиз, Сирд"
            />
            <BarChartComponent
              region="Тошкент вилоят ва шахар"
              type="AKB"
              title="Тошкент"
            />
          </div>
          <div className="d-flex gap-3">
            <BarChartComponent
              region="Кашкадарё ва Сурхондарё"
              type="AKB"
              title="Каш. ва Сурх."
            />
            <BarChartComponent
              region="Eksport (кушни)"
              type="AKB"
              title="Экспорт к."
            />
          </div>
        </div>
      </div>
    </>
  );
};
