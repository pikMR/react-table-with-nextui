import Tabla from "./Tabla";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { getBanks, getExtractsByBank, getBranchOffice } from "../service";

export const Selectores = () => {
  const [tabs, setTabs] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState(0);
  // const [loading, setLoading] = useState(true);

  const handleTabChange = useCallback((newSelected) => {
    console.log("🚀 ~ handleTabChange ~ newSelected:", newSelected)
    setSelected(newSelected);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const fetchBanks = await getBanks();
      console.log("🚀 ~ fetchData ~ fetchBanks:", fetchBanks)
      const fetchBranchOffice = await getBranchOffice();
      console.log("🚀 ~ fetchData ~ fetchBranchOffice:", fetchBranchOffice)

      if (fetchBanks.banks.length > 0) {
        setTabs(fetchBanks.banks);
        const fetchExtractsByBank = await getExtractsByBank(fetchBanks.banks[selected].id);

        if (fetchExtractsByBank.extracts.length > 0) {
          setTableData(fetchExtractsByBank.extracts);
          setListData(fetchBranchOffice.branchOffices);  
        }
        // setLoading(false);
      }
    } catch (error) {
      console.log("🐗 ~ fetchData ~ error:", error);
      // setLoading(false);
    }
  }, [selected]);

  useEffect(() => {
    console.log("🚀 ~ Selectores.useEffect");
    fetchData();
  }, [selected, fetchData]);

  const memoizedTabs = useMemo(() => tabs, [tabs]);

  return (
    <Tabs
      aria-label="Tabs"
      selectedKey={selected}
      defaultSelectedKey={0}
      onSelectionChange={handleTabChange}
    >
      {memoizedTabs?.map((item, index) => (
        <Tab key={index} title={item.name}>
          <Card>
            <CardBody>
              <Tabla tableData={tableData} listData={listData}></Tabla>
              {/* {<pre>tableData: {JSON.stringify(tableData, null, "\t")}</pre>}
              {<pre>listData: {JSON.stringify(listData, null, "\t")}</pre>} */}
            </CardBody>
          </Card>
        </Tab>
      ))}
    </Tabs>
  );
};
