import { BarChartComponent } from "../../chart/BarChartComponent.tsx";
import "../Reports.css";

export const MPReports = () => {
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
                      height={180}
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
                        productName="Karton CelLayner"
                        type="Sum"
                        height={150}
                        title="CelLa"
                        labelSize={12}
                        x={190}
                        y={20}
                        top={25}
                        right={40}
                    />
                    <BarChartComponent
                        productName="Karton OqLayner"
                        type="Sum"
                        height={150}
                        title="OqLa"
                        labelSize={12}
                        x={190}
                        y={20}
                        top={25}
                        right={40}
                    />
                  </div>
                  <div className="d-flex gap-4">
                    <BarChartComponent
                        productName="Karton К0 120гр"
                        type="Sum"
                        height={150}
                        title="К0"
                        labelSize={12}
                        x={200}
                        y={20}
                        top={25}
                        right={30}
                    />
                    <BarChartComponent
                        productName="Karton К1 120гр"
                        type="Sum"
                        height={150}
                        title="К1"
                        labelSize={12}
                        x={200}
                        y={20}
                        top={25}
                        right={30}
                    />
                  </div>
                  <div className="d-flex gap-4">
                    <BarChartComponent
                        productName="Karton B0"
                        type="Sum"
                        height={130}
                        title="B0"
                        titleSize={13}
                        labelSize={12}
                        x={130}
                        y={20}
                        top={25}
                        right={40}
                    />
                    <BarChartComponent
                        productName="Karton B2+ 100gr"
                        type="Sum"
                        height={130}
                        title="B2+ 100gr"
                        titleSize={13}
                        labelSize={12}
                        x={100}
                        y={20}
                        top={25}
                        right={40}
                    />
                    <BarChartComponent
                        productName="Karton B2+ 120gr"
                        type="Sum"
                        height={130}
                        title="B2+ 120gr"
                        titleSize={13}
                        labelSize={12}
                        x={100}
                        y={20}
                        top={25}
                        right={40}
                    />
                  </div>
                  <div className="separator top-border">Регион</div>
                  <div className="d-flex gap-4">
                      <BarChartComponent
                          regionName="Хоразм ва Коракалпогистон"
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
                          regionName="Бухоро ва Навоий"
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
                          regionName="Водий: (ФАН)"
                          type="AKB"
                          height={150}
                          title="Водий: (ФАН)"
                          labelSize={12}
                          x={80}
                          y={20}
                          top={25}
                          right={30}
                      />
                      <BarChartComponent
                          regionName="Сам, Джиз, Сирд"
                          type="AKB"
                          height={150}
                          title="Сам, Джиз, Сирд"
                          labelSize={12}
                          x={60}
                          y={20}
                          top={25}
                          right={30}
                      />
                      <BarChartComponent
                          regionName="Тошкент вилоят ва шахар"
                          type="AKB"
                          height={150}
                          title="Тошкент"
                          labelSize={12}
                          x={90}
                          y={20}
                          top={25}
                          right={30}
                      />
                  </div>
                  <div className="d-flex gap-4">
                      <BarChartComponent
                          regionName="Дилер: Union Paper"
                          type="Sum"
                          height={130}
                          title="Дилер: Union Paper"
                          titleSize={12}
                          labelSize={12}
                          x={25}
                          y={20}
                          top={25}
                          right={40}
                      />
                      <BarChartComponent
                          regionName="Кашкадарё ва Сурхондарё"
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
                          regionName="Eksport (кушни)"
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
                          regionName="Eksport (кушни эмас)"
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
                  <div className="d-flex gap-4">
                      <BarChartComponent
                          regionName="Karton Works"
                          type="Sum"
                          height={130}
                          title="Karton Works"
                          titleSize={12}
                          labelSize={12}
                          x={160}
                          y={20}
                          top={25}
                          right={40}
                      />
                      <BarChartComponent
                          regionName="SnP"
                          type="Sum"
                          height={130}
                          title="SnP"
                          titleSize={12}
                          labelSize={12}
                          x={200}
                          y={20}
                          top={25}
                          right={30}
                      />
                  </div>
              </div>
              <div className="akb">
                  <BarChartComponent
                      type="AKB"
                      height={180}
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
                          productName="Karton CelLayner"
                          type="AKB"
                          height={150}
                          title="CelLa"
                          labelSize={12}
                          x={180}
                          y={20}
                          top={25}
                          right={40}
                      />
                      <BarChartComponent
                          productName="Karton OqLayner"
                          type="AKB"
                          height={150}
                          title="OqLa"
                          labelSize={12}
                          x={190}
                          y={20}
                          top={25}
                          right={40}
                      />
                  </div>
                  <div className="d-flex gap-4">
                      <BarChartComponent
                          productName="Karton К0 120гр"
                          type="AKB"
                          height={150}
                          title="К0"
                          labelSize={12}
                          x={200}
                          y={20}
                          top={25}
                          right={30}
                      />
                      <BarChartComponent
                          productName="Karton К1 120гр"
                          type="AKB"
                          height={150}
                          title="К1"
                          labelSize={12}
                          x={200}
                          y={20}
                          top={25}
                          right={30}
                      />
                  </div>
                  <div className="d-flex gap-4">
                      <BarChartComponent
                          productName="Karton B0"
                          type="Sum"
                          height={130}
                          title="B0"
                          titleSize={13}
                          labelSize={12}
                          x={130}
                          y={20}
                          top={25}
                          right={40}
                      />
                      <BarChartComponent
                          productName="Karton B2+ 100gr"
                          type="Sum"
                          height={130}
                          title="B2+ 100gr"
                          titleSize={13}
                          labelSize={12}
                          x={100}
                          y={20}
                          top={25}
                          right={40}
                      />
                      <BarChartComponent
                          productName="Karton B2+ 120gr"
                          type="Sum"
                          height={130}
                          title="B2+ 120gr"
                          titleSize={13}
                          labelSize={12}
                          x={100}
                          y={20}
                          top={25}
                          right={40}
                      />
                  </div>
                  <div className="separator top-border">Регион</div>
                  <div className="d-flex gap-4">
                    <BarChartComponent
                        regionName="Хоразм ва Коракалпогистон"
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
                        regionName="Бухоро ва Навоий"
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
                        regionName="Водий: (ФАН)"
                        type="AKB"
                        height={150}
                        title="Водий: (ФАН)"
                        labelSize={12}
                        x={80}
                        y={20}
                        top={25}
                        right={30}
                    />
                    <BarChartComponent
                        regionName="Сам, Джиз, Сирд"
                        type="AKB"
                        height={150}
                        title="Сам, Джиз, Сирд"
                        labelSize={12}
                        x={60}
                        y={20}
                        top={25}
                        right={30}
                    />
                    <BarChartComponent
                        regionName="Тошкент вилоят ва шахар"
                        type="AKB"
                        height={150}
                        title="Тошкент"
                        labelSize={12}
                        x={90}
                        y={20}
                        top={25}
                        right={30}
                    />
                  </div>
                  <div className="d-flex gap-4">
                    <BarChartComponent
                        regionName="Дилер: Union Paper"
                        type="AKB"
                        height={130}
                        title="Дилер: Union Paper"
                        titleSize={12}
                        labelSize={12}
                        x={25}
                        y={20}
                        top={25}
                        right={30}
                    />
                    <BarChartComponent
                        regionName="Кашкадарё ва Сурхондарё"
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
                        regionName="Eksport (кушни)"
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
                        regionName="Eksport (кушни эмас)"
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
                  <div className="d-flex gap-4">
                      <BarChartComponent
                          regionName="Karton Works"
                          type="AKB"
                          height={130}
                          title="Karton Works"
                          titleSize={12}
                          labelSize={12}
                          x={160}
                          y={20}
                          top={25}
                          right={40}
                      />
                      <BarChartComponent
                          regionName="SnP"
                          type="AKB"
                          height={130}
                          title="SnP"
                          titleSize={12}
                          labelSize={12}
                          x={200}
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
