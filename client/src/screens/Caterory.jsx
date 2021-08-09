import {
  makeStyles,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { GlobalState } from "../context/GlobalState";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import axios from "axios";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
    minHeight: "100vh",
    padding: "50px 30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper1: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    width: "100%",
    textTransform: "capitalize",
  },
  input: {
    "& > *": {
      margin: theme.spacing(1),
      width: "90%",
    },
    margin: "15px 0",
  },
  button: {
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
    color: "white",
  },
  icon: {
    marginRight: "10px",
    fontSize: "20px",
  },
}));

function Caterory() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.category;
  const [token] = state.token;
  const isAdmin = state.userAPI.isAdmin;
  const [callback, setCallback] = state.categoryAPI.callback;
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await axios.put(
          `https://course-hub-backend.herokuapp.com/api/category/${id}`,
          { name: category },
          { headers: { Authorization: token } }
        );
        toast.warn("Category Updated");
      } else {
        await axios.post(
          "https://course-hub-backend.herokuapp.com/api/category",
          { name: category },
          { headers: { Authorization: token } }
        );
        toast.success("Created a Category");
      }
      setEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setEdit(true);
  };

  const deleteCategory = async (id) => {
    setId(id);
    try {
      if (window.confirm("Do you want to Delete this Category?")) {
        await axios.delete(
          `https://course-hub-backend.herokuapp.com/api/category/${id}`,
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      toast.error("Category Deleted");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} xl={8} md={8}>
          <TableContainer className={classes.paper} component={Paper}>
            {isAdmin ? (
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <h3>Category Name</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Action</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell align="left">
                        <strong>{row.name}</strong>
                      </TableCell>
                      <TableCell align="right" style={{ display: "flex" }}>
                        <IconButton
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            deleteCategory(row._id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          variant="contained"
                          color="default"
                          onClick={() => {
                            editCategory(row._id, row.name);
                          }}
                        >
                          <EditIcon />
                        </IconButton>{" "}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
          </TableContainer>
        </Grid>
        <Grid item xs={12} xl={4} md={4}>
          <Paper className={classes.paper1}>
            <h2 style={{ color: "black" }}>Add Category</h2>
            {isAdmin ? (
              <form
                className={classes.input}
                noValidate
                onSubmit={addCategory}
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Category Name"
                  variant="outlined"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
                <Button
                  className={classes.button}
                  variant="contained"
                  type="submit"
                >
                  <SaveAltIcon className={classes.icon} />{" "}
                  {edit ? "update" : "save"}
                </Button>
              </form>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Caterory;
