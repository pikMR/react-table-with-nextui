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
  const [loading, setLoading] = useState(true);

  const handleTabChange = useCallback((newSelected) => {
    setSelected(newSelected);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const usefulData = await getBanks();
      setTabs(usefulData.banks);

      if (usefulData.banks.length > 0) {
        const extractsData = await getExtractsByBank(usefulData.banks[selected].id);
        setTableData(extractsData.extracts);
        const branchOfficeData = await getBranchOffice();
        setListData(branchOfficeData.branchOffices);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [selected]);

  useEffect(() => {
    fetchData();
  }, [selected, fetchData]); // Esto debe ejecutarse solo cuando selected cambia

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
              <Tabla tableData={tableData} listData={listData}>
              </Tabla>
            </CardBody>
          </Card>
        </Tab>
      ))}
    </Tabs>
  );
};
