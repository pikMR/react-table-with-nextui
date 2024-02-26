import Tabla from "./Tabla";
import { useEffect, useState, useMemo } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";

const urlBank = "https://localhost:44377/Bank";
const urlExtract = "https://localhost:44377/Extract/Bank/";

export const Selectores = () => {
  const [tabs, setTabs] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(urlBank)
      .then((response) => response.json())
      .then((usefulData) => {
        setTabs(usefulData.banks);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (tabs[selected]) {
      fetch(`${urlExtract}${tabs[selected].id}`)
        .then((response) => response.json())
          .then((data) => {
            console.log(data.extracts)
          setTableData(data.extracts);
        });
    }
  }, [selected, tabs]);
  const memoizedTabs = useMemo(() => tabs, [tabs]);

  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
    >
      {memoizedTabs?.map((item, index) => (
        <Tab key={index} title={item.name}>
          <Card>
            <CardBody>
              <Tabla>{tableData}</Tabla>
            </CardBody>
          </Card>
        </Tab>
      ))}
    </Tabs>
  );
};
