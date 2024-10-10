
export const Tabla = () => {
  return (
    <div className="w-full overflow-x-auto scrollbar-container-x">
      <table className="min-w-[640px] w-full mx-auto">
        <thead>
          <tr className="bg-cyan-600 text-white text-[2rem]">
            <th>Descripcion</th>
            <th>Sucursal</th>
            <th>Detalle</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white text-black text-center text-[1.4rem] odd:bg-gray-100 even:bg-white">
            <td>description data 1</td>
            <td>Sucursal data 1</td>
            <td>Detalle data 1</td>
            <td>Saldo data 1</td>
          </tr>
          <tr className="bg-white text-black text-center text-[1.4rem] odd:bg-gray-100 even:bg-white">
            <td>description data 2</td>
            <td>Sucursal data 2</td>
            <td>Detalle data 2</td>
            <td>Saldo data 2</td>
          </tr>
          <tr className="bg-white text-black text-center text-[1.4rem] odd:bg-gray-100 even:bg-white">
            <td>description data 3</td>
            <td>Sucursal data 3</td>
            <td>Detalle data 3</td>
            <td>Saldo data 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
