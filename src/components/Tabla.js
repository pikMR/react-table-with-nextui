import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AddIcon, SearchIcon } from "./icons/Index";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { useGlobalState } from './GlobalState';
import { deleteExtract } from "../service";
import { ExtractItem } from './ExtractItem'


const Tabla = ({ tableData, listData, idBank }) => {
  const { isAdmin, openModal, token, filterbo } = useGlobalState();
  const [filterValue, setFilterValue] = useState("");
  const [filterDate, setFilterDate] = useState([]);
  const [datos, setDatos] = useState(tableData);
  const [list, setList] = useState(listData);
  const [createDisabled, setCreateDisabled] = useState(false);
  const [loadedRows, setLoadedRows] = useState(50);

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

  const handleSelectedDate = (event) => {
    let start = event.start;
    let end = event.end;
    if (event.start && event.end) {
      let datestart = start.year + "-" + start.month + "-" + start.day;
      let dateend = end.year + "-" + end.month + "-" + end.day;
      setFilterDate([parseDate(datestart), parseDate(dateend)]);
    } else {
      setFilterDate([]);
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

  function parseDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function parseDateExtract(extract) {
    const [year, month, day] = extract.date.split("-").map(Number);
    return {
      ...extract,
      date: new Date(year, month - 1, day),
    };
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

      setDatos((prevExtractos) => [nuevoExtracto, ...prevExtractos]);
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
  }, [createDisabled, filterValue, onSearchChange, listData, idBank, onClear]);

  const filteredItems = useMemo(() => {
    console.log("filteredItems");
    let filteredExtracts = [...datos];
    
    if (filterDate.length > 0) {
      const parsedToDate = filteredExtracts.map(parseDateExtract);
      
      let filterToDate = parsedToDate.filter((extract) => {
        return extract.date >= filterDate[0] && extract.date <= filterDate[1];
      });

      filteredExtracts = filteredExtracts.filter((extract) =>
        filterToDate.some((filtered) => filtered.id === extract.id)
      );
    }

    if (filterValue.length > 3) {
      filteredExtracts = filteredExtracts.filter(
        (extract) =>
          extract.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          extract.detail.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterbo !== "") {
      filteredExtracts = filteredExtracts.filter((extract) =>
        extract.branchOffice.name.toLowerCase().includes(filterbo.toLowerCase())
      );
    }

    return filteredExtracts;
  }, [datos, filterDate, filterValue, filterbo]);

  return (
    <>
      {isAdmin && topContent}
      <table>
        <thead>
          <tr>
            <th>
              <DateRangePicker
                label="rango extractos"
                visibleMonths={2}
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
          {filteredItems.slice(0, loadedRows).map((item, index) => (
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
      <Button
        isDisabled={loadedRows >= filteredItems.length}
        color="primary"
        endContent={<AddIcon />}
        onClick={() => setLoadedRows((prevrows) => prevrows + 50)}
      >
        Cargar Más Datos{" "}
        {loadedRows >= filteredItems.length ? filteredItems.length : loadedRows}{" "}
        / {filteredItems.length}
      </Button>
    </>
  );
};

export default Tabla;
