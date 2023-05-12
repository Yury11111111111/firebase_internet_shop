import React from "react";
import { Container, Grid } from "@material-ui/core";

const Loader = () => {
  return (
    <Container>
      <Grid container>
        <span className="loader"></span>
      </Grid>
    </Container>
  );
};

export default Loader;
