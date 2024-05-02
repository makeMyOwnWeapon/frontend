import React, { useEffect } from "react";
import ProblemPage from "../components/create/create_question";
import NavBar from "../components/public/navbar_default";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Create: React.FC = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    useEffect(() => {
        
        const token = cookies.jwt;
        if (!token) {
            alert('로그인 해 주세요!')
            navigate('/main');
        }
    }, [navigate]);
    
    return (
        <>
        <NavBar /> 
        <ProblemPage navigate={navigate}/>
        </>
    );
};

export default Create;
