// GlobalState.js
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [tableUploaded, setTableUploaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(["opaque","tittle","message"]);

  const openModal = (backdrop) =>
  {
      setBackdrop(backdrop);
      setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const tableIsUpload = () => {
    setTableUploaded(true);
    console.log("tableIsUpload");
  };

  const tableWaitingUpload = () => {
    setTableUploaded(false);
  };

  return (
    <GlobalStateContext.Provider value={{ modalOpen, backdrop, tableUploaded, openModal, closeModal, tableIsUpload, tableWaitingUpload }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};