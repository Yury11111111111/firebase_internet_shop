import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../pages/_app";
import Link from "next/link";

const NavBar = ({ back }: { back: boolean }) => {
  const { auth } = useContext<object | any>(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        {back ? (
          <Grid container justifyContent="flex-start">
            {" "}
            <Link href={"/"}>
              <Button variant="outlined">Назад</Button>
            </Link>
          </Grid>
        ) : (
          <></>
        )}

        <Grid container justifyContent="flex-end">
          {user ? (
            <Button
              onClick={() => {
                auth.signOut();
              }}
              variant="outlined"
            >
              Выйти
            </Button>
          ) : (
            <Link href={"/login "}>
              <Button variant="outlined">Логин</Button>
            </Link>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
