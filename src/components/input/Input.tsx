import { useState } from "react";
import { Input, Button } from "reactstrap";
import { ManagerName } from "../../type/import.ts";
import { db } from "../../firebase/firebaseConfig.ts";
import { doc, setDoc } from "firebase/firestore";

export const InputKPI = () => {
  const { FARRUX, MUROD, UMID, ULUGBEK, SHOKIRJON } = ManagerName;
  const [manager, setManager] = useState<string>(FARRUX);
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "kpi", manager.trim());
      await setDoc(docRef, { amount: Number(amount) }, { merge: true });
    } catch (error) {
      console.error("Error updating manager KPI:", error);
    }
    setAmount("");
  };

  return (
    <div className="w-25 mx-auto d-flex flex-column gap-3 my-5">
      <Input type="select" onChange={(e) => setManager(e.target.value)}>
        <option>{FARRUX}</option>
        <option>{MUROD}</option>
        <option>{SHOKIRJON}</option>
        <option>{ULUGBEK}</option>
        <option>{UMID}</option>
      </Input>
      <Input
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button disabled={!manager || !amount} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};
