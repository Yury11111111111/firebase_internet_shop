import Head from "next/head";
import NavBar from "../components/NavBar";
import MainPage from "@/components/MainPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <NavBar back={false} />
        <MainPage />
      </main>
    </>
  );
}
