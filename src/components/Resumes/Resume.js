
import { BranchOfficeResume } from "./BranchOfficeResume";

const Resume = ({ tableData, listData, idBank }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', flexGrow:4,  gap: '10px' }}>
        {listData.map((item, index) => (
          <BranchOfficeResume></BranchOfficeResume>
        ))}
      </div>
    );
};

export default Resume;