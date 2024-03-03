import React, { useState } from "react";
import { AddIcon } from "./icons/AddIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { CheckIcon } from "./icons/CheckIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { EditIcon } from "./icons/EditIcon";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useGlobalState } from './GlobalState'; // Ajusta la ruta según tu estructura de carpetas
import { putExtract } from "../service";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const Tabla = ({ tableData, listData }) => {
  const { openModal } = useGlobalState(); // Utilizamos el estado global
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [editModes, setEditModes] = useState({});
  const [datos, setDatos] = useState(tableData);
  const [list, setList] = useState(listData);

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

  const handleNewExtracto = () => {
    // Añadir una nueva fila vacía al estado de los datos
    const nuevoExtracto = {
      id: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      branchOffice: "",
      detail: "",
      balance: 0,
    };
    setDatos((prevExtractos) => [...prevExtractos, nuevoExtracto]);
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between gap-3 items-center">
        <Button
          color="primary"
          endContent={<AddIcon />}
          onClick={handleNewExtracto}
        >
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

  const handleValidateClick = (item, rowKey) => {
    // TODO no coje los valores nuevos...
    console.log("putExtract 1", item, rowKey);
    // Actualiza el estado del modo de edición específico de la fila al hacer clic en Editar
    // const backdrop = ["opaque", "blur", "transparent"];
    var response = putExtract(item);
    console.log('putExtract 2', response);
    if (response) {
      openModal([
        "opaque",
        "Extracto Actualizado",
        "Se actualizó correctamente " + item.description,
      ]);  
    } else {
      openModal([
        "opaque",
        "Extracto NO Actualizado",
        "No Se actualizó correctamente " + item.description,
      ]);  
    }
  };

  const filteredItems = React.useMemo(() => {
    console.log("tableData", tableData);
    console.log("list", list);
    console.log("listData", listData);
    if (list?.length === 0) {
      setList(listData);
    }
    

    if (datos.length === 0) {
      setDatos(tableData);
    }

    let filteredExtracts = [...datos];

    if (hasSearchFilter) {
      if (filterValue.length > 3) {
        filteredExtracts = filteredExtracts.filter(
          (extract) =>
            extract.description
              .toLowerCase()
              .includes(filterValue.toLowerCase()) ||
            // extract.sucursal
            //   .toLowerCase()
            //   .includes(filterValue.toLowerCase()) ||
            extract.detail.toLowerCase().includes(filterValue.toLowerCase()) ||
            extract.date.includes(filterValue)
        );
      }
    }

    return filteredExtracts;
  }, [list, listData, datos, hasSearchFilter, tableData, filterValue]);

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
        {filteredItems.map((item, index) => (
          <TableRow key={item.id + "_" + index + 1}>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="date"
                variant="bordered"
                defaultValue={item.date}
                className="max-w-xs"
              />
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="text"
                variant="bordered"
                defaultValue={item.description}
                className="max-w-xs"
              />
            </TableCell>
            <TableCell>
              <Select
                variant="bordered"
                items={list}
                placeholder={item.branchOffice.name}
              >
                {(sucursal) => (
                  <SelectItem key={sucursal.id}>
                    {sucursal.name}
                  </SelectItem>
                )}
              </Select>
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="text"
                variant="bordered"
                defaultValue={item.detail}
                className="max-w-xs"
              />
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="number"
                variant="bordered"
                defaultValue={item.balance}
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
                  <span
                    className="whitespace-pre text-lg text-success cursor-pointer active:opacity-50"
                    onClick={() => handleValidateClick(item, index + 1)}
                  >
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
