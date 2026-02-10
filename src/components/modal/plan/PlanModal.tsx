import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import {
  addDocument,
  updateDocument,
  subscribeToCollection,
  PRODUCTS_COLLECTION,
  MANAGERS_COLLECTION,
  REGION_COLLECTION,
  PLAN_COLLECTION,
} from "../../../firebase/services.ts";
import { useEffect, useState } from "react";
import type { IProduct, IManager, IRegion } from "../../../type/type.ts";
import { serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";

interface IModal {
  isModalOpen: boolean;
  toggle: () => void;
  selectedCompanyId: string;
}

export const PlanModal = ({
  isModalOpen,
  toggle,
  selectedCompanyId,
}: IModal) => {
  const [managers, setManagers] = useState<IManager[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [regions, setRegion] = useState<IRegion[]>([]);
  const [amount, setAmount] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const { id } = useParams<{ id: string }>();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const unsubManagers = subscribeToCollection(
      MANAGERS_COLLECTION,
      setManagers,
    );
    const unsubProducts = subscribeToCollection(
      PRODUCTS_COLLECTION,
      setProducts,
    );
    const unsubRegions = subscribeToCollection(REGION_COLLECTION, setRegion);
    return () => {
      unsubManagers();
      unsubProducts();
      unsubRegions();
    };
  }, []);

  const addVersionData = async () => {
    if (!id) return;

    const path = `${PLAN_COLLECTION}/${id}/items`;

    const newItem = {
      regionId: selectedRegionId,
      managerId: selectedManagerId,
      productId: selectedProductId,
      amount,
    };

    setIsAdding(true);
    await addDocument(path, newItem);

    await updateDocument(PLAN_COLLECTION, id, {
      lastEditedAt: serverTimestamp(),
    });
    setIsAdding(false);
    toggle();
    setSelectedManagerId("");
    setSelectedProductId("");
    setSelectedRegionId("");
    setAmount("");
  };

  return (
    <Modal isOpen={isModalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Plan</ModalHeader>
      <form>
        <ModalBody>
          <FormGroup>
            <Label for="manager">Manager</Label>
            <Input
              id="manager"
              type="select"
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
            >
              <option value="" hidden>
                Select manager name...
              </option>
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
              <option value="" hidden>
                Select product name...
              </option>
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
              <option value="" hidden>
                Select region name...
              </option>
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
          <Button
            color="primary"
            disabled={
              isAdding ||
              !selectedRegionId ||
              !selectedRegionId ||
              !selectedManagerId ||
              !amount
            }
            onClick={addVersionData}
          >
            Add {<Spinner size="sm" hidden={!isAdding} />}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
