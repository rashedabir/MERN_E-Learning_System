import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container, Typography } from "@material-ui/core";
import react from "../asstes/react.png";
import rashed from "../asstes/rashed abir.JPEG";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: "linear-gradient(120deg, #2980b9, #8e44ad)",
    minHeight: "95vh",
    padding: "50px 0px",
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.primary,
  },
  heading: {
    color: theme.palette.text.secondary,
    textTransform: "uppercase",
    fontWeight: "700",
    padding: "20px 0",
  },
  description: {
    padding: "20px 0",
  },
}));

function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className="about_icon">
                <img src={react} alt="react" width="60px" />
              </div>
              <Typography
                component="h6"
                variant="h6"
                className={classes.heading}
              >
                course hub
              </Typography>
              <h2>About</h2>
              <Typography component="p" className={classes.description}>
                This is an E-learning Web App was Developed with Create React
                App and other libraries. The UI build base on Material-UI along
                with the associated library ecosystem.
              </Typography>
              <Typography component="p">
                This Website is using sample data like image and description the
                courses from Udemy. It is for non-commercial learning purposes
                only.
              </Typography>
              <h2 className={classes.description}>Developed by</h2>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={4} md={4} sm={12}>
                  <img src={rashed} alt="rashed abir" width="100%" />
                </Grid>
                <Grid item xs={12} xl={8} md={8} sm={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <h2>
                      Name: <strong>Abu Rashed Khan</strong>
                    </h2>
                  </div>
                  <h2 style={{ padding: "10px 0" }}>
                    <strong>Daffodil International University</strong>
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <h2>
                      GitHub:{" "}
                      <a
                        href="https://github.com/rashedabir"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "blue" }}
                      >
                        https://github.com/rashedabir
                      </a>
                    </h2>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <h2>
                      Portfolio:{" "}
                      <a
                        href="https://rashed-abir.web.app/"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "blue" }}
                      >
                        https://rashed-abir.web.app/
                      </a>
                    </h2>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default About;
