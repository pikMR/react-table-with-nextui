
import { BranchOfficeResume } from "./BranchOfficeResume";
import { Card, CardBody } from "@nextui-org/card";
import { useEffect, useState, useCallback } from "react";
import { getResumesByBank } from "../../service";
import { useGlobalState } from "../GlobalState";
const Resume = ({ idBank }) => {
  const [resumes, setResumes] = useState([]);
  const [total, setTotal] = useState(0);
  const { tableIsUpload } = useGlobalState();

  const fetchData = useCallback(async () => {
    await getResumesByBank(idBank).then(async (fetchResume) => {
      console.log(idBank, fetchResume);

      const sumTotal = fetchResume.resumes.map((boffice) => boffice.balanceFinal)
        .filter((subtotal) => subtotal > 0)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      
      setResumes(fetchResume.resumes);
      setTotal(sumTotal);
    });
  }, [idBank]);

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
          justifyContent: "center"
        }}
      >
        <CardBody className="result">
          <pre className="text-lg text-default-500 text-center">
            total: ${total}
          </pre>
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
          padding: "20px"
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