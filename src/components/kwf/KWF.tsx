import { BarChartComponent } from "../chart/BarChartComponent.tsx";
import useLocalStorage from "use-local-storage";
import { sumData } from "../../utils/groupByField.tsx";
import "./KWF.css";

type KWFPropsType = {
  managerName?: string;
  productName?: string;
  regionName?: string;
  type: "Sum" | "AKB";
};

export const KWF = ({
  managerName = "All",
  regionName = "All",
  productName = "All",
  type,
}: KWFPropsType) => {
  const [kwfData] = useLocalStorage("kwfData", "");
  const groupedData = sumData(kwfData ? JSON.parse(kwfData) : [], type, {
    Manager: managerName,
    Product: productName,
    Region: regionName,
  });

  return <BarChartComponent aggregatedData={groupedData} height={90} />;
};
