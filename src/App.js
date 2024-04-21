import { NextUIProvider } from "@nextui-org/system";
import { Selectores } from "./components/Selectores";
import "./App.css";
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
            <div className="flex w-full flex-col">
              <Selectores />
            </div>
          </header>
          <ModalLogin />
          <ModalCreate />
        </div>
      </NextUIProvider>
    </GlobalStateProvider>
  );
}

export default App;
