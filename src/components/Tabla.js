import React, { useState, useRef } from "react";
import { AddIcon } from "./icons/AddIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { CheckIcon } from "./icons/CheckIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { EditIcon } from "./icons/EditIcon";
import { Select, SelectItem } from "@nextui-org/select";
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
  const column_date = "date";
  const column_description = "description";
  const column_detail = "detail";
  const column_balance = "balance";
  
  const { openModal } = useGlobalState(); // Utilizamos el estado global
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [editModes, setEditModes] = useState({});
  const [datos, setDatos] = useState(tableData);
  const [list, setList] = useState(listData);
  const itemsRef = useRef(null);

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

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

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

  const handleValidateClick = async (item) => {
    var map = getMap();
    var nuevoValorDate = map.get(item.id + "_" + column_date);
    var nuevoValorBalance = map.get(item.id + "_" + column_balance);
    var nuevoValorDescription = map.get(item.id + "_" + column_description);
    var nuevoValorDetail = map.get(item.id + "_" + column_detail);
    item.date = nuevoValorDate ?? item.date;
    item.balance = nuevoValorBalance ?? item.balance;
    item.description = nuevoValorDescription ?? item.description;
    item.detail = nuevoValorDetail ?? item.detail;
    
    try {
      var update = await putExtract(item);
      console.log("update", update);
      openModal([
      "opaque",
      "Extracto Actualizado",
      "Se actualizó correctamente " + item.description,
      ]);  
    } catch (err) {
      console.log("put",err);
      openModal([
      "opaque",
      "Extracto NO Actualizado",
      "No Se actualizó correctamente " + item.description,]); 
    }
  };

  const filteredItems = React.useMemo(() => {
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
                baseRef={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(
                      item.id + "_" + column_date,
                      node.querySelector("input").value
                    );
                  } else {
                    map.delete(item.id + "_" + column_date);
                  }
                }}
                // onChange={handleChange(item, index)}
              />
            </TableCell>
            <TableCell>
              <Input
                isReadOnly={!editModes[index + 1]}
                type="text"
                variant="bordered"
                defaultValue={item.description}
                className="max-w-xs"
                baseRef={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(
                      item.id + "_" + column_description,
                      node.querySelector("input").value
                    );
                  } else {
                    map.delete(item.id + "_" + column_description);
                  }
                }}
                // onChange={handleChange(item, index)}
              />
            </TableCell>
            <TableCell>
              <Select
                aria-labelledby={list.map(objeto => objeto.name).join(",")}
                variant="bordered"
                items={list}
                placeholder={item.branchOffice.name}
              >
                {(sucursal) => (
                  <SelectItem key={sucursal.id}>{sucursal.name}</SelectItem>
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
                baseRef={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(
                      item.id + "_" + column_detail,
                      node.querySelector("input").value
                    );
                  } else {
                    map.delete(item.id + "_" + column_detail);
                  }
                }}
                // onChange={handleChange(item, index)}
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
                baseRef={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(
                      item.id + "_" + column_balance,
                      node.querySelector("input").value
                    );
                  } else {
                    map.delete(item.id + "_" + column_balance);
                  }
                }}
                // onChange={handleChange(item, index)}
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
                    onClick={() => handleValidateClick(item)}
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
