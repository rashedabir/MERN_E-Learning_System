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
import React from "react";

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
                />
                <br></br>
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <br></br>
                <br></br>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
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
