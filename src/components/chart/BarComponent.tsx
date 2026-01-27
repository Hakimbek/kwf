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
        fill="var(--black)"
        letterSpacing={-1}
        fontSize={labelSize}
      />
      <LabelList
        dataKey={dataKey}
        position="left"
        formatter={() => dataKey}
        fill="var(--dark-gray)"
        letterSpacing={-1}
        fontSize={labelSize}
      />
    </Bar>
  );
};
