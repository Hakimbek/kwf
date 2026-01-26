import { Bar, Cell, LabelList } from "recharts";
import type { GroupDataType } from "../../utils/type.ts";

type BarComponentType = {
  dataKey: string;
  aggregatedData: GroupDataType[];
  isFact: boolean;
  fill?: string;
};

export const BarComponent = ({
  dataKey,
  aggregatedData,
  isFact,
  fill,
}: BarComponentType) => {
  return (
    <Bar dataKey={dataKey} fill={fill} radius={[10, 10, 10, 10]}>
      {isFact &&
        aggregatedData?.map((entry, index) => {
          const diff = 100 - (entry.Fact_Kun * 100) / entry.Plan_Kun;

          if (diff < -20) {
            return <Cell key={`fact-${index}`} fill="var(--blue)" />;
          }

          if (diff > 20) {
            return <Cell key={`fact-${index}`} fill="var(--red)" />;
          }

          return <Cell key={`fact-${index}`} fill="var(--green)" />;
        })}
      <LabelList dataKey={dataKey} position="right" />
      <LabelList dataKey={dataKey} position="left" formatter={() => dataKey} />
    </Bar>
  );
};
