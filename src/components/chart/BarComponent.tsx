import { Bar, Cell, LabelList } from "recharts";
import type { GroupedDataType } from "../../utils/groupByField.tsx";

type BarComponentType = {
  dataKey: string;
  xOffset: number;
  aggregatedData: GroupedDataType[];
  isFact: boolean;
  fill?: string;
};

export const BarComponent = ({
  dataKey,
  xOffset,
  aggregatedData,
  isFact,
  fill,
}: BarComponentType) => {
  return (
    <Bar dataKey={dataKey} fill={fill}>
      {isFact &&
        aggregatedData.map((entry, index) => {
          const diff = 100 - (entry.Fact_Kun * 100) / entry.Plan_Kun;

          if (diff < -20) {
            return <Cell key={`fact-${index}`} fill="var(--blue)" />;
          }

          if (diff > 20) {
            return <Cell key={`fact-${index}`} fill="var(--red)" />;
          }

          return <Cell key={`fact-${index}`} fill="var(--green)" />;
        })}
      <LabelList
        dataKey={dataKey}
        position="top"
        fill="var(--black)"
        content={({ value, x, y }) => {
          if (value === 0) {
            return (
              <>
                {isFact && (
                  <text
                    x={Number(x) + xOffset}
                    y={Number(y) - 75}
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    ⚠
                  </text>
                )}
                <text
                  x={Number(x) + xOffset}
                  y={Number(y) - 50}
                  textAnchor="middle"
                  fontWeight="bold"
                  fill="var(--black)"
                >
                  0
                </text>
                <text
                  x={Number(x) + xOffset}
                  y={Number(y) - 30}
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight="bold"
                  fill="var(--black)"
                >
                  Fact Kun
                </text>
              </>
            );
          }

          return (
            <>
              <LabelList
                dataKey={dataKey}
                position="top"
                fill="var(--black)"
                fontWeight="bold"
              />
              <LabelList
                dataKey={dataKey}
                position="inside"
                fill="var(--black)"
                fontWeight="bold"
                fontSize={14}
                formatter={() => dataKey}
              />
            </>
          );
        }}
      />
    </Bar>
  );
};
