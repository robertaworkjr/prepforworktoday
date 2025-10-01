import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Bookmark, BookmarkCheck } from "lucide-react";

interface FlipCardProps {
  question: string;
  answer: string;
  onDifficulty: (level: 'easy' | 'medium' | 'hard') => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

export const FlipCard = ({ question, answer, onDifficulty, onBookmark, isBookmarked }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDifficulty = (level: 'easy' | 'medium' | 'hard') => {
    onDifficulty(level);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card 
        className="relative h-80 cursor-pointer transition-all duration-300 hover:shadow-float bg-gradient-card border-calm/30"
        onClick={handleFlip}
      >
        <div className={`absolute inset-0 w-full h-full transition-transform duration-600 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front Side - Question */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Interview Question
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark();
                  }}
                  className="text-muted-foreground hover:text-primary"
                >
                  {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg font-medium text-center leading-relaxed">
                  {question}
                </p>
              </div>

              <div className="flex items-center justify-center text-muted-foreground">
                <RotateCcw className="h-4 w-4 mr-2" />
                <span className="text-sm">Tap to see answer</span>
              </div>
            </div>
          </div>

          {/* Back Side - Answer */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
                  Sample Answer
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark();
                  }}
                  className="text-muted-foreground hover:text-primary"
                >
                  {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <p className="text-base leading-relaxed text-foreground/90">
                  {answer}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  How difficult was this question?
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDifficulty('easy');
                    }}
                    className="text-success border-success/30 hover:bg-success/10"
                  >
                    Easy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDifficulty('medium');
                    }}
                    className="text-warning border-warning/30 hover:bg-warning/10"
                  >
                    Medium
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDifficulty('hard');
                    }}
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    Hard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};