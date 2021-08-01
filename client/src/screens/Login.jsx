import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  TextField,
  Container,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: "100%",
    textAlign: "center",
    padding: "30px 20px",
    borderRadius: "20px",
  },
  input: {
    width: "300px",
  },
  button: {
    width: "300px",
    height: "50px",
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
  },
}));

function Login() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", {
        userName: userName,
        password: password,
      });
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
      toast.success("Wellcome");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Container maxWidth="xl" className="form">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Paper className={classes.paper}>
                <Typography variant="h4">Login</Typography>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Username"
                  type="text"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <br></br>
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br></br>
                <br></br>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  sign in
                </Button>
                <br></br>
                <Typography variant="h6">
                  Don't have an account? <Link to="/registration">Sign Up</Link>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
