import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import './Quiz.css';
import Question from "../../components/Question/Question";

export default function Quiz({name, score, questions, setQuestions, setScore}) {
    const [options, setOptions] = useState();
    const [currentQuestions, setCurrentQuestions] = useState(0);

    useEffect(() => {
        console.log(questions);
        setOptions(
            questions && handleShuffle([
                questions[currentQuestions]?.correct_answer,
                ...questions[currentQuestions]?.incorrect_answers,
            ])
        );
    }, [currentQuestions, questions]);

    console.log(options);

    const handleShuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }

    return (
        <div className="quiz">
            <span className="subtitle">Welcome, {name}</span>
            {questions ? (
                <>
                    <div className="quizInfo">
                        <span>{questions[currentQuestions].category}</span>
                        <span>
                            {/* {questions[currQues].difficulty} */}
                            Score : {score}
                        </span>
                    </div>
                    <Question
                        currentQuestions={currentQuestions}
                        setCurrentQuestions={setCurrentQuestions}
                        questions={questions}
                        options={options}
                        correct={questions[currentQuestions]?.correct_answer}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions}
                    />
                </>
            ) : (
                <CircularProgress
                style={{ margin: 100 }}
                color="inherit"
                size={150}
                thickness={1}
                />
            )}
        </div>
    )
}