import { useEffect, useState, useMemo } from "react";
import AxiosModule from "../State/Axios.js";
import MaterialReactTable from "material-react-table";

const SUCCESS_MESSAGE = "Receipient added successfully";
const ERROR_MESSAGE = "Receipient already exists";
const DELETE_MESSAGE = "Receipient deleted successfully";

export default () => {
  const [recepients, setRecepients] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name", //uses the default width from defaultColumn prop
      },
      {
        accessorKey: "organization",
        header: "Organization",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "nature_of_work",
        header: "Nature of work",
        size: 300, //decrease the width of this column
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 300, //decrease the width of this column
      },
      {
        accessorKey: "timestamp",
        header: "Created At",
      },
    ],
    []
  );

  const fetchRecepients = async () => {
    const response = await AxiosModule.get("http://localhost:3000/details");
    const data = response.data;
    setRecepients(data.rows);
    console.log(data.rows);
  };
  useEffect(() => {
    fetchRecepients();
  }, []);

  return (
    <MaterialReactTable
      title="User Data"
      columns={columns}
      data={recepients}
      //optionally override the default column widths
      defaultColumn={{
        maxSize: 900,
        minSize: 80,
        size: 80, //default size is usually 180
      }}
      enableColumnResizing
      columnResizeMode="onChange" //default is "onEnd"
    />
  );
};
