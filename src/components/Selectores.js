import Tabla from "./Tabla";
import Resume from "./Resumes/Resume";
import { useEffect, useState, useCallback } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { getBanks, getExtractsByBank, getBranchOffice } from "../service";

export const Selectores = () => {
  // const [fillBank, setFillBank] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [bank, setBank] = useState({
    id: "",
    name: "",
    openingBalance: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState("0");
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchBanks = useCallback(async () => {
    try {
      if (bank.id === "") {
        await getBanks().then(async (fetchBank) => {
          setTabs(fetchBank.banks);
          const bankSelected = fetchBank.banks[selected ?? 0];
          setBank(bankSelected);
        });
      } else if (tabs.banks) {
        const bankSelected = tabs.banks[selected ?? 0];
        setBank(bankSelected);
      }
    } catch (error) {
      console.log("🐗 ~ fetchBanks ~ error:", error);
    }
  }, [bank.id, selected, tabs.banks]);

  const fetchExtracts = useCallback(async () => {
    try {
      setIsLoaded(false);
      if (bank.id !== "") {
        await getExtractsByBank(bank.id).then(async (fetchExtract) => {
          const fetchBranchOffice = await getBranchOffice();
          setTableData(fetchExtract.extracts);
          setListData(fetchBranchOffice.branchOffices);
        });  
      }
    } catch (error) {
      console.log("🐗 ~ fetchExtracts ~ error:", error);
    } finally {
      setIsLoaded(true);
    }
  }, [bank.id]);

  useEffect(() => {
    fetchBanks();
    fetchExtracts();
  }, [selected, fetchBanks, fetchExtracts]);
  
  const handleTabChange = (newSelected) => {
    setTableData([]);
    let nselected = Number(newSelected);
    setBank(tabs[nselected]);
    setSelected(newSelected);
  };

  return (
    <>
      {
        <Tabs
          aria-label="Tabs"
          selectedKey={selected}
          defaultSelectedKey={0}
          onSelectionChange={handleTabChange}
        >
          {tabs?.map((item, index) => (
            <Tab key={index} title={item.name}>
              <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                <Card style={{ marginBottom: 10 }}>
                  <CardBody>
                    <Resume {...bank} />
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Tabla
                      tableData={tableData}
                      listData={listData}
                      idBank={bank.id}
                    ></Tabla>
                  </CardBody>
                </Card>
              </Skeleton>
            </Tab>
          ))}
        </Tabs>
      }
    </>
  );
};
