import { Snippet } from "@nextui-org/snippet";
import { BranchOfficeResume } from "./BranchOfficeResume";
import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useState, useCallback } from "react";
import { getResumesByBank } from "../../service";
import { useGlobalState } from "../GlobalState";
const Resume = ({ id, openingBalance }) => {
  const [resumes, setResumes] = useState([]);
  const [total, setTotal] = useState(0);
  const { tableIsUpload } = useGlobalState();

  const fetchData = useCallback(async () => {
    await getResumesByBank(id).then(async (fetchResume) => {
      const sumTotal = fetchResume.resumes
        .map((boffice) => boffice.balanceFinal)
        .filter((subtotal) => subtotal > 0)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

      setResumes(fetchResume.resumes);
      setTotal(sumTotal);
    });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, tableIsUpload]);

  return (
    <>
      <Card
        variant="solid"
        radius="none"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardBody className="result">
          <p className="text-default-500 text-center">
            Saldo Inicial $ {openingBalance} | Saldo Actual $ {total}
          </p>
          <div className="text-center">
            <Snippet
              variant="shadow"
              color="success"
              tooltipProps={{
                color: "foreground",
                content: "Copiar el TOTAL",
                disableAnimation: true,
                placement: "right",
                closeDelay: 0,
              }}
            >
              {openingBalance + total}
            </Snippet>
          </div>
        </CardBody>
      </Card>
      <Card
        variant="flat"
        radius="sm"
        className="max-w-[400px]"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexGrow: 4,
          gap: "10px",
          padding: "20px",
        }}
      >
        {resumes?.map((item, index) => (
          <div key={item.id + "_" + index + 1}>
            <BranchOfficeResume {...item} />
          </div>
        ))}
      </Card>
    </>
  );
};

export default Resume;
