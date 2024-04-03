import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { Divider } from "@nextui-org/divider";

export const BranchOfficeResume = ({ branchOffice, balanceFinal }) => {
  debugger;
  return (
    <Card className="max-w-[400px]">
      <Tooltip content={branchOffice.name}>
        <CardHeader className="flex gap-3">
          <div
            className="flex flex-col"
            style={{ backgroundColor: branchOffice.color, color: "white" }}
          >
            <p className="text-md">{branchOffice.name}</p>
            <p className="text-small text-default-500"></p>
          </div>
        </CardHeader>
      </Tooltip>
      <Divider />
      <CardBody>
        <p>$ {balanceFinal}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}