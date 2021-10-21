import React from "react";
import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PolicyIcon from "@material-ui/icons/Policy";
import BugReportIcon from "@material-ui/icons/BugReport";
import EmailIcon from "@material-ui/icons/Email";
import LocalPhone from "@material-ui/icons/LocalPhone";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YoutubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    margin: "0 auto",
  },
  btn: {
    color: "#fff",
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xl={4} lg={4} xs={12} style={{ textAlign: "left" }}>
            <Typography>Important Links</Typography>
            <div>
              <Button size="medium" className={classes.btn}>
                <PolicyIcon style={{ marginRight: "5px" }} />
                Privacy & Policy
              </Button>
              <br />
              <Button size="medium" className={classes.btn}>
                <BugReportIcon style={{ marginRight: "5px" }} />
                Report a Problem
              </Button>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} xs={12} style={{ textAlign: "left" }}>
            <Typography>Contacts</Typography>
            <div>
              <Button size="medium" className={classes.btn}>
                <LocalPhone style={{ marginRight: "5px" }} />
                +8801629341869
              </Button>
              <br />
              <Button size="medium" className={classes.btn}>
                <EmailIcon style={{ marginRight: "5px" }} />
                rashed15-2155@diu.edu.bd
              </Button>
            </div>
          </Grid>
          <Grid item xl={4} lg={4} xs={12} style={{ textAlign: "left" }}>
            <Typography>Social</Typography>
            <IconButton>
              <FacebookIcon style={{ color: "#fff" }} />
            </IconButton>
            <IconButton>
              <InstagramIcon style={{ color: "#fff" }} />
            </IconButton>
            <IconButton>
              <YoutubeIcon style={{ color: "#fff" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
