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
import * as React from "react";
import Axios from "../State/Axios.js";

const SUCCESS_MESSAGE = "Receipient added successfully";
const ERROR_MESSAGE = "Receipient already exists";
const DELETE_MESSAGE = "Receipient deleted successfully";

const styles = {
  Icon: {
    marginLeft: "auto",
  },
  Paper: {
    margin: "auto",
    padding: 10,

    marginTop: 30,
    width: 500,
  },
  RecepientItem: {
    padding: "0.6rem",
    marginTop: "1rem",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  },
  RecepientControl: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  },
};

const schema = yup
  .object({
    email: yup.string().required("Receipient email is required"),
    first_name: yup.string().required("First name is required").max(50),
    last_name: yup.string().required("Last name is required").max(50),
  })
  .required();

export default () => {
  const [recepients, setRecepients] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(SUCCESS_MESSAGE);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { first_name: "", last_name: "", email: "" },
    resolver: yupResolver(schema),
  });

  const fetchRecepients = async () => {
    try {
      const response = await Axios.get("recepients");
      console.log(response);
      setRecepients(response.data.rows);
    } catch (error) {
      alert("Error fetching recepients");
    }
  };

  React.useEffect(() => {
    fetchRecepients();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const addNewRecepients = async (data) => {
    console.log(data);
    try {
      const response = await Axios.post("recepients", JSON.stringify(data));
      const result = response.data;

      console.log(result);

      if (result?.error) {
        setMessage(ERROR_MESSAGE);
        setOpen(true);
        return;
      }

      setMessage(SUCCESS_MESSAGE);
      setOpen(true);
      fetchRecepients();
    } catch (error) {
      setMessage(ERROR_MESSAGE);
      setOpen(true);
      return;
    }
  };

  const deleteRecepient = async (id) => {
    const response = await Axios.delete(`recepients/${id}`);

    const result = await response.data;
    console.log(result);
    fetchRecepients();
    setMessage(DELETE_MESSAGE);
    setOpen(true);
  };
  return (
    <Grid spacing={2} container>
      <Grid item xs={12} md={6}>
        <Paper elevation={2} style={styles.Paper}>
          <Typography variant="h4">Add new recepient</Typography>
          <Grid container spacing={3} justifyContent="space-between">
            <Grid item sm={6}>
              <Controller
                name="first_name"
                control={control}
                style={styles.Icon}
                render={({ field }) => (
                  <TextField
                    error={!!errors.email}
                    label="First Name"
                    fullWidth
                    autoComplete="first name"
                    variant="standard"
                    helperText={errors.first_name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6}>
              <Controller
                name="last_name"
                control={control}
                style={styles.Icon}
                render={({ field }) => (
                  <TextField
                    error={!!errors.email}
                    label="Last Name"
                    fullWidth
                    autoComplete="last name"
                    variant="standard"
                    helperText={errors.last_name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item sm={12}>
              <Controller
                name="email"
                control={control}
                style={styles.Icon}
                render={({ field }) => (
                  <TextField
                    error={!!errors.email}
                    label="Recepient Email"
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                    helperText={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSubmit(addNewRecepients)}
              >
                Add Recepient
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography mt={3} variant="h4">
          Recepients list
        </Typography>

        <Box xs={{ display: "flex" }}>
          {/* <Paper elevation={0} style={styles.Paper}> */}
          {/* <Grid container spacing={3} className="mt-3"> */}
          {recepients.map((recepient, id) => {
            return (
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                justifyItems="center"
                style={styles.RecepientItem}
                key={id}
              >
                <Grid container item md={8}>
                  <Grid item sm={6}>
                    <Typography sm={{ m: "2px" }}>
                      {recepient.first_name} {recepient.last_name}
                    </Typography>
                  </Grid>

                  <Grid item sm={12}>
                    <Typography variant="h6">{recepient.email}</Typography>
                  </Grid>
                </Grid>
                <Grid item md={4} style={styles.RecepientControl}>
                  {/* <IconButton aria-label="edit" color="success">
                  <Edit />
                </IconButton> */}
                  <div>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => deleteRecepient(recepient.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            );
          })}
          {/* </Grid> */}
          {/* </Paper> */}
        </Box>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
