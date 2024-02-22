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
                      {[
                        {
                          fecha: "2021-12-25",
                          descripcion: "Pago abono pedido motos suzuki N",
                          sucursal: "SABANA",
                          detalle: "SABANA DE TORRES",
                          saldo: 19030,
                        },
                        {
                          fecha: "2022-12-25",
                          descripcion: "Abono pedido motos suzuki N",
                          sucursal: "SABANA de salamanca",
                          detalle: "SABANA DE ALBA",
                          saldo: 49030,
                        },
                      ]}
                    </Tabla>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="65d23eaf6b14fff376b92e59" title="BANCOLOMBIA-DANIEL">
                <Card>
                  <CardBody>
                    <Tabla>
                      {[
                        {
                          fecha: "2026-10-15",
                          descripcion: "Compra SOI - PCSS",
                          sucursal: "ARAUCA",
                          detalle: "o",
                          saldo: -8,
                        },
                        {
                          fecha: "2022-10-15",
                          descripcion: "Compra SOI - PCSS",
                          sucursal: "ARAUCA",
                          detalle: "amalia",
                          saldo: -300,
                        },
                      ]}
                    </Tabla>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="65d23eaf6b14fff376b92e60" title="DAVIVIENDA LUCY">
                <Card>
                  <CardBody>
                    <Tabla>
                      {[
                        {
                          fecha: "2023-07-18",
                          descripcion: "Cuota de manejo",
                          sucursal: "LEBRIJA",
                          detalle: "",
                          saldo: 4780,
                        },
                        {
                          fecha: "2024-07-18",
                          descripcion: "Cuota de maneaso",
                          sucursal: "LEBdfRIJA",
                          detalle: "",
                          saldo: 4580,
                        },
                      ]}
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
