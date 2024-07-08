import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AddIcon, SearchIcon } from "./icons/Index";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useGlobalState } from './GlobalState';
import { ExtractItem } from './ExtractItem'
import { putExtract, postExtract, deleteExtract } from "../service";

const Tabla = ({ tableData, listData, idBank }) => {
  const { openModal, tableIsUpload, token, isAdmin } = useGlobalState(); // Utilizamos el estado global
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
      setCreateDisabled(true);
      setDatos((prevExtractos) => [...prevExtractos, nuevoExtracto]);
    };

    return (
      <div className="flex justify-between gap-3 items-center">
        <Button
          color="primary"
          endContent={<AddIcon />}
          onClick={handleNewExtracto}
          isDisabled={createDisabled}
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
  }, [listData, createDisabled, filterValue, onSearchChange, idBank, onClear]);

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
 
  const Extracts = useMemo(() => {
    const handleSelectField = (event, item, field) => {
      console.log("🚀 handleSelectField", event, item, field);
      const newValue = event.target.value;
      if (newValue) {
        const updateDatos = [...datos];
        const extracto = updateDatos.find((e) => e.id === item.id);
        if (field === "branchOffice") {
          // select elements
          const splitNewValue = newValue.split("_")[0];
          if (extracto[field].id !== splitNewValue) {
            extracto[field].id = splitNewValue;
            extracto[field].name = list.find(
              (x) => x.id === splitNewValue
            ).name;
            console.log("💨 select value ", splitNewValue);
            setDatos(updateDatos);
          }
        } else if (extracto[field] !== newValue) {
          // input elements
          extracto[field] = newValue;
          console.log("💨 input value ", extracto[field], newValue);
          setDatos(updateDatos);
        }
      }
    };

    const handleValidateClick = async (item) => {
      console.log("🚀 handleValidateClick", item);
      try {
        if (!item.id) {
          await postExtract(token, item).then(async (result) => {
            if (result.status) {
              openModal([
                "blur",
                "Error en la creación del extracto.",
                "No se creó correctamente " + item.name,
              ]);
            } else {
              openModal([
                "opaque",
                "Extracto Creado",
                "Se creó correctamente " + item.name,
              ]);
              const updateDatos = [...datos];
              const extracto = updateDatos.find((e) => e.id === item.id);
              const branchOfficeSelectedName = list.find(
                (e) => e.id === extracto.branchOffice.id
              ).name;
              extracto.id = result;
              extracto.branchOffice.name = branchOfficeSelectedName;
              setCreateDisabled(false);
              setDatos(updateDatos);
              tableIsUpload();
            }
          });
        } else {
          await putExtract(token, item).then(async (result) => {
            if (result.status) {
              openModal([
                "blur",
                "Error en la actualización del extracto.",
                "No se actualizó correctamente " + item.name,
              ]);
            } else {
              openModal([
                "opaque",
                "Extracto Actualizado",
                "Se actualizó correctamente " + item.name,
              ]);
              tableIsUpload();
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
              tableIsUpload();
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

    return (
      <>
        {filteredItems.slice(0,20).map((item, index) => (
          <ExtractItem
            key={index}
            id={index}
            item={item}
            handleSelectField={handleSelectField}
            handleValidateClick={handleValidateClick}
            handleDeleteClick={handleDeleteClick}
           list={list}
          />
        ))}
      </>
    );
  },[datos, filteredItems, list, openModal, tableIsUpload, token]);
  
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
            {Extracts}
        </tbody>
      </table>
    </>
  );
};

export default Tabla;
