import React, { useState } from "react";
import { AddIcon } from "./icons/AddIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { CheckIcon } from "./icons/CheckIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { EditIcon } from "./icons/EditIcon";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
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
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [editModes, setEditModes] = useState({});

      const onClear = React.useCallback(() => {
        setFilterValue("");
      }, []);

      const onSearchChange = React.useCallback((value) => {
        if (value) {
          setFilterValue(value);
        } else {
          setFilterValue("");
        }
      }, []);
  
  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between gap-3 items-center">
        <Button color="primary" endContent={<AddIcon />}>
          Nuevo Extracto
        </Button>
        <Input
          isClearable
          className="w-11/12"
          placeholder="Buscar Extracto..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  const handleEditClick = (rowKey) => {
    // Actualiza el estado del modo de edición específico de la fila al hacer clic en Editar
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [rowKey]: !prevEditModes[rowKey], // Toggle el modo de edición para la fila
    }));
  };

  const datos = Array.isArray(children) ? children : [];
  
    const filteredItems = React.useMemo(() => {
      let filteredExtracts = [...datos];

      if (hasSearchFilter) {
        filteredExtracts = filteredExtracts.filter((user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase())
        );
      }

      return filteredExtracts;
    }, [datos, filterValue, hasSearchFilter]);
  
  return (
    <Table
      aria-label="Example static collection table"
      topContent={topContent}
      topContentPlacement="outside"
    >
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
                <Tooltip color="success" content="Actualizar Extracto">
                  <span className="whitespace-pre text-lg text-success cursor-pointer active:opacity-50">
                    <CheckIcon />
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
