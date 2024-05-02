import React, { useEffect } from "react";
import { PageBackGround } from "../styles/Public";
import ProblemPage from "../components/create/create_question";
import NavBar from "../components/public/navbar_default";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const Create: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
        const token = cookies.jwt;
        if (!token) {
            alert('로그인 해 주세요!')
            navigate('/main');  // Redirect to '/main' if not authenticated
        }
    }, [navigate]);
    
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