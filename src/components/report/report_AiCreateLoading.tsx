import React from "react"
import styles from "../../styles/css/loading-cat.module.css"
import styled from "styled-components";
import BackgroundAnimation from "../public/BackgroundAnimation";

const AiCreateLoading = () => {


return (

    <BackgroundAnimation>
        <LoadingContainer>

            <div>
                <TitleContainer>
                    <p>Learn <RedText>O</RedText>n Air</p>          
                </TitleContainer>  
                <TextContainer>
                    <p>AI가 학습분석 레포트를 생성하고있습니다!</p>
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


export default AiCreateLoading;

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
  font-size: 100px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 50px;
  font-size: 50px;
`;

const RedText = styled.span`
  color: red;
`;