import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useGlobalState } from "./../GlobalState";

export const  ModalCreate = () =>  {
    const { modalOpen, closeModal, backdrop} = useGlobalState(); 

  return (
    <Modal backdrop={backdrop[0]} isOpen={modalOpen} onClose={closeModal}>
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {backdrop[1]}
            </ModalHeader>
            <ModalBody>
              <p>{backdrop[2]}</p>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={closeModal}>
                Cancelar
              </Button> */}
              <Button color="primary" onPress={closeModal}>
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
