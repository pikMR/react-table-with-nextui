import Tabla from "./Tabla";
import { useEffect, useState, useMemo } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { getBanks, getExtractsByBank } from "../service";

export const Selectores = () => {
  const [tabs, setTabs] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      getBanks()
      .then((usefulData) => {
        setTabs(usefulData.banks);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (tabs[selected]) {
      getExtractsByBank(tabs[selected].id)
        .then((data) => {
          console.log(data.extracts);
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
