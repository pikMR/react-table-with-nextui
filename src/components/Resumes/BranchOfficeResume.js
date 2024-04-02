import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export const BranchOfficeResume = ({branchOffice, balanceFinal}) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col" style={{ backgroundColor: "#0066ff", color:"white" }}>
          <p className="text-md">{ branchOffice.name }</p>
          <p className="text-small text-default-500"></p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>$ {balanceFinal}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}