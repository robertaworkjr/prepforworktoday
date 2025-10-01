import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  skill: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  onComplete: (correct: boolean) => void;
  onRetry: () => void;
}

export const QuizCard = ({ question, onComplete, onRetry }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const answerIndex = parseInt(selectedAnswer);
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete(correct);
  };

  const handleRetry = () => {
    setSelectedAnswer("");
    setSubmitted(false);
    setIsCorrect(false);
    onRetry();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-gradient-card border-calm/30 shadow-card">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {question.skill}
          </span>
          {submitted && (
            <div className={`flex items-center gap-2 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              <span className="font-medium">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
          )}
        </div>

        {/* Question */}
        <div>
          <h3 className="text-lg font-semibold mb-4 leading-relaxed">
            {question.question}
          </h3>

          {/* Options */}
          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={setSelectedAnswer}
            disabled={submitted}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  className="text-primary border-primary/30"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 text-base cursor-pointer p-3 rounded-lg border border-transparent hover:bg-muted/50 transition-colors"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Explanation (shown after submission) */}
        {submitted && (
          <div className="bg-muted/30 p-4 rounded-lg border border-muted">
            <h4 className="font-medium mb-2 text-foreground">Explanation:</h4>
            <p className="text-foreground/80 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          {!submitted ? (
            <Button 
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleRetry}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Another Question
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};