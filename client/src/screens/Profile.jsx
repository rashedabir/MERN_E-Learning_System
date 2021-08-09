import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import LoadingScreen from "react-loading-screen";
import { GlobalState } from "../context/GlobalState";
import axios from "axios";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
    minHeight: "100vh",
    padding: "50px 30px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  input: {
    width: "100%",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    height: "50px",
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
    marginTop: "10px",
  },
  option: {
    width: "100%",
    height: "40px",
    fontSize: "15px",
    marginBottom: "10px",
    outline: "none",
    border: "none",
    borderBottom: "2px solid #ccc",
    marginTop: "8px",
  },
}));

function Profile() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.userAPI.user;
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [id, setId] = useState("");
  const [callback, setCallback] = state.userAPI.callback;
  var date = new Date(user.updatedAt);
  date = date.toDateString();

  console.log(user);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post(
        "https://course-hub-backend.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImage(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://course-hub-backend.herokuapp.com/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  useEffect(() => {
    if (user._id) {
      setId(user._id);
      setName(user.name);
      setUserName(user.userName);
      setEmail(user.email);
      setNumber(user.number);
      setCountry(user.country);
      setRegion(user.region);
      setImage(user.image);
    } else {
      setName("");
      setUserName("");
      setEmail("");
      setNumber("");
      setCountry("");
      setRegion("");
      setImage(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://course-hub-backend.herokuapp.com/user/infor/${id}`,
        {
          name: name,
          password: password,
          rePassword: rePassword,
          number: number,
          country: country,
          region: region,
          image: image,
        },
        { headers: { Authorization: token } }
      );
      setCallback(!callback);
      toast.success("Profile Updated");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5} md={5} sm={12}>
            <Paper className={classes.paper}>
              <div className="profile_upload">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={handleUpload}
                />
                {loading ? (
                  <LoadingScreen
                    loading={loading}
                    bgColor="#f1f1f1"
                    spinnerColor="#9ee5f8"
                    textColor="#676767"
                    logoSrc="/logo.png"
                  />
                ) : (
                  <div id="file_img" style={styleUpload}>
                    <img src={image ? image.url : ""} alt="" />
                    <span onClick={handleDestroy}>X</span>
                  </div>
                )}
              </div>
              <br></br>
              <Typography variant="h5">{user.name}</Typography>
              <Typography> Last Update: {date} </Typography>
              <Typography>You Enrolled {user.list.length} Course</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={7} md={7} sm={12}>
            <Paper className={classes.paper}>
              <Typography style={{ padding: "20px 0" }} variant="h4">
                Update Profile
              </Typography>
              <TextField
                className={classes.input}
                id="standard-input"
                label="Username"
                type="text"
                disabled
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              />
              <br></br>
              <TextField
                className={classes.input}
                id="standard-password-input"
                label="New Password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
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
                value={rePassword}
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
                value={name}
              />
              <br></br>
              <TextField
                className={classes.input}
                id="standard-input"
                label="Email"
                type="email"
                disabled
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
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
                value={number}
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
                update
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Profile;
