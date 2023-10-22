import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import './Question.css'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Question({currentQuestions,
    setCurrentQuestions,
    questions,
    options,
    correct,
    score,
    setScore,
    setQuestions}) {
        const [selected, setSelected] = useState();
        const [error, setError] = useState(false);

        const navigate = useNavigate();

        const handleSelect = (i) => {
            if (selected === i && selected === correct) return "select";
            else if (selected === i && selected !== correct) return "wrong";
            else if (i === correct) return "select";
        };

        const handleCheck = (i) => {
            setSelected(i);
            if (i === correct) setScore(score + 1);
            setError(false);
        };

        const handleNext = () => {
            if (currentQuestions > 8) {
                navigate("/result");
            } else if (selected) {
                setCurrentQuestions(currentQuestions + 1);
                setSelected();
            } else setError("Please select an option first");
        };

        const handleQuit = () => {
            setCurrentQuestions(0);
            setQuestions();
        };

        return (
            <div>
                <h1>Question {currentQuestions + 1}</h1>

                <div className="singleQuestion">
                    <h2>{questions[currentQuestions].question}</h2>
                    <div className="options">
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {options &&
                        options.map((i) => (
                        <button
                            className={`singleOption  ${selected && handleSelect(i)}`}
                            key={i}
                            onClick={() => handleCheck(i)}
                            disabled={selected}
                        >
                            {i}
                        </button>
                        ))}
                    </div>
                    <div className="controls">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            style={{ width: 185 }}
                            href="/"
                            onClick={() => handleQuit()}
                        >
                            Quit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ width: 185 }}
                            onClick={handleNext}
                        >
                            {currentQuestions > 20 ? "Submit" : "Next Question"}
                        </Button>
                    </div>
                </div>
            </div>
        )

};