import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";

export const KWFReports = () => {
  return (
    <div className="reports-wrapper">
      <div className="d-flex">
        <div className="separator">Сотув</div>
        <div className="separator">АКБ</div>
      </div>
      <div className="d-flex gap-3">
        <div className="sales">
          <BarChartComponent
              type="Sum"
              height={170}
              title="Жами"
              titleSize={20}
              labelSize={18}
              x={380}
              y={25}
              top={30}
              left={30}
              right={50}
          />
          <div className="separator top-border">Продукт</div>
          <div className="d-flex gap-4">
            <BarChartComponent
                productName="wRSC"
                type="Sum"
                height={150}
                title="wRSC"
                labelSize={12}
                x={110}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                productName="non-RSC"
                type="Sum"
                height={150}
                title="non-RSC"
                labelSize={12}
                x={110}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                productName="RSC"
                type="Sum"
                height={150}
                title="RSC"
                labelSize={12}
                x={110}
                y={20}
                top={25}
                right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
                productName="SnP"
                type="Sum"
                height={130}
                title="SnP"
                titleSize={13}
                labelSize={12}
                x={80}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                productName="SnP Lam"
                type="Sum"
                height={130}
                title="SnP Lam"
                titleSize={13}
                labelSize={12}
                x={65}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                productName="Гофролист"
                type="Sum"
                height={130}
                title="Гофролист"
                titleSize={13}
                labelSize={12}
                x={55}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                productName="Монокартон"
                type="Sum"
                height={130}
                title="Монокартон"
                titleSize={13}
                labelSize={12}
                x={55}
                y={20}
                top={25}
                right={30}
            />
          </div>
          <div className="separator top-border">Регион</div>
          <div className="d-flex gap-4">
            <BarChartComponent
                regionName="Хоразм вилояти ва Коракалпогистон"
                type="Sum"
                height={150}
                title="Хоразм ва ККП"
                labelSize={12}
                x={150}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Бухоро ва Навоий вилояти"
                type="Sum"
                height={150}
                title="Бухоро ва Навоий"
                labelSize={12}
                x={130}
                y={20}
                top={25}
                right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
                regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
                type="Sum"
                height={150}
                title="Сам. Жиз. Сир."
                labelSize={12}
                x={150}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Тошкент вилояти ва шахри"
                type="Sum"
                height={150}
                title="Тошкент"
                labelSize={12}
                x={170}
                y={20}
                top={25}
                right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
                regionName="Водий: ФАН"
                type="Sum"
                height={130}
                title="Водий: ФАН"
                titleSize={12}
                labelSize={12}
                x={60}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Кашкадарё ва Сурхондарё вилояти"
                type="Sum"
                height={130}
                title="Каш. ва Сурх."
                titleSize={12}
                labelSize={12}
                x={55}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Экспорт (кушни)"
                type="Sum"
                height={130}
                title="Экспорт (кушни)"
                titleSize={12}
                labelSize={12}
                x={45}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Экспорт (кушни эмас)"
                type="Sum"
                height={130}
                title="Экспорт (кушни эмас)"
                titleSize={12}
                labelSize={12}
                x={25}
                y={20}
                top={25}
                right={30}
            />
          </div>
        </div>
        <div className="akb">
          <BarChartComponent
              type="AKB"
              height={170}
              title="Жами"
              titleSize={20}
              labelSize={18}
              x={380}
              y={25}
              top={30}
              left={30}
              right={50}
          />
          <div className="separator top-border">Продукт</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="wRSC"
              type="AKB"
              height={150}
              title="wRSC"
              labelSize={12}
              x={110}
              y={20}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="non-RSC"
              type="AKB"
              height={150}
              title="non-RSC"
              labelSize={12}
              x={110}
              y={20}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="RSC"
              type="AKB"
              height={150}
              title="RSC"
              labelSize={12}
              x={110}
              y={20}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="SnP"
              type="AKB"
              height={130}
              title="SnP"
              titleSize={13}
              labelSize={12}
              x={80}
              y={20}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="SnP Lam"
              type="AKB"
              height={130}
              title="SnP Lam"
              titleSize={13}
              labelSize={12}
              x={65}
              y={20}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Гофролист"
              type="AKB"
              height={130}
              title="Гофролист"
              titleSize={13}
              labelSize={12}
              x={55}
              y={20}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Монокартон"
              type="AKB"
              height={130}
              title="Монокартон"
              titleSize={13}
              labelSize={12}
              x={55}
              y={20}
              top={25}
              right={30}
            />
          </div>
          <div className="separator top-border">Регион</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Хоразм вилояти ва Коракалпогистон"
              type="AKB"
              height={150}
              title="Хоразм ва ККП"
              labelSize={12}
              x={140}
              y={20}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Бухоро ва Навоий вилояти"
              type="AKB"
              height={150}
              title="Бухоро ва Навоий"
              labelSize={12}
              x={140}
              y={20}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
                regionName="Самарканд, Жиззах ва Сирдайрё вилояти"
                type="AKB"
                height={150}
                title="Сам. Жиз. Сир."
                labelSize={12}
                x={140}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Тошкент вилояти ва шахри"
                type="AKB"
                height={150}
                title="Тошкент"
                labelSize={12}
                x={170}
                y={20}
                top={25}
                right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
                regionName="Водий: ФАН"
                type="AKB"
                height={130}
                title="Водий: ФАН"
                titleSize={12}
                labelSize={12}
                x={60}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Кашкадарё ва Сурхондарё вилояти"
                type="AKB"
                height={130}
                title="Каш. ва Сурх."
                titleSize={12}
                labelSize={12}
                x={50}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Экспорт (кушни)"
                type="AKB"
                height={130}
                title="Экспорт (кушни)"
                titleSize={12}
                labelSize={12}
                x={45}
                y={20}
                top={25}
                right={30}
            />
            <BarChartComponent
                regionName="Экспорт (кушни эмас)"
                type="AKB"
                height={130}
                title="Экспорт (кушни эмас)"
                titleSize={12}
                labelSize={12}
                x={25}
                y={20}
                top={25}
                right={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
