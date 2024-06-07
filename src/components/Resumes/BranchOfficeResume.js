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
      <Tooltip content={branchOffice.name} disableAnimation color="foreground">
        <CardHeader>
          <div
            id="containerbranch"
            className="flex flex-col"
            style={{
              backgroundColor: branchOffice.color ?? "#ff66cc",
              color: "white",
            }}
          >
            <p className="text-md">{branchOffice.name}</p>
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