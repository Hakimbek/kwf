import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import { Title } from "../../title/Title.tsx";
import "../Reports.css";

export const KWFReports = () => {
  return (
    <>
      <div className="d-flex align-items-center gap-3 px-3">
        <div className="w-100 d-flex flex-column gap-3">
          <Title name="Сотув" />
          <BarChartComponent type="Sum" title="ЖАМИ" />
        </div>
        <div className="w-100 d-flex flex-column gap-3">
          <Title name="KPI" />
          <BarChartComponent type="KPI" title="KPI" />
        </div>
        <div className="w-100 d-flex flex-column gap-3">
          <Title name="АКБ" />
          <BarChartComponent type="AKB" title="ЖАМИ" />
        </div>
      </div>
      <div className="px-3 my-3">
        <Title name="Продукт" />
      </div>
      <div className="w-100 mb-3 px-3 gap-3 d-flex flex-column">
        <div className="d-flex gap-3">
          <BarChartComponent product="non-RSC" type="Sum" title="non-RSC" />
          <BarChartComponent product="wRSC" type="Sum" title="wRSC" />
          <BarChartComponent product="RSC" type="Sum" title="RSC" />
          <BarChartComponent product="wRSC" type="AKB" title="wRSC" />
          <BarChartComponent product="non-RSC" type="AKB" title="non-RSC" />
          <BarChartComponent product="RSC" type="AKB" title="RSC" />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent product="SnP" type="Sum" title="SnP" />
          <BarChartComponent product="SnP Lam" type="Sum" title="SnP Lam" />
          <BarChartComponent product="Гофролист" type="Sum" title="Гофролист" />
          <BarChartComponent product="SnP" type="AKB" title="SnP" />
          <BarChartComponent product="SnP Lam" type="AKB" title="SnP Lam" />
          <BarChartComponent product="Гофролист" type="AKB" title="Гофролист" />
        </div>
      </div>
      <div className="px-3 my-3">
        <Title name="Регион" />
      </div>
      <div className="w-100 mb-3 px-3 gap-3 d-flex flex-column">
        <div className="d-flex gap-3">
          <BarChartComponent
            region="Хоразм вилояти ва Коракалпогистон"
            type="Sum"
            title="Хоразм ва ККП"
          />
          <BarChartComponent
            region="Бухоро ва Навоий вилояти"
            type="Sum"
            title="Бухоро ва Навоий"
          />
          <BarChartComponent
            region="Хоразм вилояти ва Коракалпогистон"
            type="AKB"
            title="Хоразм ва ККП"
          />
          <BarChartComponent
            region="Бухоро ва Навоий вилояти"
            type="AKB"
            title="Бухоро ва Навоий"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            region="Самарканд, Жиззах ва Сирдайрё вилояти"
            type="Sum"
            title="Сам. Жиз. Сир."
          />
          <BarChartComponent
            region="Тошкент вилояти ва шахри"
            type="Sum"
            title="Тошкент"
          />
          <BarChartComponent
            region="Самарканд, Жиззах ва Сирдайрё вилояти"
            type="AKB"
            title="Сам. Жиз. Сир."
          />
          <BarChartComponent
            region="Тошкент вилояти ва шахри"
            type="AKB"
            title="Тошкент"
          />
        </div>
        <div className="d-flex gap-3">
          <BarChartComponent
            region="Водий: ФАН"
            type="Sum"
            title="Водий: ФАН"
          />
          <BarChartComponent
            region="Кашкадарё ва Сурхондарё вилояти"
            type="Sum"
            title="Каш. ва Сурх."
          />
          <BarChartComponent
            region="Экспорт (кушни)"
            type="Sum"
            title="Экспорт к."
          />
          <BarChartComponent
            region="Водий: ФАН"
            type="AKB"
            title="Водий: ФАН"
          />
          <BarChartComponent
            region="Кашкадарё ва Сурхондарё вилояти"
            type="AKB"
            title="Каш. ва Сурх."
          />
          <BarChartComponent
            region="Экспорт (кушни)"
            type="AKB"
            title="Экспорт к."
          />
        </div>
      </div>
    </>
  );
};
