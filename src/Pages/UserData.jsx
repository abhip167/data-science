import { useEffect, useState, useMemo } from "react";

import { Box, Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";

import AxiosModule from "../State/Axios.js";
import MaterialReactTable from "material-react-table";

import { ExportToCsv } from "export-to-csv";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200, //decrease the width of this column
  },
  {
    accessorKey: "organization",
    header: "Organization",
    size: 100, //decrease the width of this column
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 100, //decrease the width of this column
  },
  {
    accessorKey: "phone",
    header: "Phone",
    size: 100, //decrease the width of this column
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
  {
    accessorKey: "collectionMethod",
    header: " Collection Method",
    size: 200,
  },
  {
    accessorKey: "format",
    header: "Data Fromat",
    size: 200,
  },
  {
    accessorKey: "updateFrequency",
    header: "Data Update Frequency",
    size: 200,
  },
  {
    accessorKey: "ethicsApproval",
    header: "Ethics Approval",
    size: 200,
  },
  {
    accessorKey: "collaboration",
    header: "Collaboration Availablity",
    size: 200,
  },
  {
    accessorKey: "financialSupport",
    header: "Financial Support ",
    size: 200,
  },
];

const csvOptions = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

export default () => {
  const [recepients, setRecepients] = useState([]);

  const handleExportData = () => {
    csvExporter.generateCsv(recepients);
  };

  const fetchRecepients = async () => {
    const response = await AxiosModule.get("details");
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
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
        >
          <Button
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownload />}
            variant="contained"
          >
            Export All Data
          </Button>
        </Box>
      )}
    />
  );
};
