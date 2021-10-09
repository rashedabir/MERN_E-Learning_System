import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Skeleton from "react-loading-skeleton";

const useStyles = makeStyles({
  root: {
    width: "345px",
  },
  media: {
    width: "100%",
  },
});

function Loading({ loading }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton
          delay={loading}
          height={200}
          width="100%"
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Skeleton delay={loading} height={20} width="100%" />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Skeleton delay={loading} height={10} width="100%" count={5} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Loading;
