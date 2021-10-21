import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CreateIcon from "@material-ui/icons/Create";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import BuildIcon from "@material-ui/icons/Build";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Link } from "react-router-dom";
import PlayList from "../components/PlayList";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "50px",
    marginBottom: "100px",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  container: {
    padding: "10px 5%",
    width: "100%",
    margin: 0,
    paddingBottom: "35px",
  },
  icon: {
    marginRight: "20px",
    color: theme.palette.text.secondary,
  },
  icon2: {
    marginRight: "10px",
    color: theme.palette.text.secondary,
  },
  dec: {
    padding: "15px 0",
    lineHeight: "30px",
  },
  card: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: "50px",
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
  },
}));

function CourseDetails() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [courses] = state.courseAPI.courses;
  const [isLogged] = state.userAPI.isLogged;
  const addList = state.userAPI.addList;
  const [list] = state.userAPI.list;
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState([]);
  const [objective, setObjective] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const classes = useStyles();
  var date = new Date(details.updatedAt);
  date = date.toDateString();

  useEffect(() => {
    if (params.id) {
      courses.forEach((course) => {
        if (course._id === params.id) {
          setDetails(course);
          setImage(course.images);
          setObjective(course.objective);
          setRequirements(course.requirements);
          setVideos(course.videos);
        }
      });
    }
  }, [params.id, courses]);

  useEffect(() => {
    const checkEnroll = async () => {
      const check = list.every((item) => {
        return item._id !== details._id;
      });
      if (check) {
        setEnrolled(true);
      } else {
        setEnrolled(false);
      }
    };
    checkEnroll();
  }, [list, details._id]);

  return (
    <>
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <Paper className={classes.paper}>
                <h1 style={{ textTransform: "capitalize" }}>
                  Title : {details.title}
                </h1>
                <p>Updated at : {date}</p>
                <p>{details.enrolled} People Enrolled This Course</p>
                <br></br>
                <br></br>
                <br></br>
                <h1>Description</h1>
                <Typography className={classes.dec} component="p">
                  {details.description}
                </Typography>
                {!enrolled ? <PlayList videoData={videos} /> : null}
                <h1>What You’ll Learn</h1>
                <Grid className={classes.container} container spacing={3}>
                  {objective &&
                    objective.map((obj) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography
                          component="p"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <CheckIcon className={classes.icon} /> {obj.objective}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
                <h1>Requirements</h1>
                <Grid className={classes.container} container spacing={3}>
                  {requirements &&
                    requirements.map((req) => (
                      <Grid item xs={12}>
                        <Typography
                          component="p"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <CreateIcon className={classes.icon} />{" "}
                          {req.requrement}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
                <h1>Here Is Exactly What We Cover In This Course:</h1>
                <Typography component="p" className={classes.dec}>
                  {details.about}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={3} className="info">
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={image.url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    style={{ textTransform: "capitalize" }}
                    align="center"
                    variant="h5"
                    component="h2"
                  >
                    {details.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  {isLogged ? (
                    <Button
                      color="primary"
                      className={classes.button}
                      variant="contained"
                      onClick={() => {
                        addList(details);
                      }}
                    >
                      {enrolled ? "enroll" : "enrolled"}
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      className={classes.button}
                      variant="contained"
                      component={Link}
                      to="/login"
                    >
                      Login to Enroll
                    </Button>
                  )}
                </CardActions>
                <div style={{ padding: "10px" }}>
                  <Typography style={{ paddingBottom: "10px" }} component="p">
                    This course includes
                  </Typography>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 0",
                      color: "#777",
                    }}
                  >
                    <FindInPageIcon className={classes.icon2} /> 1 article
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 0",
                      color: "#777",
                    }}
                  >
                    <AllInclusiveIcon className={classes.icon2} /> Full lifetime
                    accesso
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 0",
                      color: "#777",
                    }}
                  >
                    <PhoneAndroidIcon className={classes.icon2} /> Access on
                    mobile and TV
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 0",
                      color: "#777",
                    }}
                  >
                    <BuildIcon className={classes.icon2} /> SkillsFuture Credit
                    eligible
                  </p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 0",
                      color: "#777",
                    }}
                  >
                    <VerifiedUserIcon className={classes.icon2} /> Certificate
                    of Completion
                  </p>
                </div>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default CourseDetails;
