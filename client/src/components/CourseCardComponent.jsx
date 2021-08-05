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
import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalState";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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

function CourseCardComponent({ course, deleteCourse }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
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
      {isAdmin ? (
        <CardActions>
          <Button
            size="medium"
            color="primary"
            component={Link}
            to={`/edit_course/${course._id}`}
          >
            Edit
          </Button>
          <Button
            size="medium"
            color="secondary"
            onClick={() => {
              deleteCourse(course._id, course.images.public_id);
            }}
          >
            Delete
          </Button>
        </CardActions>
      ) : (
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/course_detail/${course._id}`}
          >
            Learn More
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default CourseCardComponent;
