import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Grow } from "@material-ui/core";
import { GlobalState } from "../context/GlobalState";
import CourseCardComponent from "../components/CourseCardComponent";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingScreen from "react-loading-screen";
import Filters from "../components/Filters";
import LoadMore from "../components/LoadMore";

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
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = state.courseAPI.callback;

  const deleteCourse = async (id, public_id) => {
    try {
      if (window.confirm("want to delete this course?")) {
        setLoading(true);
        const deleteImg = axios.post(
          "/api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteCourse = axios.delete(`/api/courses/${id}`, {
          headers: { Authorization: token },
        });
        await deleteImg;
        await deleteCourse;
        setCallback(!callback);
        setLoading(false);
        toast.success("Successfully Deleted");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  if (loading) {
    return (
      <LoadingScreen
        loading={loading}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc="/logo.png"
      />
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        <Filters />
      </Container>
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
              <CourseCardComponent
                deleteCourse={deleteCourse}
                key={course._id}
                course={course}
              />
            </Grid>
          ))}
        </Grid>
      </Grow>
      <LoadMore />
      {courses.length === 0 && (
        <LoadingScreen
          loading={loading}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc="/logo.png"
        />
      )}
    </>
  );
}

export default CourseList;
