import { Box, Container, Grid, Button, Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { Context } from "./_app";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";

const Login = () => {
  const { auth } = useContext<object | any>(Context);

  const router = useRouter();

  const googleLogin = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result: UserCredential) => {
        const user = result.user;
      })
      .then(() => router.push("/"));
  };

  return (
    <>
      <NavBar back={true} />
      <Container>
        <Grid container className="login" alignItems="center">
          <Grid className="login__box" direction="column">
            <Box p={10}>
              <div className="login__text">Войти с помощью</div>
              <Button
                variant="outlined"
                onClick={googleLogin}
                className="login__button"
              >
                Google
                <Avatar src="https://img.icons8.com/?size=512&id=V5cGWnc9R4xj&format=png" />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
