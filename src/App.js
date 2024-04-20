import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Selectores } from "./components/Selectores";
import './App.css';
import { GlobalStateProvider } from "./components/GlobalState"; 
import { ModalCreate } from "./components/Modals/Create";
import { ModalLogin } from "./components/Modals/Login";
import "./index.css";

function App() {
  return (
    <GlobalStateProvider>
      <NextUIProvider>
        <div className="App">
          <header className="App-header">
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ModalLogin />
            </a>
            <div className="flex w-full flex-col">
              <Selectores />
              <ModalCreate />
            </div>
          </header>
        </div>
      </NextUIProvider>
    </GlobalStateProvider>
  );
}

export default App;
