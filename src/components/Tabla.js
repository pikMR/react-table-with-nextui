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
const [editModes, setEditModes] = useState({});

  const handleEditClick = (rowKey) => {
    // Actualiza el estado del modo de edición específico de la fila al hacer clic en Editar
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [rowKey]: !prevEditModes[rowKey], // Toggle el modo de edición para la fila
    }));
  };
 const datos = Array.isArray(children) ? children : [];
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
        {datos.map((item, index) => (
          <TableRow key={index + 1}>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="date"
                variant="bordered"
                defaultValue={parseDate(item.fecha)}
                className="max-w-xs"
              />
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="text"
                variant="bordered"
                defaultValue={item.descripcion}
                className="max-w-xs"
              />
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="text"
                variant="bordered"
                defaultValue={item.sucursal}
                className="max-w-xs"
              />
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="text"
                variant="bordered"
                defaultValue={item.detalle}
                className="max-w-xs"
              />
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="number"
                variant="bordered"
                defaultValue={item.saldo}
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
                    onClick={() => handleEditClick(index + 1)}
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
        ))}
      </TableBody>
    </Table>
  );
};

export default Tabla;
