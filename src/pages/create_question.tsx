import React from "react";
import { PageBackGround } from "../styles/Public";
import NavBar from "../components/public/navbar_default";
import ProblemPage from "../components/create/create_question";

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