import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";

export const KWFReports = () => {
  return (
    <div className="reports-wrapper">
      <div className="d-flex">
        <div className="w-100 text-center fs-3 fw-medium border-black border-bottom mx-2">
          Сотув
        </div>
        <div className="w-100 text-center fs-3 fw-medium border-black border-bottom mx-2">
          АКБ
        </div>
      </div>
      <div className="d-flex">
        <div className="sales">
          <BarChartComponent type="Sum" title="ЖАМИ" />
          <div className="d-flex align-items-center gap-2">
            <div className="separator"></div>
            <div className="fs-4 fw-medium">Продукт</div>
            <div className="separator"></div>
          </div>
          <div className="d-flex gap-2">
            <BarChartComponent
              productName="non-RSC"
              type="Sum"
              title="non-RSC"
            />
            <BarChartComponent productName="wRSC" type="Sum" title="wRSC" />
            <BarChartComponent productName="RSC" type="Sum" title="RSC" />
          </div>
          <div className="d-flex gap-2">
            <BarChartComponent productName="SnP" type="Sum" title="SnP" />
            <BarChartComponent
              productName="SnP Lam"
              type="Sum"
              title="SnP Lam"
            />
            <BarChartComponent
              productName="Гофролист"
              type="Sum"
              title="Гофролист"
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="separator"></div>
            <div className="fs-4 fw-medium">Регион</div>
            <div className="separator"></div>
          </div>
          <div className="d-flex gap-2">
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
          <div className="d-flex gap-2">
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
          <div className="d-flex gap-2">
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
          <BarChartComponent type="AKB" title="ЖАМИ" />
          <div className="d-flex align-items-center gap-2">
            <div className="separator"></div>
            <div className="fs-4 fw-medium">Продукт</div>
            <div className="separator"></div>
          </div>
          <div className="d-flex gap-2">
            <BarChartComponent productName="wRSC" type="AKB" title="wRSC" />
            <BarChartComponent
              productName="non-RSC"
              type="AKB"
              title="non-RSC"
            />
            <BarChartComponent productName="RSC" type="AKB" title="RSC" />
          </div>
          <div className="d-flex gap-2">
            <BarChartComponent productName="SnP" type="AKB" title="SnP" />
            <BarChartComponent
              productName="SnP Lam"
              type="AKB"
              title="SnP Lam"
            />
            <BarChartComponent
              productName="Гофролист"
              type="AKB"
              title="Гофролист"
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="separator"></div>
            <div className="fs-4 fw-medium">Регион</div>
            <div className="separator"></div>
          </div>
          <div className="d-flex gap-2">
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
          <div className="d-flex gap-2">
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
          <div className="d-flex gap-2">
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
    </div>
  );
};
