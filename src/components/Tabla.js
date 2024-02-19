import React from "react";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EditIcon } from "./icons/EditIcon";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const Tabla = ({ children }) => {
  const datos = typeof children === "object" ? children : {};

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.name}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.role}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.status}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          </TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.name}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.role}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.status}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          </TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.name}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.role}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.status}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          </TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.name}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.role}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              variant="bordered"
              defaultValue={datos.status}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Tabla;
