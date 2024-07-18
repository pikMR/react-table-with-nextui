import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { Divider } from "@nextui-org/divider";
import { useGlobalState } from "../GlobalState";

export const BranchOfficeResume = ({ branchOffice, balanceFinal }) => {
  const { filterBranchOffice, filterbo } = useGlobalState();

  return (
    <Card
      className={`${
        filterbo === branchOffice.name ? "max-w-[400px]" : "max-w-[200px]"
      }`}
      isPressable
      onPress={() =>
        filterbo === branchOffice.name
          ? filterBranchOffice("")
          : filterBranchOffice(branchOffice.name)
      }
      style={{
        border: filterbo === branchOffice.name ? "3px solid red" : "",
      }}
    >
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