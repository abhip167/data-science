import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

  useEffect(() => {
    fetchRecepients();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchRecepients = async () => {
    const response = await AxiosModule.get("http://localhost:3000/details");
    const data = response.data;
    setRecepients(data.rows);
    console.log(data.rows);
  };

  const addNewRecepients = async (data) => {
    console.log(data);
    const response = await fetch("http://localhost:3000/recepients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (result?.error) {
      setMessage(ERROR_MESSAGE);
      setOpen(true);
      return;
    }
    setMessage(SUCCESS_MESSAGE);
    setOpen(true);
    fetchRecepients();
  };

  const deleteRecepient = async (id) => {
    const response = await fetch(`http://localhost:3000/recepients/${id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const result = await response.json();
    console.log(result);
    fetchRecepients();
    setMessage(DELETE_MESSAGE);
    setOpen(true);
  };
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
