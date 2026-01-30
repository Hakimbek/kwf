import "./Title.css";

export const Title = ({ name }: { name: string }) => {
  return (
    <div className="title-wrapper">
      <div className="title-separator"></div>
      <div className="title-name">{name}</div>
      <div className="title-separator"></div>
    </div>
  );
};
