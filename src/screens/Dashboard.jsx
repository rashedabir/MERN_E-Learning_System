import { Button, Typography } from "@material-ui/core";
import React from "react";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="home">
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
    </div>
  );
}

export default Dashboard;
