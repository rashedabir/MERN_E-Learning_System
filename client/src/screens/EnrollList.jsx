import { Grid, Grow, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import EnrollCourseCard from "../components/EnrollCourseCard";
import Footer from "../components/Footer";
import { GlobalState } from "../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px",
  },
  paper: {
    padding: theme.spacing(2),
  },
  container: {
    padding: "3% 5%",
    width: "100%",
    margin: 0,
    paddingBottom: "35px",
  },
}));

function EnrollList() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [list, setList] = state.userAPI.list;

  const fetchList = async (list) => {
    await axios.patch(
      "https://course-hub-backend.herokuapp.com/user/addlist",
      { list: list },
      {
        headers: { Authorization: token },
      }
    );
  };

  if (list.length === 0) {
    return (
      <h2 style={{ textAlign: "center", margin: "20px auto" }}>
        List is Empty
      </h2>
    );
  }

  const removeCourse = (id) => {
    if (window.confirm("Do you want to unroll this course?")) {
      list.forEach((item, index) => {
        if (item._id === id) {
          list.splice(index, 1);
        }
      });
      setList([...list]);
      fetchList(list);
      toast.success("Unrolled");
    }
  };

  return (
    <>
      <Grow in>
        <Grid
          className={classes.container}
          container
          spacing={3}
          alignContent="stretch"
        >
          {list.map((course) => (
            <Grid
              className={classes.paper}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ display: "flex" }}
            >
              <EnrollCourseCard
                key={course._id}
                course={course}
                removeCourse={removeCourse}
              />
            </Grid>
          ))}
        </Grid>
      </Grow>
      <Footer />
    </>
  );
}

export default EnrollList;
