import React, { useState, useEffect } from "react";
import { AddIcon } from "./icons/AddIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { CheckIcon } from "./icons/CheckIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { EditIcon } from "./icons/EditIcon";
import { Select, SelectItem } from "@nextui-org/select";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useGlobalState } from './GlobalState';
import { putExtract, postExtract, deleteExtract } from "../service";

const Tabla = ({ tableData, listData, idBank }) => {
  const column_date = "date";
  const column_description = "name";
  const column_detail = "detail";
  const column_balance = "balance"; 
  const column_branchoffice = "branchOffice";
  const { openModal, tableIsUpload } = useGlobalState(); // Utilizamos el estado global
  const [filterValue, setFilterValue] = React.useState("");
  const [editModes, setEditModes] = useState({});
  const [datos, setDatos] = useState(tableData);
  const [list, setList] = useState(listData);
  const [createDisabled, setCreateDisabled] = useState(false);

  useEffect(() => {
    if (tableData.length !== 0) {
      setDatos(tableData);
      setList(listData); 
    }
  }, [tableData, listData]);

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

  const handleSelectField = (event, item, field) => {
    console.log("🚀 handleSelectField", event, item, field);
    const newValue = event.target.value;
    if (newValue)
    {
      const updateDatos = [...datos];
      const extracto = updateDatos.find((e) => e.id === item.id);

      if (field === column_branchoffice) {
        // select elements
        if (extracto[field].id !== newValue)
        {
          extracto[field].id = newValue;
          console.log("💨 select value ", newValue);
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

  const topContent = React.useMemo(() => {
    const handleNewExtracto = () => {
      const nuevoExtracto = {
        date: new Date().toISOString().split("T")[0],
        name: "",
        branchOffice: listData[0],
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

  const handleEditClick = (rowKey) => {
    setEditModes((prevEditModes) => ({
      ...prevEditModes,
      [rowKey]: !prevEditModes[rowKey], // Toggle edition
    }));
  };

  const handleValidateClick = async (item) => {
    try {
      if (!item.id) {
        await postExtract(item).then(async (result) => {
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
            const branchOfficeSelectedName = list.find((e) => e.id === extracto.branchOffice.id).name;
            extracto.id = result;
            extracto.branchOffice.name = branchOfficeSelectedName;
            setCreateDisabled(false);
            setDatos(updateDatos);
            tableIsUpload();
          }
        });        
      } else {
        await putExtract(item).then(async (result) => {
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
        await deleteExtract(item.id).then(async (result) => {
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

  const filteredItems = React.useMemo(() => {
    let filteredExtracts = [...datos];
      if (filterValue.length > 3) {
        filteredExtracts = filteredExtracts.filter(
          (extract) =>
            extract.name
              .toLowerCase()
              .includes(filterValue.toLowerCase()) ||
            extract.branchOffice.name
               .toLowerCase()
               .includes(filterValue.toLowerCase()) ||
            extract.detail.toLowerCase().includes(filterValue.toLowerCase()) ||
            extract.date.includes(filterValue)
        );
    }

    return filteredExtracts;
  }, [datos, filterValue]);

  return (
    
      <table
        aria-label="Example static collection table"
        topContent={topContent}
        topContentPlacement="outside"
      >
        <tr>
          <th>Fecha</th>
          <th>Descripcion</th>
          <th>Sucursal</th>
          <th>Detalle</th>
          <th>Saldo</th>
          <th>ACCIONES</th>
        </tr>
          {filteredItems.map((item, index) => (
            <tr key={item.id + "_" + index + 1}>
              <td>
                <Input
                  isReadOnly={!editModes[index + 1]}
                  type="date"
                  variant="bordered"
                  defaultValue={item.date}
                  className="max-w-xs"
                  onBlur={(event) =>
                    handleSelectField(event, item, column_date)
                  }
                />
              </td>
              <td>
                <Input
                  isReadOnly={!editModes[index + 1]}
                  type="text"
                  variant="bordered"
                  defaultValue={item.name}
                  className="max-w-xs"
                  onBlur={(event) =>
                    handleSelectField(event, item, column_description)
                  }
                />
              </td>
              <td>
                <Select
                  aria-labelledby={list.map((objeto) => objeto.name).join(",")}
                  variant="bordered"
                  items={list}
                  placeholder={item.branchOffice.name}
                  onChange={(event) =>
                    handleSelectField(event, item, column_branchoffice)
                  }
                >
                  {(sucursal) => (
                    <SelectItem key={sucursal.id}>{sucursal.name}</SelectItem>
                  )}
                </Select>
              </td>
              <td>
                <Input
                  isReadOnly={!editModes[index + 1]}
                  type="text"
                  variant="bordered"
                  defaultValue={item.detail}
                  className="max-w-xs"
                  onBlur={(event) =>
                    handleSelectField(event, item, column_detail)
                  }
                />
              </td>
              <td>
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
                  onBlur={(event) =>
                    handleSelectField(event, item, column_balance)
                  }
                />
              </td>
              <td>
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
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handleDeleteClick(item)}
                    >
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
              </td>
            </tr>
          ))}
      </table>
  );
};

export default Tabla;
