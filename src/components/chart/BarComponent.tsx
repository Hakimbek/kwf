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
  const [a, b] = dataKey.split("_");

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
        formatter={() => a.slice(0, 1) + "/" + b.slice(0, 1)}
        fill="var(--dark)"
        fontSize={12}
      />
    </Bar>
  );
};
