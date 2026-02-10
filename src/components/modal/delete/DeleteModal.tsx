import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { deleteDocument } from "../../../firebase/services.ts";
import { useState } from "react";
import { toast } from "react-toastify";

interface IDeleteModal {
  toggle: () => void;
  isModalOpen: boolean;
  selectedDataName: string;
  selectedDataId: string;
  collectionName: string;
  restrictedCollections?: string[];
  foreignKey?: string;
}

export const DeleteModal = ({
  isModalOpen,
  toggle,
  selectedDataName,
  selectedDataId,
  collectionName,
  restrictedCollections = [],
  foreignKey = "",
}: IDeleteModal) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteDocument(
        collectionName,
        selectedDataId,
        restrictedCollections,
        foreignKey,
      );
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      toggle();
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isModalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete {selectedDataName}</ModalHeader>
      <ModalBody>Are you sure you want to delete this record?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            <Spinner size="sm" />
          ) : (
            <i className="bi bi-trash3"></i>
          )}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          <i className="bi bi-x-lg"></i>
        </Button>
      </ModalFooter>
    </Modal>
  );
};
