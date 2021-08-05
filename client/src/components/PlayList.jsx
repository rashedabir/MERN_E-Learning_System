import {
  Grid,
  Typography,
  makeStyles,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "40px 0",
  },
  songList: {
    maxHeight: "47.5vh",
    overflowX: "auto",
  },
  title: {
    margin: "15px 0",
    color: "black",
  },
  heading: {
    textAlign: "center",
    color: "black",
    paddingTop: "20px",
  },
  bgIcon: {
    color: "crimson",
  },
}));

function PlayList({ videoData }) {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const handleListItemClick = (event, index, src, name) => {
    setSelectedIndex(index);
    setLink(src);
    setTitle(name);
  };
  return (
    <Container maxWidth="xl">
      <h1 className={classes.heading}>Course Video List</h1>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <ReactPlayer url={link} width="100%" controls playing />
            {selectedIndex === 0 ? (
              <Typography variant="h5" className={classes.title}>
                Select a Item to begin the Playlist
              </Typography>
            ) : (
              <Typography variant="h5" className={classes.title}>
                <i className="far fa-play-circle"></i> Now Playing:{" "}
                <strong>
                  {selectedIndex}. {title}
                </strong>
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} lg={6} component={Paper}>
            <List
              aria-label="main mailbox folders"
              className={classes.songList}
            >
              {videoData.map((item) => (
                <ListItem
                  button
                  selected={selectedIndex === item.no}
                  onClick={(event) =>
                    handleListItemClick(event, item.no, item.link, item.vid)
                  }
                >
                  <ListItemIcon>
                    {selectedIndex === item.no ? (
                      <PauseCircleOutlineIcon className={classes.bgIcon} />
                    ) : (
                      <PlayCircleOutlineIcon className={classes.bgIcon} />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    {item.no}. {item.vid}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default PlayList;
