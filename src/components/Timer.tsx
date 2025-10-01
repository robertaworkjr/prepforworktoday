import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

interface TimerProps {
  title?: string;
  mode?: 'stopwatch' | 'countdown';
  initialTime?: number; // in seconds
  onTimeUp?: () => void;
  className?: string;
}

export const Timer = ({ 
  title = "Timer", 
  mode = 'stopwatch', 
  initialTime = 0, 
  onTimeUp,
  className = ""
}: TimerProps) => {
  const [time, setTime] = useState(mode === 'countdown' ? initialTime : 0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (mode === 'countdown') {
            const newTime = prevTime - 1;
            if (newTime <= 0) {
              setIsRunning(false);
              onTimeUp?.();
              return 0;
            }
            return newTime;
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setTime(mode === 'countdown' ? initialTime : 0);
  };

  const getTimeColor = () => {
    if (mode === 'countdown' && time <= 10 && time > 0) {
      return 'text-destructive';
    }
    if (mode === 'countdown' && time === 0) {
      return 'text-destructive font-bold animate-pulse';
    }
    return 'text-foreground';
  };

  return (
    <Card className={`p-4 bg-gradient-card border-calm/30 shadow-soft ${className}`}>
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="font-medium text-foreground">{title}</h3>
        </div>
        
        <div className={`text-3xl font-mono font-bold ${getTimeColor()}`}>
          {formatTime(time)}
        </div>
        
        <div className="flex justify-center gap-2">
          {!isRunning ? (
            <Button 
              onClick={handleStart} 
              size="sm" 
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              <Play className="h-4 w-4 mr-1" />
              {hasStarted ? 'Resume' : 'Start'}
            </Button>
          ) : (
            <Button 
              onClick={handlePause} 
              size="sm" 
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <Pause className="h-4 w-4 mr-1" />
              Pause
            </Button>
          )}
          
          <Button 
            onClick={handleReset} 
            size="sm" 
            variant="outline"
            className="border-muted text-muted-foreground hover:bg-muted/10"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
        
        {mode === 'countdown' && time === 0 && (
          <div className="text-sm text-destructive font-medium">
            Time's up!
          </div>
        )}
      </div>
    </Card>
  );
};