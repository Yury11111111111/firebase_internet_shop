import {
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import Link from "next/link";
import { Model } from "@/types/types";
import { Context } from "@/pages/_app";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "firebase/auth";

const TehniqueCard = ({ technique }: { technique: Model }) => {
  const { auth } = useContext<object | any>(Context);
  const [user] = useAuthState(auth);

  return (
    <Card sx={{ minWidth: 275 }} className="technique">
      <CardContent>
        <Typography variant="h6" component="div">
          {technique.brandName.stringValue} {technique.model.stringValue}
        </Typography>
      </CardContent>
      <Box
        component="img"
        src={technique.photo.stringValue}
        className="technique__photo"
        alt="technique__photo"
      />
      <CardContent>
        <Typography component="div">{technique.prise.stringValue} ₽</Typography>
      </CardContent>
      <CardActions>
        {" "}
        <Link href={"/model/" + technique.model.stringValue}>
          <Button size="small"> Learn More</Button>
        </Link>
        {user ? (
          <Link href={"/payment/" + technique.model.stringValue}>
            <Button size="small">Купить</Button>
          </Link>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};

export default TehniqueCard;
