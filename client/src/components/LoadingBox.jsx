import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Grow } from "@material-ui/core";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
  },
  container: {
    padding: "0 5%",
    width: "100%",
    margin: "0",
    marginTop: "-80px",
    paddingBottom: "35px",
  },
}));

function LoadingBox({ loading }) {
  const classes = useStyles();
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        spacing={3}
        alignContent="stretch"
      >
        <Grid
          className={classes.paper}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ display: "flex" }}
        >
          <Loading loading={loading} />
        </Grid>
        <Grid
          className={classes.paper}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ display: "flex" }}
        >
          <Loading loading={loading} />
        </Grid>
        <Grid
          className={classes.paper}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ display: "flex" }}
        >
          <Loading loading={loading} />
        </Grid>
        <Grid
          className={classes.paper}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ display: "flex" }}
        >
          <Loading loading={loading} />
        </Grid>
      </Grid>
    </Grow>
  );
}

export default LoadingBox;
