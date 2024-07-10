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
  const [ editModes, setEditModes ] = useState(false);

  const handleEditClick = () => {
    console.log("handleEditClik!");
    setEditModes((prevCheck) => !prevCheck);
  };

  const handleSelectBranchOffice = (event) => {
    const newValue = event.target.value;
    console.log("💨 branchoffice select value ", newValue);

    const newBranchOffice = list.find((x) => x.id === newValue);
    const { branchOffice } = item;
    if (branchOffice.id !== newValue) {
      branchOffice.id = newBranchOffice.id;
      branchOffice.name = newBranchOffice.name;
    }
  };

  const handleSelectDate = (event) => {
    const newValue = event.target.value;
    console.log("💨 date select value ", newValue);

    if (item.date !== newValue) {
      item.date = newValue;
    }
  };

  const handleSelectDesc = (event) => {
    const newValue = event.target.value;
    console.log("💨 description select value ", newValue);

    if (item.name !== newValue) {
      item.name = newValue;
    }
  };

  const handleSelectDetail = (event) => {
    const newValue = event.target.value;
    console.log("💨 detail select value ", newValue);

    if (item.detail !== newValue) {
      item.detail = newValue;
    }
  };

  const handleSelectBalance = (event) => {
    const newValue = event.target.value;
    console.log("💨 balance select value ", newValue);

    if (item.balance !== newValue) {
      item.balance = newValue;
    }
  };

  const handleValidateClick = async () => {
    console.log("🚀 handleValidateClick");
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

            const branchOfficeSelectedName = list.find(
              (e) => e.id === item.branchOffice.id
            ).name;

            item.id = result;
            item.branchOffice.name = branchOfficeSelectedName;
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

  return (
    <tr key={id}>
      <td>
        <Input
          isReadOnly={!editModes}
          type="date"
          variant="bordered"
          defaultValue={item.date}
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
          defaultValue={item.name}
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
          placeholder={item.branchOffice.name}
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
          defaultValue={item.detail}
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
          defaultValue={item.balance}
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
        <div className="relative flex items-center">
          <Tooltip content="Editar Extracto">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => handleEditClick()}
            >
              <EditIcon />
            </span>
          </Tooltip>
          {editModes && (
            <>
              <Tooltip color="success" content="Actualizar Extracto">
                <span
                  className="whitespace-pre text-lg text-success cursor-pointer active:opacity-50"
                  onClick={() => handleValidateClick()}
                >
                  <CheckIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar Extracto">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDeleteClick(item)}
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
