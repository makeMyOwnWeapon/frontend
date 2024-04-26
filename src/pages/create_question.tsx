import React from "react";
import { PageBackGround } from "../styles/Public";
import ProblemPage from "../components/create/create_question";
import NavBar from "../components/public/navbar_default";

const Create: React.FC = () => {
    return (
        <>
        <NavBar /> 
        <PageBackGround>
        <ProblemPage/>
        </PageBackGround>
        </>
    );
  };
  
  export default Create;