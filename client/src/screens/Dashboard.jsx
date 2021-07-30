import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Paper,
  Container,
} from "@material-ui/core";
import React from "react";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import CountUp from "react-countup";
import home from "../asstes/home.jpg";
import CourseDashboard from "../components/CourseDashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    background: "none",
    padding: "10px 20px",
    color: "#fff",
    boxShadow: "none",
  },
  icon: {
    marginRight: "10px",
    backgroundColor: "#e67e22",
    padding: "10px",
    fontSize: "50px",
    borderRadius: "50%",
    alignItems: "center",
  },
}));

function Dashboard() {
  const classes = useStyles();
  return (
    <>
    <div className="dashboard">
      <div className="home">
        <img src={home} alt="home" />
        <div className="home_content">
          <Typography variant="h4">
            Learn HTML , CSS , Web Apps & More
          </Typography>
          <Typography variant="h6">
            Learn How To Build Websites & Apps Write A Code Or Start A Business
          </Typography>
          <Button variant="contained" color="primary">
            make a tour
          </Button>
        </div>
      </div>
      <Container maxWidth="xl">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              spacing={4}
              style={{ justifyContent: "space-between", padding: "30px 0" }}
            >
              <Grid item>
                <Paper className={classes.paper}>
                  <LiveTvIcon className={classes.icon} />
                  <div>
                    <Typography variant="h6">
                      <CountUp end={1000} /> online courses
                    </Typography>
                    <Typography variant="p">
                      Enjoy a variety of fresh topics
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <BookmarkIcon className={classes.icon} />
                  <div>
                    <Typography variant="h6">Expert instruction</Typography>
                    <Typography variant="p">
                      Find the right instructor for you
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <AllInclusiveIcon className={classes.icon} />
                  <div>
                    <Typography variant="h6">Lifetime access</Typography>
                    <Typography variant="p">Learn on your schedule</Typography>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <div className="custom-shape-divider-bottom-1626601161">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
    <CourseDashboard />
    </>
  );
}

export default Dashboard;
