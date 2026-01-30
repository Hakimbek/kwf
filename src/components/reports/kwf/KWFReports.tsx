import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import { Title } from "../../title/Title.tsx";
import "../Reports.css";

export const KWFReports = () => {
  return (
    <div className="d-flex">
      <div className="sales">
        <Title name="Сотув" />
        <BarChartComponent type="Sum" title="ЖАМИ" />
        <Title name="Продукт" />
        <div className="d-flex gap-3">
          <BarChartComponent productName="non-RSC" type="Sum" title="non-RSC" />
          <BarChartComponent productName="wRSC" type="Sum" title="wRSC" />
          <BarChartComponent productName="RSC" type="Sum" title="RSC" />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent productName="SnP" type="Sum" title="SnP" />
          <BarChartComponent productName="SnP Lam" type="Sum" title="SnP Lam" />
          <BarChartComponent
            productName="Гофролист"
            type="Sum"
            title="Гофролист"
          />
        </div>
        <Title name="Регион" />
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Хоразм вилояти ва Коракалпогистон"
            type="Sum"
            title="Хоразм ва ККП"
          />
          <BarChartComponent
            regionName="Бухоро ва Навоий вилояти"
            type="Sum"
            title="Бухоро ва Навоий"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
            type="Sum"
            title="Сам. Жиз. Сир."
          />
          <BarChartComponent
            regionName="Тошкент вилояти ва шахри"
            type="Sum"
            title="Тошкент"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Водий: ФАН"
            type="Sum"
            title="Водий: ФАН"
          />
          <BarChartComponent
            regionName="Кашкадарё ва Сурхондарё вилояти"
            type="Sum"
            title="Каш. ва Сурх."
          />
          <BarChartComponent
            regionName="Экспорт (кушни)"
            type="Sum"
            title="Экспорт к."
          />
        </div>
      </div>
      <div className="akb">
        <Title name="АКБ" />
        <BarChartComponent type="AKB" title="ЖАМИ" />
        <Title name="Продукт" />
        <div className="d-flex gap-3">
          <BarChartComponent productName="wRSC" type="AKB" title="wRSC" />
          <BarChartComponent productName="non-RSC" type="AKB" title="non-RSC" />
          <BarChartComponent productName="RSC" type="AKB" title="RSC" />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent productName="SnP" type="AKB" title="SnP" />
          <BarChartComponent productName="SnP Lam" type="AKB" title="SnP Lam" />
          <BarChartComponent
            productName="Гофролист"
            type="AKB"
            title="Гофролист"
          />
        </div>
        <Title name="Регион" />
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Хоразм вилояти ва Коракалпогистон"
            type="AKB"
            title="Хоразм ва ККП"
          />
          <BarChartComponent
            regionName="Бухоро ва Навоий вилояти"
            type="AKB"
            title="Бухоро ва Навоий"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
            type="AKB"
            title="Сам. Жиз. Сир."
          />
          <BarChartComponent
            regionName="Тошкент вилояти ва шахри"
            type="AKB"
            title="Тошкент"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            regionName="Водий: ФАН"
            type="AKB"
            title="Водий: ФАН"
          />
          <BarChartComponent
            regionName="Кашкадарё ва Сурхондарё вилояти"
            type="AKB"
            title="Каш. ва Сурх."
          />
          <BarChartComponent
            regionName="Экспорт (кушни)"
            type="AKB"
            title="Экспорт к."
          />
        </div>
      </div>
    </div>
  );
};
