import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@material-ui/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from "../_app";
import Loader from "../../components/Loader";
import NavBar from "@/components/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Model } from "../../types/types";
import Link from "next/link";

const ModelPage = () => {
  const router = useRouter();
  const { model } = router.query;
  const { auth, database } = useContext<object | any>(Context);
  const [user] = useAuthState(auth);

  const [modelData, setModelData] = useState<Model>();
  const [loader, setLoader] = useState<boolean>(false);

  const collections = collection(database, "technique");

  const getData = async () => {
    let allData: object | any = await getDocs(
      query(collections, where("model", "==", `${model}`))
    );

    setModelData(allData.docs[0]?._document.data.value.mapValue.fields);
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    getData();
  }, []);

  if (!modelData) {
    getData();
  }

  if (loader) {
    return <Loader />;
  }

  const ModelPhoto = {
    src: modelData?.photo.stringValue,
  };

  return (
    <>
      <NavBar back={true} />
      <div className="model">
        <Box component="img" {...ModelPhoto} className="model__photo" />
        <Typography variant="h6" gutterBottom className="model__info">
          {modelData?.type?.stringValue == "laptop" ? (
            <>
              <div>
                Name: {modelData?.brandName?.stringValue}{" "}
                {modelData?.model?.stringValue}
              </div>
              <div>CPU: {modelData?.CPU?.stringValue}</div>
              <div>Os: {modelData?.os?.stringValue}</div>
              <div>
                Screen Diagonal: {modelData?.screenDiagonal?.stringValue}
              </div>
              <div>Video Card: {modelData?.videoCard?.stringValue}</div>
              <div>Prise: {modelData?.prise?.stringValue} ₽</div>
            </>
          ) : (
            <>
              <div>
                Name: {modelData?.brandName?.stringValue}{" "}
                {modelData?.model?.stringValue}
              </div>
              <div>CPU: {modelData?.CPU?.stringValue}</div>
              <div>Os: {modelData?.os?.stringValue}</div>
              <div>
                Screen Diagonal: {modelData?.screenDiagonal?.stringValue}
              </div>
              <div>Color: {modelData?.color?.stringValue}</div>
              <div>Release year: {modelData?.releaseYear?.stringValue}</div>
              <div>Prise: {modelData?.prise?.stringValue} ₽</div>
            </>
          )}
          {user ? (
            <Link href={"/payment/" + modelData?.model?.stringValue}>
              <Button variant="outlined">Купить</Button>
            </Link>
          ) : (
            <></>
          )}
        </Typography>
      </div>
    </>
  );
};

export default ModelPage;
