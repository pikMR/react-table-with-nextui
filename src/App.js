import { NextUIProvider } from "@nextui-org/system";
import { Tabla } from "./components/Tabla";
import "./App.css";
import "./index.css";

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <header className="App-header">
          <div className="flex w-full flex-col">
            <Tabla />
          </div>
        </header>
      </div>
    </NextUIProvider>
  );
}

export default App;
