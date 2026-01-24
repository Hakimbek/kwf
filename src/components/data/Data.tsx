import useLocalStorage from "use-local-storage";
import type { RowDataType } from "../../utils/groupByField.tsx";
import "./Data.css";

export const Data = () => {
  const [rawData] = useLocalStorage("kwfData", "");
  const jsonData: RowDataType[] = rawData ? JSON.parse(rawData) : [];

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Manager</th>
          <th>Region</th>
          <th>Product</th>
          <th>Plan Month</th>
          <th>Plan Dynamic</th>
          <th>Fact Dynamic</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {jsonData.map(
          ({
            Manager,
            Region,
            Product,
            Plan_Oy,
            Plan_Kun,
            Fact_Kun,
            Type,
          }: RowDataType) => (
            <tr key={Manager + Region + Product + Type}>
              <td>{Manager}</td>
              <td>{Region}</td>
              <td>{Product}</td>
              <td>{Plan_Oy}</td>
              <td>{Plan_Kun}</td>
              <td>{Fact_Kun}</td>
              <td>{Type}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
