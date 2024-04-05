import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { Divider } from "@nextui-org/divider";

export const BranchOfficeResume = ({ branchOffice, balanceFinal }) => {
  return (
    <Card className="max-w-[400px]">
      <Tooltip content={branchOffice.name} disableAnimation color='foreground'>
        <CardHeader className="flex gap-3 px-3 py-0 text-medium">
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
      <CardBody
        color="red"
        className={
          balanceFinal < 0
            ? "text-lg text-warning bg-black"
            : "text-md bg-black"
        }
      >
        $ {balanceFinal}
      </CardBody>
      <Divider />
    </Card>
  );
}