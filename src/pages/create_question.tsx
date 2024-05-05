import React from "react";
import { PageBackGround } from "../styles/Public";
import ProblemPage from "../components/create/create_question";
import NavBar from "../components/public/navbar_default";
import { useNavigate } from "react-router-dom";

const Create: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <NavBar /> 
            <PageBackGround>
                <ProblemPage navigate={navigate}/>
            </PageBackGround>
        </>
    );
};

export default Create;
