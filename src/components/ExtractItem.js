import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";
import { EditIcon, DeleteIcon, CheckIcon } from "./icons/Index";

export const ExtractItem = ({
  id,
  item,
  handleSelectField,
  handleValidateClick,
  handleDeleteClick,
  list,
}) => {
  const column_date = "date";
  const column_description = "name";
  const column_detail = "detail";
  const column_balance = "balance";
  const column_branchoffice = "branchOffice";
  const [editModes, setEditModes] = useState(false);
  
  const handleEditClick = () => {
    console.log('handleEditClik!');
    setEditModes((prevCheck) => !prevCheck);
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
          onBlur={(event) =>
            editModes && handleSelectField(event, item, column_date)
          }
        />
      </td>
      <td>
        <Input
          isReadOnly={!editModes}
          type="text"
          variant="bordered"
          defaultValue={item.name}
          className="max-w-xs"
          onBlur={(event) =>
            editModes && handleSelectField(event, item, column_description)
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
            editModes && handleSelectField(event, item, column_branchoffice)
          }
        >
          {(sucursal) => (
            <SelectItem key={sucursal.id}>{sucursal.name}</SelectItem>
          )}
        </Select>
      </td>
      <td>
        <Input
          isReadOnly={!editModes}
          type="text"
          variant="bordered"
          defaultValue={item.detail}
          className="max-w-xs"
          onBlur={(event) =>
            editModes && handleSelectField(event, item, column_detail)
          }
        />
      </td>
      <td>
        <Input
          isReadOnly={!editModes}
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
            editModes && handleSelectField(event, item, column_balance)
          }
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
  );
};
