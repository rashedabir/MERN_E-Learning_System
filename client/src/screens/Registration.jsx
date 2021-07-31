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
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

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
    marginBottom: "10px",
  },
  button: {
    width: "300px",
    height: "50px",
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
  },
  option: {
    width: "300px",
    height: "40px",
    fontSize: "15px",
    marginBottom: "10px",
    outline: "none",
    border: "2px solid #ccc",
  },
}));

function Registration() {
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  return (
    <Container maxWidth="xl" className="form_reg">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Paper className={classes.paper}>
                <Typography variant="h4">Sign up</Typography>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Username"
                  type="text"
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-password-input"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Name"
                  type="text"
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Email"
                  type="email"
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Number"
                  type="number"
                />
                <br></br>
                <CountryDropdown
                  id="demo-simple-select"
                  labelId="demo-simple-select-label"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  className={classes.option}
                />
                <br></br>
                <RegionDropdown
                  className={classes.option}
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                />
                <br></br>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  sign up
                </Button>
                <br></br>
                <Typography variant="h6">
                  Already have an account? <Link to="/login">Sign in</Link>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Registration;
