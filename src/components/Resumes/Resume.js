
import { BranchOfficeResume } from "./BranchOfficeResume";
import { Card } from "@nextui-org/card";
import { useEffect, useState, useCallback } from "react";
import { getResumesByBank } from "../../service";

const Resume = ({ idBank }) => {
  const [resumes, setResumes] = useState([]);
  const fetchData = useCallback(async () => {
    await getResumesByBank(idBank).then(async (fetchResume) => {
      console.log(idBank, fetchResume);
      setResumes(fetchResume.resumes);
    });
  }, [idBank]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card
      className="max-w-[400px]"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexGrow: 4,
        gap: "10px",
      }}
    >
      {resumes?.map((item, index) => (
        <div key={item.id + "_" + index + 1}>
          <BranchOfficeResume {...item} />
        </div>
      ))}
    </Card>
  );
};

export default Resume;