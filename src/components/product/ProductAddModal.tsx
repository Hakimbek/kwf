import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useEffect, useState } from "react";
import { subscribeToManagers } from "../manager/utils/managerService.ts";
import { subscribeToCompany } from "../company/utils/companyService.ts";
import { subscribeToProducts } from "./utils/productService.ts";
import { subscribeToRegion } from "../region/utils/regionService.ts";
import type { ICompany } from "../company/Company.tsx";
import type { IManager } from "../manager/Manager.tsx";
import type { IRegion } from "../region/Region.tsx";
import type { IProduct } from "./Product.tsx";

interface IModal {
  isModalOpen: boolean;
  toggle: () => void;
}

export const ProductAddModal = ({ isModalOpen, toggle }: IModal) => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [managers, setManagers] = useState<IManager[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [regions, setRegion] = useState<IRegion[]>([]);
  const [amount, setAmount] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");

  useEffect(() => {
    const unsubManagers = subscribeToManagers(setManagers);
    const unsubCompanies = subscribeToCompany(setCompanies);
    const unsubProducts = subscribeToProducts(setProducts);
    const unsubRegions = subscribeToRegion(setRegion);
    return () => {
      unsubManagers();
      unsubCompanies();
      unsubProducts();
      unsubRegions();
    };
  }, []);

  return (
    <Modal isOpen={isModalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Plan</ModalHeader>
      <form>
        <ModalBody>
          <FormGroup>
            <Label for="company">Company</Label>
            <Input
              id="company"
              type="select"
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
            >
              <option value="" hidden>Select company name...</option>
              {companies.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="manager">Manager</Label>
            <Input
              id="manager"
              type="select"
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
            >
              <option value="" hidden>Select manager name...</option>
              {managers
                .filter(({ companyId }) => companyId === selectedCompanyId)
                .map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="product">Product</Label>
            <Input
              id="product"
              type="select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="" hidden>Select product name...</option>
              {products
                .filter(({ companyId }) => companyId === selectedCompanyId)
                .map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="region">Region</Label>
            <Input
              id="region"
              type="select"
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
            >
              <option value="" hidden>Select region name...</option>
              {regions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Type amount..."
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
