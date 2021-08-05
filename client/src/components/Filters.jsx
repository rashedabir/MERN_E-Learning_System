import React, { useContext, useEffect } from "react";
import { GlobalState } from "../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
  },
  category: {
    textTransform: "capitalize",
  },
}));

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.category;
  const [category, setCategory] = state.courseAPI.category;
  const [search, setSearch] = state.courseAPI.search;
  const classes = useStyles();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  useEffect(() => {
    setCategory("");
  }, [setCategory]);

  console.log(category);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3} md={3} xl={3}>
          <div className={classes.paper}>
            <h2 style={{ paddingRight: "10px" }}>Filter </h2>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleCategory}
                name="category"
                value={category}
              >
                <MenuItem value="">All Courses</MenuItem>
                {categories.map((category) => (
                  <MenuItem
                    value={"category=" + category.name}
                    key={category._id}
                    className={classes.category}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} lg={9} md={9} xl={9}>
          <div className={classes.paper}>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              type="text"
              className={classes.formControl}
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Filters;
