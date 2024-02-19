import * as React from "react";

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/system";
import logo from './logo.svg';
import './App.css';
import { Button } from "@nextui-org/button";
import "./index.css";

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Learn React</Button>
          </a>
        </header>
      </div>
    </NextUIProvider>
  );
}

export default App;
