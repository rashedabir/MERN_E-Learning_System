import {
  AppBar,
  Box,
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Grow,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { GlobalState } from "../context/GlobalState";
import CourseCardComponent from "./CourseCardComponent";
import LoadingBox from "./LoadingBox";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
  },
  container: {
    padding: "0%",
    width: "100%",
    margin: 0,
    paddingBottom: "35px",
  },
}));

function CourseTab() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const state = useContext(GlobalState);
  const [category, setCategory] = state.courseAPI.category;
  const [courses] = state.courseAPI.courses;
  const [loading] = state.courseAPI.loading;

  console.log(category);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const handleCategory = () => {
      if (value === 0) {
        setCategory("category=frontend developer");
      } else if (value === 1) {
        setCategory("category=backend development");
      } else if (value === 2) {
        setCategory("category=full stack development");
      }
    };
    handleCategory();
  }, [setCategory, value]);

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <AppBar
          position="static"
          color="default"
          style={{ marginBottom: courses.length === 0 && "50px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Frontend Develop" {...a11yProps(0)} />
            <Tab label="backend develop" {...a11yProps(1)} />
            <Tab label="fullstack develop" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Grow in>
              <Grid
                className={classes.container}
                container
                spacing={3}
                alignContent="stretch"
              >
                {courses.length === 0 ? (
                  <LoadingBox loading={loading} />
                ) : (
                  courses.map((course) => (
                    <Grid
                      className={classes.paper}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      style={{ display: "flex" }}
                    >
                      <CourseCardComponent key={course._id} course={course} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grow>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Grow in>
              <Grid
                className={classes.container}
                container
                spacing={3}
                alignContent="stretch"
              >
                {courses.length === 0 ? (
                  <LoadingBox loading={loading} />
                ) : (
                  courses.map((course) => (
                    <Grid
                      className={classes.paper}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      style={{ display: "flex" }}
                    >
                      <CourseCardComponent key={course._id} course={course} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grow>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Grow in>
              <Grid
                className={classes.container}
                container
                spacing={3}
                alignContent="stretch"
              >
                {courses.length === 0 ? (
                  <LoadingBox loading={loading} />
                ) : (
                  courses.map((course) => (
                    <Grid
                      className={classes.paper}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      style={{ display: "flex" }}
                    >
                      <CourseCardComponent key={course._id} course={course} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grow>
          </TabPanel>
        </SwipeableViews>
      </div>
    </Container>
  );
}

export default CourseTab;
