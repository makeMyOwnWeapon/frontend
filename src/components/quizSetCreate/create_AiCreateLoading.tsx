import React from "react"
import styles from "../../styles/css/loading-cat.module.css"
import styled from "styled-components";
import BackgroundAnimation from "../public/BackgroundAnimation";

const AiQuizCreateLoading = () => {


return (

    <BackgroundAnimation>
        <LoadingContainer>

            <div>
                <TitleContainer>
                    <p>Learn <RedText>O</RedText>n Air</p>          
                </TitleContainer>  
                <TextContainer>
                    <p>AI가 문제 생성에 필요한 정보를 모으고 있습니다!</p>
                </TextContainer>
            </div>

        <div className={styles.loadingCat}>
            <div className={styles.body}></div>
            <div className={styles.head}>
            <div className={styles.face}></div>
        </div>

        <div className={styles.foot}>
            <div className={styles.tummyEnd}></div>
            <div className={styles.bottom}></div>
            <div className={`${styles.legs} ${styles.left}`}></div>
            <div className={`${styles.legs} ${styles.right}`}></div>
        </div>

        <div className={`${styles.hands} ${styles.left}`}></div>
        
        <div className={`${styles.hands} ${styles.right}`}></div>
        </div>

        </LoadingContainer>
    </BackgroundAnimation> 
);
};


export default AiQuizCreateLoading;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 50px;
  font-size: 6rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 50px;
  font-size: 3rem;
`;

const RedText = styled.span`
  color: red;
`;