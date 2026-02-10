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
  CLIENT_COLLECTION,
  FACT_COLLECTION,
} from "../../../firebase/services.ts";
import { useEffect, useState } from "react";
import type {
  IProduct,
  IManager,
  IRegion,
  IClient,
} from "../../../type/type.ts";
import { serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";

interface IModal {
  isModalOpen: boolean;
  toggle: () => void;
  selectedCompanyId: string;
}

export const FactModal = ({
  isModalOpen,
  toggle,
  selectedCompanyId,
}: IModal) => {
  const [managers, setManagers] = useState<IManager[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [regions, setRegion] = useState<IRegion[]>([]);
  const [clients, setClients] = useState<IClient[]>([]);
  const [amount, setAmount] = useState("");
  const [margin, setMargin] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const { id } = useParams<{ id: string }>();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const unsubManagers = subscribeToCollection(
      MANAGERS_COLLECTION,
      setManagers,
    );
    const unsubClients = subscribeToCollection(CLIENT_COLLECTION, setClients);
    const unsubProducts = subscribeToCollection(
      PRODUCTS_COLLECTION,
      setProducts,
    );
    const unsubRegions = subscribeToCollection(REGION_COLLECTION, setRegion);
    return () => {
      unsubManagers();
      unsubClients();
      unsubProducts();
      unsubRegions();
    };
  }, []);

  const addVersionData = async () => {
    if (!id) return;

    const path = `${FACT_COLLECTION}/${id}/items`;

    const newItem = {
      regionId: selectedRegionId,
      managerId: selectedManagerId,
      productId: selectedProductId,
      clientId: selectedClientId,
      amount: Number(amount),
      margin: Number(margin),
    };

    setIsAdding(true);
    await addDocument(path, newItem);

    await updateDocument(FACT_COLLECTION, id, {
      lastEditedAt: serverTimestamp(),
    });
    setIsAdding(false);
    toggle();
    setSelectedManagerId("");
    setSelectedProductId("");
    setSelectedRegionId("");
    setSelectedClientId("");
    setAmount("");
    setMargin("");
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
              className={`${selectedManagerId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedManagerId(e.target.value)}
            >
              <option value="" hidden>
                Select manager name...
              </option>
              {managers
                .filter(({ companyId }) => companyId === selectedCompanyId)
                .map(({ id, name }) => (
                  <option key={id} value={id} className="text-black">
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
              className={`${selectedProductId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="" hidden>
                Select product name...
              </option>
              {products
                .filter(({ companyId }) => companyId === selectedCompanyId)
                .map(({ id, name }) => (
                  <option key={id} value={id} className="text-black">
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
              className={`${selectedRegionId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedRegionId(e.target.value)}
            >
              <option value="" hidden>
                Select region name...
              </option>
              {regions.map(({ id, name }) => (
                <option key={id} value={id} className="text-black">
                  {name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="client">Client</Label>
            <Input
              id="client"
              type="select"
              value={selectedClientId}
              className={`${selectedClientId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedClientId(e.target.value)}
            >
              <option value="" hidden>
                Select client name...
              </option>
              {clients.map(({ id, name }) => (
                <option key={id} value={id} className="text-black">
                  {name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Type amount..."
            />
          </FormGroup>
          <FormGroup>
            <Label for="margin">Margin</Label>
            <Input
              id="margin"
              type="number"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              placeholder="Type margin..."
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
            {isAdding ? (
              <Spinner size="sm" />
            ) : (
              <i className="bi bi-plus-lg"></i>
            )}
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            <i className="bi bi-x-lg"></i>
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
