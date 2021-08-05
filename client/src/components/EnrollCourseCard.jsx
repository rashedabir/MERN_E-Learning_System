import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 140,
  },
  about: {
    maxHeight: 100,
    overflow: "hidden",
  },
  title: {
    textTransform: "capitalize",
  },
});

function EnrollCourseCard({ course, removeCourse }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/course_detail/${course._id}`}>
        <CardMedia
          className={classes.media}
          image={course.images.url}
          title={course.title}
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {course.title}
          </Typography>
          <Typography
            className={classes.about}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {course.about}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="medium"
          color="primary"
          component={Link}
          to={`/course_detail/${course._id}`}
        >
          learn more
        </Button>
        <Button
          size="medium"
          color="secondary"
          onClick={() => {
            removeCourse(course._id);
          }}
        >
          unenroll
        </Button>
      </CardActions>
    </Card>
  );
}

export default EnrollCourseCard;
