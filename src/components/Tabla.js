import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AddIcon, SearchIcon } from "./icons/Index";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useGlobalState } from './GlobalState';
import { deleteExtract } from "../service";
import { ExtractItem } from './ExtractItem'

const Tabla = ({ tableData, listData, idBank }) => {
  const { isAdmin, openModal, token } = useGlobalState();
  const [filterValue, setFilterValue] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [datos, setDatos] = useState(tableData);
  const [list, setList] = useState(listData);
  const [createDisabled, setCreateDisabled] = useState(false);

  useEffect(() => {
    if (tableData.length !== 0) {
      setDatos(tableData);
      setList(listData); 
    }
  }, [tableData, listData]);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const handleSelectedDate = (event) =>
  {
    if (event.target) {
      setFilterDate(event.target.value);
    } else {
      setFilterDate("");
    }
  }

  const handleDeleteClick = async (item) => {
    console.log("🚀 handleDeleteClick", item);
    try {
      if (!item.id) {
        openModal([
          "opaque",
          "Extracto Eliminado.",
          "Se eliminó correctamente " + item.name,
        ]);
        const updateDatos = [...datos];
        setDatos(updateDatos.filter((e) => e.id !== item.id));
        setCreateDisabled(false);
      } else {
        await deleteExtract(token, item.id).then(async (result) => {
          if (result.status) {
            openModal([
              "blur",
              "Error en la eliminación del extracto.",
              "No se eliminó correctamente " + item.name,
            ]);
          } else {
            openModal([
              "opaque",
              "Extracto Eliminado.",
              "Se eliminó correctamente " + item.name,
            ]);
            const updateDatos = [...datos];
            setDatos(updateDatos.filter((e) => e.id !== item.id));
            setCreateDisabled(false);
          }
        });
      }
    } catch (err) {
      openModal([
        "blur",
        "Error no esperado",
        "Operación no aceptada " + item.name,
      ]);
    }
  };

  const topContent = useMemo(() => {
    const handleNewExtracto = () => {
      const nuevoExtracto = {
        date: new Date().toISOString().split("T")[0],
        name: "",
        branchOffice: { ...listData[0] },
        bank: { id: idBank },
        detail: "",
        balance: 0,
      };

      setDatos((prevExtractos) => [...prevExtractos, nuevoExtracto]);
    };

    return (
      <div className="flex justify-between gap-3 items-center">
        <Button
          color="primary"
          endContent={<AddIcon />}
          onClick={handleNewExtracto}
          isDisabled={false} // TODO isDisabled vendrá de globalstate
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
  }, [listData, filterValue, onSearchChange, idBank, onClear]);

  const filteredItems = useMemo(() => {
    console.log("filteredItems");
    let filteredExtracts = [...datos];

    if (filterDate.length > 0) {
      filteredExtracts = filteredExtracts.filter(
        (extract) => extract.date.includes(filterDate)
      );
    }

    if (filterValue.length > 3) {
      filteredExtracts = filteredExtracts.filter(
        (extract) =>
          extract.name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          extract.branchOffice.name
              .toLowerCase()
              .includes(filterValue.toLowerCase()) ||
          extract.detail.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredExtracts;
  }, [datos, filterValue, filterDate]);
     
  return (
    <>
      {isAdmin && topContent}
      <table>
        <thead>
          <tr>
            <th>
              <Input
                variant="bordered"
                type="month"
                label="Filtrar por Fecha"
                onChange={(event) => handleSelectedDate(event)}
              />
            </th>
            <th>Descripcion</th>
            <th>Sucursal</th>
            <th>Detalle</th>
            <th>Saldo</th>
            {isAdmin && <th>ACCIONES</th>}
          </tr>
        </thead>
        <tbody>
          {filteredItems.slice(0, 20).map((item, index) => (
            <ExtractItem
              key={item.id}
              id={index}
              item={item}
              list={list}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabla;
