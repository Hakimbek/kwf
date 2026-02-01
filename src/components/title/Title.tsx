import "./Title.css";

type TitlePropsType = {
  name: string;
};

export const Title = ({ name }: TitlePropsType) => {
  return (
    <div className="title-wrapper">
      <div className="title-separator"></div>
      <div className="title-name">{name}</div>
      <div className="title-separator"></div>
    </div>
  );
};
