import {
  AppBar,
  Box,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
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
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CourseTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            aria-label="nav tabs example"
          >
            <LinkTab label="Graphic Design" href="/drafts" {...a11yProps(0)} />
            <LinkTab label="Frontend Development" href="/trash" {...a11yProps(1)} />
            <LinkTab label="Backend Development" href="/spam" {...a11yProps(2)} />
            <LinkTab label="Full-Stack Development" href="/spam" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Page One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Page Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Page Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Page Four
        </TabPanel>
      </div>
    </Container>
  );
}

export default CourseTab;
