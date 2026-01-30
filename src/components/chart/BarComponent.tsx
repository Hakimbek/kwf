import { Bar, Cell, LabelList, type RenderableText } from "recharts";

type BarComponentType = {
  dataKey: string;
  isFact: boolean;
  color?: string;
  fill?: string;
};

const formatWithUnderscore = (value: RenderableText) =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const BarComponent = ({
  dataKey,
  isFact,
  color,
  fill,
}: BarComponentType) => {
  return (
    <Bar dataKey={dataKey} fill={fill} radius={[10, 10, 10, 10]}>
      {isFact && <Cell fill={`var(--${color})`} />}
      <LabelList
        dataKey={dataKey}
        position="right"
        fill="var(--black)"
        fontSize={13}
        formatter={formatWithUnderscore}
      />
      <LabelList
        dataKey={dataKey}
        position="left"
        formatter={() => dataKey}
        fill="var(--dark-gray)"
        letterSpacing={-1}
        fontSize={12}
      />
    </Bar>
  );
};
