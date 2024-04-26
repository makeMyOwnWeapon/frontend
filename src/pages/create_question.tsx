import React from "react";
import { NavContainer, PageBackGround } from "../styles/Public";
import NavBar from "../components/public/navbar";
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