import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";

export const KWFReports = () => {
  return (
    <div className="reports-wrapper">
      <div className="d-flex">
        <div className="separator">Сотув</div>
        <div className="separator">АКБ</div>
      </div>
      <div className="d-flex">
        <div className="sales">
          <BarChartComponent
            type="Sum"
            title="ЖАМИ"
            labelSize={18}
            top={30}
            left={30}
            right={50}
          />
          <div className="separator top-border">Продукт</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="non-RSC"
              type="Sum"
              title="non-RSC"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="wRSC"
              type="Sum"
              title="wRSC"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="RSC"
              type="Sum"
              title="RSC"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="SnP"
              type="Sum"
              title="SnP"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="SnP Lam"
              type="Sum"
              title="SnP Lam"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Гофролист"
              type="Sum"
              title="Гофролист"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Монокартон"
              type="Sum"
              title="Монокартон"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="separator top-border">Регион</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Хоразм вилояти ва Коракалпогистон"
              type="Sum"
              title="Хоразм ва ККП"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Бухоро ва Навоий вилояти"
              type="Sum"
              title="Бухоро ва Навоий"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
              type="Sum"
              title="Сам. Жиз. Сир."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Тошкент вилояти ва шахри"
              type="Sum"
              title="Тошкент"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Водий: ФАН"
              type="Sum"
              title="Водий: ФАН"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Кашкадарё ва Сурхондарё вилояти"
              type="Sum"
              title="Каш. ва Сурх."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Экспорт (кушни)"
              type="Sum"
              title="Экспорт к."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Экспорт (кушни эмас)"
              type="Sum"
              title="Экспорт к. э."
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
        </div>
        <div className="akb">
          <BarChartComponent
            type="AKB"
            title="ЖАМИ"
            labelSize={18}
            top={30}
            left={30}
            right={50}
          />
          <div className="separator top-border">Продукт</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="wRSC"
              type="AKB"
              title="wRSC"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="non-RSC"
              type="AKB"
              title="non-RSC"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="RSC"
              type="AKB"
              title="RSC"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="SnP"
              type="AKB"
              title="SnP"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="SnP Lam"
              type="AKB"
              title="SnP Lam"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Гофролист"
              type="AKB"
              title="Гофролист"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Монокартон"
              type="AKB"
              title="Монокартон"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="separator top-border">Регион</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Хоразм вилояти ва Коракалпогистон"
              type="AKB"
              title="Хоразм ва ККП"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Бухоро ва Навоий вилояти"
              type="AKB"
              title="Бухоро ва Навоий"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
              type="AKB"
              title="Сам. Жиз. Сир."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Тошкент вилояти ва шахри"
              type="AKB"
              title="Тошкент"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Водий: ФАН"
              type="AKB"
              title="Водий: ФАН"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Кашкадарё ва Сурхондарё вилояти"
              type="AKB"
              title="Каш. ва Сурх."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Экспорт (кушни)"
              type="AKB"
              title="Экспорт к."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Экспорт (кушни эмас)"
              type="AKB"
              title="Экспорт к. э."
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
