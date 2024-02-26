import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Selectores } from "./components/Selectores";
import './App.css';
import { Button } from "@nextui-org/button";

import "./index.css";

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Login</Button>
          </a>
          <div className="flex w-full flex-col">
            <Selectores/>
          </div>
        </header>
      </div>
    </NextUIProvider>
  );
}

export default App;
