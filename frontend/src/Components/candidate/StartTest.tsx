import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
  Card, 
  CardContent, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormControl,
  Box,
  TextField
} from '@mui/material';
import { saveAnswer } from '../../redux/reducers/testSlice';

const StartTest: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, answers } = useAppSelector((state) => state.test);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers ? answers[currentQuestion.id] : undefined;

  const handleAnswerChange = (value: string | string[]) => {
    dispatch(saveAnswer({ questionId: currentQuestion.id, answer: value }));
  };

  const renderQuestionUI = () => {
    switch (currentQuestion.type) {
      case "mcq":
        return (
          <FormControl component="fieldset" className="w-full">
            <RadioGroup
              value={selectedAnswer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              name={`question-${currentQuestion.id}`}
            >
              {currentQuestion.options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio color="primary" />}
                  label={
                    <Typography variant="body1" className="ml-2">
                      {option}
                    </Typography>
                  }
                  className="mb-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  sx={{
                    margin: 0,
                    width: "100%",
                    border: selectedAnswer === option ? "2px solid #1976d2" : "1px solid #e0e0e0",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "text":
        return (
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={selectedAnswer || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Write your answer here..."
          />
        );

      case "coding":
        return (
          <Box className="border rounded-md p-2">
            <TextField
              fullWidth
              multiline
              minRows={8}
              value={selectedAnswer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Write your code here..."
              sx={{ fontFamily: "monospace" }}
            />
          </Box>
        );

      default:
        return <Typography color="error">Unknown question type</Typography>;
    }
  };

  return (
    <Card className="h-full bg-white shadow-lg">
      <CardContent className="p-6">
        <Box className="mb-4">
          <Typography variant="h6" className="text-gray-600 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </Typography>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </Box>

        {/* Question */}
        <Typography variant="h5" className="mb-6 font-semibold leading-relaxed">
          {currentQuestion.question}
        </Typography>

        {/* Dynamic UI */}
        {renderQuestionUI()}
      </CardContent>
    </Card>
  );
};

export default StartTest;
