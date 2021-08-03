import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { GlobalState } from "../context/GlobalState";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "react-loading-screen";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
    padding: "0 50px",
    paddingTop: "50px",
    margin: 0,
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
  },
  page: {
    background: "white",
  },
  page1: {
    background: "white",
    padding: "0 15px",
    border: "1px solid #eee",
  },
  fullWidth: {
    width: "100%",
    marginBottom: "15px",
  },
  halfWidth: {
    width: "89%",
    marginBottom: "15px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heading: {
    padding: "20px",
  },
}));

function AddCourse() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoryAPI.category;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [callback, setCallback] = state.courseAPI.callback;
  const classes = useStyles();

  /*-----------------objective-------------------*/

  const [objectives, setObjectives] = useState([
    {
      id: uuidv4(),
      objective: "",
    },
  ]);

  const handleChangeObjective = (id, event) => {
    const newInputFields = objectives.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setObjectives(newInputFields);
  };

  const handleAddObjective = () => {
    setObjectives([...objectives, { id: uuidv4(), objective: "" }]);
  };

  const handleRemoveObjective = (id) => {
    const values = [...objectives];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setObjectives(values);
  };

  /*----------------requirement-------------*/

  const [requirements, setRequirements] = useState([
    {
      id: uuidv4(),
      requrement: "",
    },
  ]);

  const handleChangeRequirement = (id, event) => {
    const newInputFields = requirements.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setRequirements(newInputFields);
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, { id: uuidv4(), requrement: "" }]);
  };

  const handleRemoveRequirements = (id) => {
    const values = [...requirements];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setRequirements(values);
  };

  /*-------------------------videos-----------------------*/

  const [videos, setVideos] = useState([
    {
      id: uuidv4(),
      no: 1,
      vid: "",
      link: "",
    },
  ]);

  const handleChangeVideos = (id, event) => {
    const newInputFields = videos.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setVideos(newInputFields);
  };

  const handleAddVideos = (e) => {
    e.preventDefault();
    setVideos([
      ...videos,
      {
        id: uuidv4(),
        no: videos.length + 1,
        vid: "",
        link: "",
      },
    ]);
  };

  const handleRemoveVideos = (id) => {
    const values = [...videos];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setVideos(values);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
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
        "/api/destroy",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/courses",
        {
          course_code: code,
          title: title,
          price: price,
          description: description,
          about: about,
          images: image,
          category: category,
          objective: objectives,
          requirements: requirements,
          videos: videos,
        },
        { headers: { Authorization: token } }
      );
      setCallback(!callback);
      toast.success("Course Addedd");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.page} component={Paper} container spacing={3}>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <div className={classes.paper}>
            <TextField
              className={classes.fullWidth}
              id="filled-basic"
              label="Course Code"
              variant="filled"
              onChange={(e) => {
                setCode(e.target.value);
              }}
              value={code}
            />
            <TextField
              className={classes.fullWidth}
              id="filled-basic"
              label="Title"
              variant="filled"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <TextField
              className={classes.fullWidth}
              id="filled-basic"
              label="Price"
              variant="filled"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            />
            <FormControl variant="filled" className={classes.fullWidth}>
              <InputLabel>Category</InputLabel>
              <Select
                native
                inputProps={{
                  id: "filled-age-native-simple",
                }}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              >
                <option aria-label="None" value="" />
                {categories &&
                  categories.map((cat) => (
                    <option value={cat.name}> {cat.name} </option>
                  ))}
              </Select>
            </FormControl>
            <TextField
              id="filled-multiline-static"
              label="Course Description"
              multiline
              rows={4}
              variant="filled"
              className={classes.fullWidth}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
            {objectives.map((objective, index) => (
              <div
                key={objective.id}
                className={classes.fullWidth}
                style={{ display: "flex" }}
              >
                <TextField
                  id="filled-basic"
                  label="Objective"
                  name="objective"
                  variant="filled"
                  style={{ width: "100%" }}
                  value={objective.obj}
                  onChange={(event) =>
                    handleChangeObjective(objective.id, event)
                  }
                />
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleAddObjective}
                >
                  <AddIcon />
                </Button>
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="contained"
                  color="secondary"
                  disabled={objectives.length === 1}
                  onClick={() => handleRemoveObjective(objective.id)}
                >
                  <RemoveIcon />
                </Button>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <div className={classes.paper}>
            <div className="upload">
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
            <TextField
              id="filled-multiline-static"
              label="Course About"
              multiline
              rows={4}
              variant="filled"
              className={classes.fullWidth}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              value={about}
            />
            {requirements.map((requirement, index) => (
              <div
                key={requirement.id}
                className={classes.fullWidth}
                style={{ display: "flex" }}
              >
                <TextField
                  id="filled-basic"
                  label="Requirement"
                  name="requrement"
                  variant="filled"
                  style={{ width: "100%" }}
                  value={requirement.req}
                  onChange={(event) =>
                    handleChangeRequirement(requirement.id, event)
                  }
                />
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleAddRequirement}
                >
                  <AddIcon />
                </Button>
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="contained"
                  color="secondary"
                  disabled={requirements.length === 1}
                  onClick={() => handleRemoveRequirements(requirement.id)}
                >
                  <RemoveIcon />
                </Button>
              </div>
            ))}
          </div>
        </Grid>
        <h1 className={classes.heading}>Add Videos</h1>
      </Grid>
      {videos.map((video, index) => (
        <Grid className={classes.page1} container spacing={3} key={video.id}>
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ marginRight: "10px" }}>{video.no}.</h1>
              <TextField
                className={classes.fullWidth}
                id="filled-basic"
                label="Video Name"
                name="vid"
                variant="filled"
                value={video.vid}
                onChange={(event) => handleChangeVideos(video.id, event)}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <div className={classes.fullWidth} style={{ display: "flex" }}>
              <TextField
                id="filled-basic"
                label="Video Link"
                name="link"
                variant="filled"
                style={{ width: "100%" }}
                value={video.link}
                onChange={(event) => handleChangeVideos(video.id, event)}
              />
              <Button
                style={{ marginLeft: "15px" }}
                variant="contained"
                color="primary"
                onClick={handleAddVideos}
              >
                <AddIcon />
              </Button>
              <Button
                style={{ marginLeft: "15px" }}
                variant="contained"
                color="secondary"
                disabled={videos.length === 1}
                onClick={handleRemoveVideos}
              >
                <RemoveIcon />
              </Button>
            </div>
          </Grid>
        </Grid>
      ))}
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          marginTop: "30px",
          paddingBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="default"
          style={{ padding: "10px 25px" }}
          onClick={handleSubmit}
        >
          <SaveIcon /> Save
        </Button>
      </div>
    </div>
  );
}

export default AddCourse;
