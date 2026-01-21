import { groupByField } from "../../utils/groupByField.tsx"
import useLocalStorage from "use-local-storage"
import { BarChartComponent } from "../chart/BarChartComponent.tsx"
import type { RowDataType } from "../../utils/groupByField.tsx"

export const Reports = () => {
  const [rawData] = useLocalStorage("rawData", "");
  const jsonData: RowDataType[] = rawData ? JSON.parse(rawData) : [];

  return (
    <>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Manager", "Sum")}
          xOffset={35}
          height={800}
        />
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Manager", "AKB")}
          xOffset={35}
          height={800}
        />
      </div>
      <h3 className="text-center m-4">Region Sotuv</h3>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Buxoro va Navoiy")}
          xOffset={45}
          height={400}
        />
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Vodiy: FAN")}
          xOffset={45}
          height={400}
        />
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Kash va Surx")}
          xOffset={45}
          height={400}
        />
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Sam, Jizz, Sir")}
          xOffset={45}
          height={400}
        />
      </div>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Toshkent")}
          xOffset={45}
          height={400}
        />
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Xorazm va QQP")}
          xOffset={45}
          height={400}
        />
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Eksport (kushni emas)")}
          xOffset={45}
          height={400}
        />
        <BarChartComponent
          aggregatedData={groupByField(jsonData, "Region", "Sum").filter(({ Group }) => Group === "Eksport (kushni)")}
          xOffset={45}
          height={400}
        />
      </div>
      <h3 className="text-center m-4">Region AKB</h3>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Buxoro va Navoiy")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Vodiy: FAN")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Kash va Surx")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Sam, Jizz, Sir")}
            xOffset={45}
            height={400}
        />
      </div>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Toshkent")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Xorazm va QQP")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Eksport (kushni emas)")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Region", "AKB").filter(({ Group }) => Group === "Eksport (kushni)")}
            xOffset={45}
            height={400}
        />
      </div>
      <h3 className="text-center m-4">Product Sotuv</h3>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "Sum").filter(({ Group }) => Group === "RSC")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "Sum").filter(({ Group }) => Group === "non-RSC")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "Sum").filter(({ Group }) => Group === "wRSC")}
            xOffset={45}
            height={400}
        />
      </div>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "Sum").filter(({ Group }) => Group === "SnP")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "Sum").filter(({ Group }) => Group === "SnP Lam")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "Sum").filter(({ Group }) => Group === "Gofrolist")}
            xOffset={45}
            height={400}
        />
      </div>
      <h3 className="text-center m-4">Product AKB</h3>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "AKB").filter(({ Group }) => Group === "RSC")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "AKB").filter(({ Group }) => Group === "non-RSC")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "AKB").filter(({ Group }) => Group === "wRSC")}
            xOffset={45}
            height={400}
        />
      </div>
      <div className="mt-3 d-flex gap-3">
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "AKB").filter(({ Group }) => Group === "SnP")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "AKB").filter(({ Group }) => Group === "SnP Lam")}
            xOffset={45}
            height={400}
        />
        <BarChartComponent
            aggregatedData={groupByField(jsonData, "Product", "AKB").filter(({ Group }) => Group === "Gofrolist")}
            xOffset={45}
            height={400}
        />
      </div>
    </>
  )
}