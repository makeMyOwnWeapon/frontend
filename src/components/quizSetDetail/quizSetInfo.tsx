import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import { PublicQuestionContainer } from "../../styles/Public";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/css/slick.css';
import { request } from "../../helpers/axios_helper";
import styled, { keyframes } from "styled-components";

interface QuestionComponentProps {
    quizSetId: string | undefined;
}

interface Choice {
    choiceId: number;
    content: string;
}

interface Question_ {
    choices?: Choice[];
    commentary: string;
    instruction: string;
    popupTime: string;
}

const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
        return `${h}시간 ${m}분 ${s}초`;
    } else if (m > 0) {
        return `${m}분 ${s}초`;
    } else {
        return `${s}초`;
    }
};

const QuizSetInfo = ({ quizSetId }: QuestionComponentProps) => {
    const [data, setData] = useState<Question_[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request('GET', `/api/quizsets/${quizSetId}/quizzes`);
                if (response.data) {
                    setData(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        fetchData();
    }, [quizSetId]);

    const settings = {
        dots: true,
        infinite: data.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    const openModal = (commentary: string) => {
        setModalContent(commentary);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <SliderContainer>
            <StyledSlider {...settings}>
                {data.map((question, index) => (
                    <PublicQuestionContainer key={index}>
                        <Question>
                            <QuizSetInfoTextContainer>
                                <Instruction>{`${index + 1}. ${question.instruction}`}</Instruction>
                         
                                {question.choices && question.choices.length === 4 ? (
                                    <Choices>
                                        <QuestionType>객관식 문제</QuestionType>
                                        {question.choices.map((choice, idx) => (
                                            <Choice key={choice.choiceId}>{`${idx + 1}) ${choice.content}`}</Choice>
                                        ))}
                                        
                                    </Choices>
                                ) : <QuestionType>주관식 문제</QuestionType>}
                                <PopupTime>{`Popup Time: ${formatTime(Number(question.popupTime))}`}</PopupTime>
                                <CommentaryButton onClick={() => openModal(question.commentary)}>해설보기</CommentaryButton>
                            </QuizSetInfoTextContainer>
                        </Question>
                    </PublicQuestionContainer>
                ))}
            </StyledSlider>
            <StyledModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Commentary Modal"
                ariaHideApp={false}
            >
                <ModalContent>
                    <h2>해설</h2>
                    <p>{modalContent}</p>
                    <CloseButton onClick={closeModal}>닫기</CloseButton>
                </ModalContent>
            </StyledModal>
        </SliderContainer>
    );
};

export default QuizSetInfo;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledModal = styled(Modal)`
  animation: ${fadeIn} 0.5s ease-out;

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
margin-top: 100px;
position: relative;
width: 100%;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #82b8f2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(104, 178, 253, 0.7);
  }
`;

const Question = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 10px;
  flex-direction: column;
  min-height: 350px;
`;

const QuizSetInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgba(249, 249, 249, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Instruction = styled.div`
  font-size: 1.3em;
  margin-bottom: 20px;
`;

const PopupTime = styled.div`
  font-size: 1em;
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
`;

const Choice = styled.div`
  margin-left: 5px;
  margin-bottom: 15px;
`;

const QuestionType = styled.div`
  font-size: 1em;
  font-weight: bold;
  color: #007bff;
  margin-left: 5px;
  margin-bottom: 20px;
`;

const CommentaryButton = styled.button`
  margin-top: 20px;
  margin-left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 15px;
  background-color: rgba(104, 178, 253, 0.7);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #82b8f2;
  }
`;

const ArrowButton = styled.div`
  display: block;
  padding: 10px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
`;

const CustomPrevArrow = (props: any) => (
  <ArrowButton
    style={{ ...props.style, position: 'absolute', bottom: '1px', left: '1px' }}
    onClick={props.onClick}
  >
    &lt;
  </ArrowButton>
);

const CustomNextArrow = (props: any) => (
  <ArrowButton
    style={{ ...props.style, position: 'absolute', bottom: '1px', right: '1px' }}
    onClick={props.onClick}
  >
    &gt;
  </ArrowButton>
);

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: -90%;
  }
`;
