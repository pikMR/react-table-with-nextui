import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";
import { EditIcon, DeleteIcon, CheckIcon } from "./icons/Index";
import { putExtract, postExtract } from "../service";
import { useGlobalState } from "./GlobalState";

export const ExtractItem = ({
  id,
  item,
  list,
  handleDeleteClick
}) => {

  const { openModal, tableIsUpload, token } = useGlobalState();
  const [editModes, setEditModes] = useState(false);
  const [data, setData] = useState(item);

  const handleEditClick = () => {
    console.log("handleEditClik!");
    setEditModes((prevCheck) => !prevCheck);
  };

  const handleSelectBranchOffice = (event) => {
    const newValue = event.target.value;
    console.log("💨 branchoffice select value ", newValue);

    const newBranchOffice = list.find((x) => x.id === newValue);
    const { branchOffice } = data;
    if (branchOffice.id !== newValue) {
      branchOffice.id = newBranchOffice.id;
      branchOffice.name = newBranchOffice.name;
      setData(data);
    }
  };

  const handleSelectDate = (event) => {
    debugger;
    const newValue = event.target.value;
    console.log("💨 date select value ", newValue);

    if (data.date !== newValue) {
      data.date = newValue;
      setData(data);
    }
  };

  const handleSelectDesc = (event) => {
    debugger;
    const newValue = event.target.value;
    console.log("💨 description select value ", newValue);

    if (data.name !== newValue) {
      data.name = newValue;
      setData(data);
    }
  };

  const handleSelectDetail = (event) => {
    debugger;
    const newValue = event.target.value;
    console.log("💨 detail select value ", newValue);

    if (data.detail !== newValue) {
      data.detail = newValue;
      setData(data);
    }
  };

  const handleSelectBalance = (event) => {
    debugger;
    const newValue = event.target.value;
    console.log("💨 balance select value ", newValue);

    if (data.balance !== newValue) {
      data.balance = newValue;
      setData(data);
    }
  };

  const handleValidateClick = async () => {
    debugger;
    console.log("🚀 handleValidateClick");
    try {
      if (!data.id) {
        await postExtract(token, data).then(async (result) => {
          if (result.status) {
            openModal([
              "blur",
              "Error en la creación del extracto.",
              "No se creó correctamente " + data.name,
            ]);
          } else {
            openModal([
              "opaque",
              "Extracto Creado",
              "Se creó correctamente " + data.name,
            ]);

            const branchOfficeSelectedName = list.find(
              (e) => e.id === data.branchOffice.id
            ).name;

            data.id = result;
            data.branchOffice.name = branchOfficeSelectedName;

            setData(data);
            tableIsUpload();
            // TODO enviamos evento para añadir al padre
          }
        });
      } else {
        await putExtract(token, data).then(async (result) => {
          if (result.status) {
            openModal([
              "blur",
              "Error en la actualización del extracto.",
              "No se actualizó correctamente " + data.name,
            ]);
          } else {
            openModal([
              "opaque",
              "Extracto Actualizado",
              "Se actualizó correctamente " + data.name,
            ]);
            tableIsUpload();
          }
        });
      }
    } catch (err) {
      openModal([
        "blur",
        "Error no esperado",
        "Operación no aceptada " + data.name,
      ]);
    }
  };

  return (
    <tr key={id}>
      <td>
        <Input
          isReadOnly={!editModes}
          type="date"
          variant="bordered"
          defaultValue={data.date}
          className="max-w-xs"
          onBlur={(event) => editModes && handleSelectDate(event)}
        />
      </td>
      <td>
        <Input
          isReadOnly={!editModes}
          isDisabled={!editModes}
          type="text"
          variant="bordered"
          defaultValue={data.name}
          className="max-w-xs"
          onBlur={(event) => editModes && handleSelectDesc(event)}
        />
      </td>
      <td>
        <Select
          aria-labelledby={list.map((objeto) => objeto.name).join(",")}
          variant="bordered"
          items={list}
          isDisabled={!editModes}
          placeholder={data.branchOffice.name}
          onChange={(event) => editModes && handleSelectBranchOffice(event)}
        >
          {(sucursal) => (
            <SelectItem key={sucursal.id}>{sucursal.name}</SelectItem>
          )}
        </Select>
      </td>
      <td>
        <Input
          isReadOnly={!editModes}
          isDisabled={!editModes}
          type="text"
          variant="bordered"
          defaultValue={data.detail}
          className="max-w-xs"
          onBlur={(event) => editModes && handleSelectDetail(event)}
        />
      </td>
      <td>
        <Input
          isReadOnly={!editModes}
          isDisabled={!editModes}
          type="number"
          variant="bordered"
          defaultValue={data.balance}
          className="max-w-xs"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          onBlur={(event) => editModes && handleSelectBalance(event)}
        />
      </td>
      <td>
        <div className="relative flex items-center gap-2">
          <Tooltip content="Editar Extracto">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => handleEditClick()}
            >
              <EditIcon />
            </span>
          </Tooltip>
          {editModes &&
            <>
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
                onClick={() => handleValidateClick()}
              >
                <CheckIcon />
              </span>
              </Tooltip>
            </>
          }
        </div>
      </td>
    </tr>
  );
};
