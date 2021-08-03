import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Grow } from "@material-ui/core";
import { GlobalState } from "../context/GlobalState";
import CourseCardComponent from "../components/CourseCardComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px",
  },
  paper: {
    padding: theme.spacing(2),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "10%",
    borderRadius: 10,
    color: "white",
  },
  infoCard: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  container: {
    padding: "0 5%",
    width: "100%",
    margin: 0,
  },
}));

function CourseList() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [courses] = state.courseAPI.courses;
  console.log(courses);
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        spacing={3}
        alignContent="stretch"
      >
        {courses.map((course) => (
          <Grid
            className={classes.paper}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ display: "flex" }}
          >
            <CourseCardComponent course={course} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}

export default CourseList;
