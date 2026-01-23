import { KWF } from "../kwf/KWF.tsx";
import "./Reports.css";

export const Reports = () => {
  return (
    <div>
      <div className="wrapper">
        <p className="vertical text-center">Umumiy</p>
        <div>
          <div className="d-flex">
            <p className="vertical">Sotuv</p>
            <KWF type="Sum" />
          </div>
          <div className="d-flex">
            <p className="vertical">AKB</p>
            <KWF type="AKB" />
          </div>
        </div>
      </div>
      {/*<div className="report-wrapper">*/}
      {/*  <KWF managerName="Farrux" />*/}
      {/*  <KWF managerName="Murod" />*/}
      {/*  <KWF managerName="Shokirjon" />*/}
      {/*</div>*/}
      {/*<h4 className="report-header">Farrux</h4>*/}
      {/*<div className="report-wrapper">*/}
      {/*  <Product productName="wRSC" managerName="Farrux" />*/}
      {/*  <Product productName="RSC" managerName="Farrux" />*/}
      {/*  <Product productName="non-RSC" managerName="Farrux" />*/}
      {/*  <Product productName="SnP" managerName="Farrux" />*/}
      {/*  <Product productName="SnP Lam" managerName="Farrux" />*/}
      {/*  <Product productName="Gofrolist" managerName="Farrux" />*/}
      {/*  <Product productName="Monokarton" managerName="Farrux" />*/}
      {/*</div>*/}
      {/*<h4 className="report-header">Murod</h4>*/}
      {/*<div className="report-wrapper">*/}
      {/*  <Product productName="wRSC" managerName="Murod" />*/}
      {/*  <Product productName="RSC" managerName="Murod" />*/}
      {/*  <Product productName="non-RSC" managerName="Murod" />*/}
      {/*  <Product productName="SnP" managerName="Murod" />*/}
      {/*  <Product productName="SnP Lam" managerName="Murod" />*/}
      {/*  <Product productName="Gofrolist" managerName="Murod" />*/}
      {/*  <Product productName="Monokarton" managerName="Murod" />*/}
      {/*</div>*/}
      {/*<h4 className="report-header">Shokirjon</h4>*/}
      {/*<div className="report-wrapper">*/}
      {/*  <Product productName="wRSC" managerName="Shokirjon" />*/}
      {/*  <Product productName="RSC" managerName="Shokirjon" />*/}
      {/*  <Product productName="non-RSC" managerName="Shokirjon" />*/}
      {/*  <Product productName="SnP" managerName="Shokirjon" />*/}
      {/*  <Product productName="SnP Lam" managerName="Shokirjon" />*/}
      {/*  <Product productName="Gofrolist" managerName="Shokirjon" />*/}
      {/*  <Product productName="Monokarton" managerName="Shokirjon" />*/}
      {/*</div>*/}
    </div>
  );
};
