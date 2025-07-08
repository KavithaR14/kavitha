import React, { useState } from 'react';
import axios from 'axios';

function TestForm({ teacherId }) {
    const [testName, setTestName] = useState('');
    const [period, setPeriod] = useState('');
    const [questions, setQuestions] = useState([]);

    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    // Add a question to the questions array
    const addQuestion = () => {
        if (!questionText || options.some(opt => !opt) || !correctAnswer) {
            alert('Please fill all question fields');
            return;
        }

        const newQuestion = {
            questionText,
            options,
            correctAnswer
        };
        setQuestions([...questions, newQuestion]);
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    // Submit the test to backend
    const createTest = async () => {
        if (!testName || !period || questions.length === 0) {
            alert('Please fill all fields and add at least one question');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/teacher/createtest', {
                teacherId,
                testName,
                period,
                questions
            });
            alert('Test Created Successfully!');
            setTestName('');
            setPeriod('');
            setQuestions([]);
        } catch (error) {
            console.error('Error creating test:', error);
            alert('Error creating test');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create Test</h2>
            <div>
                <input
                    type="text"
                    placeholder="Test Name"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                /><br /><br />

                <input
                    type="text"
                    placeholder="Period (e.g., 1st Period)"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                /><br /><br />

                <h3>Add Question</h3>
                <input
                    type="text"
                    placeholder="Enter Question"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                /><br /><br />

                {options.map((opt, idx) => (
                    <div key={idx}>
                        <input
                            type="text"
                            placeholder={`Option ${idx + 1}`}
                            value={opt}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[idx] = e.target.value;
                                setOptions(newOptions);
                            }}
                        />
                        <br /><br />
                    </div>
                ))}

                <input
                    type="text"
                    placeholder="Correct Answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                /><br /><br />

                <button onClick={addQuestion}>Add Question</button>
            </div>

            <hr />

            <h3>Questions Added</h3>
            <ul>
                {questions.map((q, index) => (
                    <li key={index}>
                        <strong>{q.questionText}</strong><br />
                        Options: {q.options.join(', ')}<br />
                        Correct Answer: {q.correctAnswer}
                    </li>
                ))}
            </ul>

            <button onClick={createTest}>Create Test</button>
        </div>
    );
}

export default TestForm;
