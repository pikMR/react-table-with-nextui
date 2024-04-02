import Tabla from "./Tabla";
import Resume from "./Resumes/Resume";
import { useEffect, useState, useCallback } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { getBanks, getExtractsByBank, getBranchOffice } from "../service";

export const Selectores = () => {
  const [fillBank, setFillBank] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [idBank, setIdBank] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [listData, setListData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (!fillBank) {
        setFillBank(true);
        await getBanks().then(async (fetchBank) => {
          setTabs(fetchBank.banks);
          const idBankSelected = fetchBank.banks[selected ?? 0].id;
          setIdBank(idBankSelected);
          await getExtractsByBank(idBankSelected).then(async (fetchExtract) => {
            const fetchBranchOffice = await getBranchOffice();
            setTableData(fetchExtract.extracts);
            setListData(fetchBranchOffice.branchOffices);
          });
        });
      }
    } catch (error) {
      console.log("🐗 ~ fetchData ~ error:", error);
    } finally {
      setLoading(false);
    }
  }, [fillBank, selected]);

useEffect(() => {
  fetchData();
}, [selected, fetchData]);
  
  const handleTabChange = useCallback((newSelected) => {
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
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Tabs
          aria-label="Tabs"
          selectedKey={selected}
          defaultSelectedKey={0}
          onSelectionChange={handleTabChange}
        >
          {tabs?.map((item, index) => (
            <Tab key={index} title={item.name}>
              <Card>
                <CardBody>
                  <Resume
                    idBank={idBank}
                  ></Resume>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Tabla
                    tableData={tableData}
                    listData={listData}
                    idBank={idBank}
                  ></Tabla>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
};
