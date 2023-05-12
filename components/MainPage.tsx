import { Container, Grid } from "@material-ui/core";
import React, {
  ChangeEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../pages/_app";
import {
  DocumentData,
  FirestoreDataConverter,
  UpdateData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import TehniqueCard from "./TehniqueCard";
import { Auth, AuthCredential, AuthProvider } from "firebase/auth";

const MainPage = () => {
  const { database } = useContext<object | any>(Context);

  const [allTechnique, setAllTechnique] = useState<DocumentData>([]);

  const collections = collection(database, "technique");

  const getData = async () => {
    let allData: DocumentData = await getDocs(query(collections));

    setAllTechnique(allData.docs);
  };

  useEffect(() => {
    getData();
  }, []);

  const filterChange = async (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: ReactNode
  ) => {
    const value = event.target.value;

    if ((value as string) === "technique") {
      getData();
    } else {
      let allData: DocumentData = await getDocs(
        query(collections, where("type", "==", value as string))
      );

      setAllTechnique(allData.docs);
    }
  };

  return (
    <Container>
      <Grid>
        <FormControl className="type-filter">
          <Select
            onChange={filterChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"technique"}>
              <em>all</em>
            </MenuItem>
            <MenuItem value={"laptop"}>Laptops</MenuItem>
            <MenuItem value={"phone"}>Phones</MenuItem>
          </Select>
          <FormHelperText>Type of technique</FormHelperText>
        </FormControl>
      </Grid>
      <Grid container>
        {allTechnique.map((technique: object | any) => {
          technique = technique._document;
          return (
            <div key={technique.createTime.timestamp.seconds}>
              <TehniqueCard technique={technique.data.value.mapValue.fields} />
            </div>
          );
        })}
      </Grid>
    </Container>
  );
};

export default MainPage;
