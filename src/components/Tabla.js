import { DateRangePicker } from "@nextui-org/date-picker";

export const Tabla = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <DateRangePicker
              label="rango extractos"
              visibleMonths={2}
              onChange={(event) => console.log(event)}
            />
          </th>
          <th>Descripcion</th>
          <th>Sucursal</th>
          <th>Detalle</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};
