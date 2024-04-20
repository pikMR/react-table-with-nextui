// GlobalState.js
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [tableUploaded, setTableUploaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(["opaque", "tittle", "message"]);
  const [login, setLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const loginUser = (request) => {
    const { admin, valid } = request;
    setLogin(valid);
    setIsAdmin(admin);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        modalOpen,
        backdrop,
        tableUploaded,
        login,
        isAdmin,
        openModal,
        closeModal,
        tableIsUpload,
        tableWaitingUpload,
        loginUser,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
