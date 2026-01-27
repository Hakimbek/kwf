import { Bar, Cell, LabelList } from "recharts";

type BarComponentType = {
  dataKey: string;
  isFact: boolean;
  color?: string;
  fill?: string;
  labelSize?: number;
};

export const BarComponent = ({
  dataKey,
  isFact,
  color,
  fill,
  labelSize,
}: BarComponentType) => {
  return (
    <Bar dataKey={dataKey} fill={fill} radius={[10, 10, 10, 10]}>
      {isFact && <Cell fill={`var(--${color})`} />}
      <LabelList
        dataKey={dataKey}
        position="right"
        fill={fill}
        letterSpacing={-1}
        fontSize={labelSize}
        fontWeight="bold"
      />
      <LabelList
        dataKey={dataKey}
        position="left"
        formatter={() => dataKey}
        fill={fill}
        letterSpacing={-1}
        fontSize={labelSize}
        fontWeight="bold"
      />
    </Bar>
  );
};
