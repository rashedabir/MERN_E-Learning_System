import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalState";
import { Button } from "@material-ui/core";

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.courseAPI.page;
  const [result] = state.courseAPI.result;
  return (
    <div className="load_more">
      {result < page * 8 ? (
        ""
      ) : (
        <Button color="primary" onClick={() => setPage(page + 1)}>
          Load more
        </Button>
      )}
    </div>
  );
}

export default LoadMore;
