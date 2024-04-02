import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export const BranchOfficeResume = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col" style={{ backgroundColor: "#0066ff", color:"white" }}>
          <p className="text-md">AGRO-MOTO MAQUINAS (SABANA)</p>
          <p className="text-small text-default-500"></p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>$ 450</p>
      </CardBody>
      <Divider />
    </Card>
  );
}