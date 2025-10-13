import React, { useEffect } from "react";
import Header from "./Header";
import Services from "./Services";
import Process from "./Process";
import Projectsection from "./Projectsection";
import Team from "./Team";
import Testimo from "./Testimo";
import Blog from "./Blog";
import Partner from "./Partner";
import Footer from "./Footer";
import Loader from "./Loader";
import Chatbot from "../user/Chatbot";
import Corosual from "./Corosual";

function Content() {
  useEffect(() => {
    if (sessionStorage.getItem("reload") === "true") {
      sessionStorage.removeItem("reload");
      window.location.reload();
    }
  }, []);

  return (
    <>
       <Header />
        <Chatbot />
       <Corosual/>

      <Services />
      <Process />

      <Projectsection />
      <Team />
      <Testimo />
      <Blog />
      
      <Footer />
    </>
  );
}

export default Content;
