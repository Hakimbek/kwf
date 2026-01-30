import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";

export const MPReports = () => {
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
              productName="Karton CelLayner"
              type="Sum"
              title="CelLa"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton OqLayner"
              type="Sum"
              title="OqLa"
              labelSize={12}
              top={25}
              right={40}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="Karton К0 120гр"
              type="Sum"
              title="К0"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Karton К1 120гр"
              type="Sum"
              title="К1"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="Karton B0"
              type="Sum"
              title="B0"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton B1"
              type="Sum"
              title="B1"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton B2+ 100gr"
              type="Sum"
              title="B2+ 100gr"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton B2+ 120gr"
              type="Sum"
              title="B2+ 120gr"
              labelSize={12}
              top={25}
              right={40}
            />
          </div>
          <div className="separator top-border">Регион</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Хоразм ва Коракалпогистон"
              type="Sum"
              title="Хоразм ва ККП"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Бухоро ва Навоий"
              type="Sum"
              title="Бухоро ва Навоий"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Водий: (ФАН)"
              type="Sum"
              title="Водий: (ФАН)"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Сам, Джиз, Сирд"
              type="Sum"
              title="Сам, Джиз, Сирд"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Тошкент вилоят ва шахар"
              type="Sum"
              title="Тошкент"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Дилер: Union Paper"
              type="Sum"
              title="Дилер"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              regionName="Кашкадарё ва Сурхондарё"
              type="Sum"
              title="Каш. ва Сурх."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Eksport (кушни)"
              type="Sum"
              title="Экспорт к."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Eksport (кушни эмас)"
              type="Sum"
              title="Экспорт к. э."
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Karton Works"
              type="Sum"
              title="Karton Works"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              regionName="SnP"
              type="Sum"
              title="SnP"
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
              productName="Karton CelLayner"
              type="AKB"
              title="CelLa"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton OqLayner"
              type="AKB"
              title="OqLa"
              labelSize={12}
              top={25}
              right={40}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="Karton К0 120гр"
              type="AKB"
              title="К0"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              productName="Karton К1 120гр"
              type="AKB"
              title="К1"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              productName="Karton B0"
              type="AKB"
              title="B0"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton B1"
              type="AKB"
              title="B1"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton B2+ 100gr"
              type="AKB"
              title="B2+ 100gr"
              labelSize={12}
              top={25}
              right={40}
            />
            <BarChartComponent
              productName="Karton B2+ 120gr"
              type="AKB"
              title="B2+ 120gr"
              labelSize={12}
              top={25}
              right={40}
            />
          </div>
          <div className="separator top-border">Регион</div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Хоразм ва Коракалпогистон"
              type="AKB"
              title="Хоразм ва ККП"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Бухоро ва Навоий"
              type="AKB"
              title="Бухоро ва Навоий"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            <BarChartComponent
              regionName="Водий: (ФАН)"
              type="AKB"
              title="Водий: (ФАН)"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Сам, Джиз, Сирд"
              type="AKB"
              title="Сам, Джиз, Сирд"
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Тошкент вилоят ва шахар"
              type="AKB"
              title="Тошкент"
              labelSize={12}
              top={25}
              right={30}
            />
          </div>
          <div className="d-flex gap-4">
            {/*<BarChartComponent*/}
            {/*    regionName="Дилер: Union Paper"*/}
            {/*    type="AKB"*/}
            {/*    title="Дилер"*/}
            {/*    titleSize={14}*/}
            {/*    labelSize={12}*/}
            {/*    top={25}*/}
            {/*    right={30}*/}
            {/*/>*/}
            <BarChartComponent
              regionName="Кашкадарё ва Сурхондарё"
              type="AKB"
              title="Каш. ва Сурх."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Eksport (кушни)"
              type="AKB"
              title="Экспорт к."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="Eksport (кушни эмас)"
              type="AKB"
              title="Экспорт к. э."
              labelSize={12}
              top={25}
              right={30}
            />
            <BarChartComponent
              regionName="SnP"
              type="AKB"
              title="SnP"
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
