import React, { useState } from "react";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EditIcon } from "./icons/EditIcon";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";
import { parseDate } from "@internationalized/date";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const Tabla = ({ children }) => {
  const [editMode, setEditMode] = useState({});
  const toggleEditMode = (rowKey) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [rowKey]: !prevEditMode[rowKey],
    }));
  };
  const handleEditClick = (rowKey) => {
    console.log('rowkey: ' + rowKey)
    toggleEditMode(rowKey);
  };
  const datos = typeof children === "object" ? children : {};

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Fecha</TableColumn>
        <TableColumn>Descripcion</TableColumn>
        <TableColumn>Sucursal</TableColumn>
        <TableColumn>Detalle</TableColumn>
        <TableColumn>Saldo</TableColumn>
        <TableColumn>ACCIONES</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            <Input
              isReadOnly
              type="date"
              variant="bordered"
              defaultValue={parseDate(datos.fecha)}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.descripcion}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.sucursal}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.detalle}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="number"
              variant="bordered"
              defaultValue={datos.saldo}
              className="max-w-xs"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar Extracto">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleEditClick(1)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar Extracto">
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
              isReadOnly
              type="date"
              variant="bordered"
              defaultValue={parseDate(datos.fecha)}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.descripcion}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.sucursal}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.detalle}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="number"
              variant="bordered"
              defaultValue={datos.saldo}
              className="max-w-xs"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar Extracto">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleEditClick(2)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar Extracto">
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
              isReadOnly
              type="date"
              variant="bordered"
              defaultValue={parseDate(datos.fecha)}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.descripcion}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.sucursal}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.detalle}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="number"
              variant="bordered"
              defaultValue={datos.saldo}
              className="max-w-xs"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar Extracto">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleEditClick(3)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar Extracto">
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
              isReadOnly
              type="date"
              variant="bordered"
              defaultValue={parseDate(datos.fecha)}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.descripcion}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.sucursal}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="text"
              variant="bordered"
              defaultValue={datos.detalle}
              className="max-w-xs"
            />
          </TableCell>
          <TableCell>
            <Input
              isReadOnly
              type="number"
              variant="bordered"
              defaultValue={datos.saldo}
              className="max-w-xs"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
          </TableCell>
          <TableCell>
            <div className="relative flex items-center gap-2">
              <Tooltip
                content="Editar Extracto"
                onClick={() => handleEditClick(4)}
              >
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleEditClick(4)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar Extracto">
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
