import Tabla from "./Tabla";
import Resume from "./Resumes/Resume";
import { useEffect, useState, useCallback } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { getBanks, getExtractsByBank, getBranchOffice } from "../service";

export const Selectores = () => {
  const [fillBank, setFillBank] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [bank, setBank] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoaded(false);
      if (!fillBank) {
        setFillBank(true);
        await getBanks().then(async (fetchBank) => {
          setTabs(fetchBank.banks);
          const bankSelected = fetchBank.banks[selected ?? 0];
          setBank(bankSelected);
          await getExtractsByBank(bankSelected.id).then(async (fetchExtract) => {
            const fetchBranchOffice = await getBranchOffice();
            setTableData(fetchExtract.extracts);
            setListData(fetchBranchOffice.branchOffices);
          });
        });
      }
    } catch (error) {
      console.log("🐗 ~ fetchData ~ error:", error);
    } finally {
      setIsLoaded(true);
    }
  }, [fillBank, selected]);

useEffect(() => {
  fetchData();
}, [selected, fetchData]);
  
  const handleTabChange = useCallback((newSelected) => {
    setIsLoaded(false);
    // eslint-disable-next-line eqeqeq, no-mixed-operators
    if (selected === null && newSelected == 0 && listData?.length !== 0) {
      // render first reload page when all data is loaded.
      setSelected(newSelected);
    // eslint-disable-next-line eqeqeq, no-mixed-operators
    } else if (selected !== null && newSelected != selected) {
      // render when selected tab
      setTableData([]);
      setFillBank(false);
      setSelected(newSelected);
    }
  }, [listData, selected]);

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
