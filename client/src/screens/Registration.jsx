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
    marginBottom: "10px",
  },
  button: {
    width: "300px",
    height: "50px",
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
    marginTop: "10px",
  },
  option: {
    width: "300px",
    height: "40px",
    fontSize: "15px",
    marginBottom: "10px",
    outline: "none",
    border: "none",
    borderBottom: "2px solid #ccc",
    marginTop: "8px",
  },
}));

function Registration() {
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://course-hub-backend.herokuapp.com/user/register",
        {
          userName: userName,
          name: name,
          email: email,
          password: password,
          rePassword: rePassword,
          number: number,
          country: country,
          region: region,
        }
      );
      window.location.href = "/";
      toast.success("Registration Complete");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

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
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
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
                <TextField
                  className={classes.input}
                  id="standard-password-input"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Name"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <br></br>
                <TextField
                  className={classes.input}
                  id="standard-input"
                  label="Number"
                  type="number"
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
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
                  onClick={handleSubmit}
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
