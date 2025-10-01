import { useState, useEffect } from "react";
import { QuizCard } from "@/components/QuizCard";
import { Timer } from "@/components/Timer";
import { SessionTimer } from "@/components/SessionTimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, RotateCcw, Trophy } from "lucide-react";
import { quizQuestions } from "@/data/interviewQuestions";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuizPractice = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: boolean}>({});
  const [sessionComplete, setSessionComplete] = useState(false);
  const { toast } = useToast();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const answeredQuestions = Object.keys(answers).length;
  const correctAnswers = Object.values(answers).filter(Boolean).length;
  const accuracy = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;

  const handleQuestionComplete = (correct: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: correct
    }));

    // Show encouraging toast
    if (correct) {
      toast({
        title: "Amazing work! 🌟",
        description: "You're showing real knowledge and growth!",
      });
    } else {
      toast({
        title: "You're learning! 💪",
        description: "Every challenge makes you stronger and wiser.",
      });
    }
  };

  const handleRetry = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSessionComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSessionComplete(false);
    toast({
      title: "Fresh start!",
      description: "Ready to practice again.",
    });
  };

  const getEncouragementMessage = () => {
    if (accuracy >= 80) return "🎉 Outstanding work! You're showing incredible knowledge and readiness. Employers will be impressed by your preparation! 🌟";
    if (accuracy >= 60) return "💪 Great progress! You're building real confidence and skills. Your dedication is paying off beautifully!";
    if (accuracy >= 40) return "📈 You're learning and growing! Every question you tackle makes you stronger. Keep believing in yourself!";
    return "🚀 What a great start! You have amazing potential and you're taking all the right steps. Your future is bright!";
  };

  const getAccuracyColor = () => {
    if (accuracy >= 80) return "success";
    if (accuracy >= 60) return "primary";
    if (accuracy >= 40) return "warning";
    return "destructive";
  };

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="p-8 bg-gradient-card border-calm/30 shadow-float text-center">
            <div className="mb-6">
              <div className="p-4 rounded-full bg-success/10 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete! 🎯</h1>
              <p className="text-lg text-muted-foreground">{getEncouragementMessage()}</p>
              <p className="text-sm text-primary font-medium mt-2">✨ You're young, talented, and building skills that will last a lifetime!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-primary/10">
                <div className="text-2xl font-bold text-primary">{answeredQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div className="p-4 rounded-lg bg-success/10">
                <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className={`p-4 rounded-lg bg-${getAccuracyColor()}/10`}>
                <div className={`text-2xl font-bold text-${getAccuracyColor()}`}>{Math.round(accuracy)}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button
                onClick={resetQuiz}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Link to="/practice/cards">
                <Button
                  variant="outline"
                  className="border-success/30 text-success hover:bg-success/10"
                >
                  Practice Cards
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Skills Quiz</h1>
              <p className="text-muted-foreground">🎯 You're smart and capable - test your growing workplace knowledge!</p>
            </div>
            <img 
              src="/images/skillsPFWT1.jpg" 
              alt="Skills quiz illustration" 
              className="w-32 h-32 rounded-lg shadow-md"
            />
          </div>
          <Button
            variant="outline"
            onClick={resetQuiz}
            className="border-muted text-muted-foreground hover:bg-muted/50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Progress */}
        <Card className="p-4 mb-6 bg-gradient-card border-calm/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Quiz Progress</span>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="h-2" />
          {answeredQuestions > 0 && (
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Accuracy: {Math.round(accuracy)}%</span>
              <span>Correct: {correctAnswers}/{answeredQuestions}</span>
            </div>
          )}
        </Card>

        {/* Timers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Timer 
            title="Question Timer" 
            mode="countdown" 
            initialTime={60}
            onTimeUp={() => toast({ title: "Time's up!", description: "Consider moving to next question." })}
            className="h-fit"
          />
          <Timer 
            title="Think Time" 
            mode="stopwatch" 
            className="h-fit"
          />
          <SessionTimer 
            sessionType="Quiz Practice"
            onSessionComplete={(duration) => {
              toast({ 
                title: "Quiz session complete!", 
                description: `Total time: ${Math.floor(duration / 60)} minutes.` 
              });
            }}
            className="h-fit"
          />
        </div>

        {/* Current Question */}
        <QuizCard
          question={currentQuestion}
          onComplete={handleQuestionComplete}
          onRetry={handleRetry}
        />

        {/* Motivational Footer */}
        <Card className="p-4 mt-8 bg-gradient-card border-calm/30 text-center">
          <p className="text-muted-foreground">
            💡 <strong>Remember:</strong> Every question helps you grow stronger and more confident!
          </p>
        </Card>
      </div>
    </div>
  );
};

export default QuizPractice;