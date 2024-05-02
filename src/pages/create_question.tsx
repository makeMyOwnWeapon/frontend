import React, { useEffect } from "react";
import styles from "../styles/Create.module.css";
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
            navigate('/main');  // Redirect to '/main' if not authenticated
        }
    }, [navigate]);
    
    return (
        <>
        <NavBar /> 
        <div className={styles.pageBackground}>
            <ProblemPage navigate={navigate}/>
        </div>
        </>
    );
};

export default Create;
