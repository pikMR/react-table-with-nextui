import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import Tabla from './components/Tabla';
import './App.css';
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
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
            <Tabs aria-label="Options">
              <Tab key="65d23cbd6b14fff376b92e57" title="BANCOLOMBIA-LUCY">
                <Card>
                  <CardBody>
                    <Tabla>
                      {{
                        name: "Jose ignacio",
                        role: "arquitect",
                        status: "ok",
                      }}
                    </Tabla>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="65d23eaf6b14fff376b92e59" title="BANCOLOMBIA-DANIEL">
                <Card>
                  <CardBody>
                    <Tabla>
                      {{
                        name: "Francisco josé",
                        role: "gigolo",
                        status: "ko",
                      }}
                    </Tabla>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="65d23eaf6b14fff376b92e60" title="DAVIVIENDA LUCY">
                <Card>
                  <CardBody>
                    <Tabla>
                      {{
                        name: "paco fernandez",
                        role: "barrendero",
                        status: "ok",
                      }}
                    </Tabla>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </header>
      </div>
    </NextUIProvider>
  );
}

export default App;
