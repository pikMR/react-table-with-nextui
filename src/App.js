import { NextUIProvider } from "@nextui-org/system";
import { Tabla } from "./components/Tabla";
import SearchDate from "./components/SearchDate";
import "./App.css";
import "./index.css";

function App() {
  return (
    <NextUIProvider>
      <div className="w-full mt-[3rem] p-4">
        <SearchDate />
        <div className="flex w-full flex-col mt-5">
          <Tabla />
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
