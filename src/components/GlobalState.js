// GlobalState.js
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("opaque");

    const openModal = (backdrop) =>
    {
        setBackdrop(backdrop);
        setModalOpen(true);
    };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <GlobalStateContext.Provider value={{ modalOpen, backdrop, openModal, closeModal }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};