import { useState, useEffect } from "react";
import { FlipCard } from "@/components/FlipCard";
import { Timer } from "@/components/Timer";
import { SessionTimer } from "@/components/SessionTimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCcw, Home } from "lucide-react";
import { interviewCards } from "@/data/interviewQuestions";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FlipCardPractice = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());
  const [cardDifficulties, setCardDifficulties] = useState<{[key: string]: string}>({});
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const currentCard = interviewCards[currentIndex];
  const progress = ((currentIndex + 1) / interviewCards.length) * 100;

  const handleNext = () => {
    if (currentIndex < interviewCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBookmark = () => {
    const newBookmarks = new Set(bookmarkedCards);
    if (newBookmarks.has(currentCard.id)) {
      newBookmarks.delete(currentCard.id);
      toast({
        title: "Bookmark removed",
        description: "Card removed from your bookmarks.",
      });
    } else {
      newBookmarks.add(currentCard.id);
      toast({
        title: "Card bookmarked!",
        description: "You can review this card later.",
      });
    }
    setBookmarkedCards(newBookmarks);
  };

  const handleDifficulty = (level: 'easy' | 'medium' | 'hard') => {
    setCardDifficulties(prev => ({
      ...prev,
      [currentCard.id]: level
    }));
    
    setCompletedCards(prev => new Set(prev).add(currentCard.id));
    
    toast({
      title: "Progress saved!",
      description: `Marked as ${level}. Keep practicing!`,
      variant: cardDifficulties[currentCard.id] ? "default" : "default",
    });
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setCompletedCards(new Set());
    setCardDifficulties({});
    toast({
      title: "Progress reset",
      description: "Starting fresh! You've got this.",
    });
  };

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
              <h1 className="text-2xl font-bold text-foreground">Interview Practice</h1>
              <p className="text-muted-foreground">🌟 You're doing great! Every question you practice brings you closer to success</p>
            </div>
            <img 
              src="/images/interViewPFWT1.jpg" 
              alt="Interview practice illustration" 
              className="w-32 h-32 rounded-lg shadow-md"
            />
          </div>
          <Button
            variant="outline"
            onClick={resetProgress}
            className="border-muted text-muted-foreground hover:bg-muted/50"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Progress Bar */}
        <Card className="p-4 mb-6 bg-gradient-card border-calm/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {interviewCards.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Completed: {completedCards.size}</span>
            <span>Bookmarked: {bookmarkedCards.size}</span>
          </div>
        </Card>

        {/* Timers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Timer 
            title="Response Timer" 
            mode="stopwatch" 
            className="h-fit"
          />
          <Timer 
            title="Interview Timer" 
            mode="countdown" 
            initialTime={120}
            onTimeUp={() => toast({ title: "Time's up!", description: "Consider wrapping up your answer." })}
            className="h-fit"
          />
          <SessionTimer 
            sessionType="Interview Practice"
            onSessionComplete={(duration) => {
              toast({ 
                title: "Practice complete!", 
                description: `Session lasted ${Math.floor(duration / 60)} minutes.` 
              });
            }}
            className="h-fit"
          />
        </div>

        {/* Category Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {currentCard.category}
          </Badge>
        </div>

        {/* Flip Card */}
        <div className="mb-8">
          <FlipCard
            question={currentCard.question}
            answer={currentCard.answer}
            onDifficulty={handleDifficulty}
            onBookmark={handleBookmark}
            isBookmarked={bookmarkedCards.has(currentCard.id)}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {cardDifficulties[currentCard.id] && (
              <Badge
                variant="outline"
                className={`
                  ${cardDifficulties[currentCard.id] === 'easy' ? 'border-success/30 text-success' : ''}
                  ${cardDifficulties[currentCard.id] === 'medium' ? 'border-warning/30 text-warning' : ''}
                  ${cardDifficulties[currentCard.id] === 'hard' ? 'border-destructive/30 text-destructive' : ''}
                `}
              >
                {cardDifficulties[currentCard.id]}
              </Badge>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentIndex === interviewCards.length - 1}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Completion Message */}
        {currentIndex === interviewCards.length - 1 && completedCards.has(currentCard.id) && (
          <Card className="p-6 mt-8 bg-gradient-success text-white border-0 shadow-float text-center">
            <h3 className="text-xl font-bold mb-2">🎉 Outstanding achievement!</h3>
            <p className="mb-4">You've completed all interview cards! Your dedication shows you have what it takes to succeed. You're building real confidence and skills that employers value.</p>
            <p className="text-sm text-white/90 mb-4">🌟 Remember: You're young, talented, and have so much to offer. Every practice session makes you stronger!</p>
            <div className="flex gap-4 justify-center">
              <Link to="/practice/quiz">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                  Try Quiz Mode
                </Button>
              </Link>
              <Button
                onClick={resetProgress}
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                Practice Again
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlipCardPractice;