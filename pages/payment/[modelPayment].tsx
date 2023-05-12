import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@material-ui/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from "../_app";
import Loader from "../../components/Loader";
import NavBar from "@/components/NavBar";
import { Model } from "../../types/types";
import PaymentForm from "@/components/PaymentForm";

const ModelPayment = () => {
  const router = useRouter();
  const { modelPayment } = router.query;

  const { database } = useContext<object | any>(Context);

  const [modelData, setModelData] = useState<Model>();
  const [loader, setLoader] = useState<boolean>(false);

  const collections = collection(database, "technique");

  const getData = async () => {
    let allData: object | any = await getDocs(
      query(collections, where("model", "==", `${modelPayment}`))
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

  return (
    <>
      <NavBar back={true} />
      <div className="model">
        <Box
          component="img"
          src={modelData?.photo?.stringValue}
          className="model__photo"
        />
        <Typography variant="h6" gutterBottom className="model__info">
          {modelData?.type?.stringValue == "laptop" ? (
            <>
              <div>
                {modelData?.brandName?.stringValue}{" "}
                {modelData?.model?.stringValue}
              </div>
              <div>Prise: {modelData?.prise?.stringValue} ₽</div>
            </>
          ) : (
            <>
              <div>
                {modelData?.brandName?.stringValue}{" "}
                {modelData?.model?.stringValue}
              </div>
              <div>Prise: {modelData?.prise?.stringValue} ₽</div>
            </>
          )}
          <PaymentForm />
        </Typography>
      </div>
    </>
  );
};

export default ModelPayment;
