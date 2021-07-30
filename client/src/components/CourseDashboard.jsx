import { Typography } from "@material-ui/core";
import React from "react";
import CourseTab from "./CourseTab";

function CourseDashboard() {
  return (
    <div className="course_dashboard">
      <div className="heading">
        <Typography variant="h5">
          The world's most useless selection of courses
        </Typography>
        <p>
          Choose from 1000 online video courses with new additions published
          every decade
        </p>
      </div>
      <CourseTab />
    </div>
  );
}

export default CourseDashboard;
