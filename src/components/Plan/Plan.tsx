import { Button } from "reactstrap";
import { ProductAddModal } from "../product/ProductAddModal.tsx";
import { useState } from "react";
import "./Plan.css";

export const Plan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="plan-wrapper">
      <div className="plan-header">
        <h2 className="company-title">Plan</h2>
        <Button type="submit" color="primary" onClick={toggle}>
          Add
        </Button>
      </div>
      <ProductAddModal isModalOpen={isModalOpen} toggle={toggle} />
    </div>
  );
};
