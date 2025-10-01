import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

interface SessionTimerProps {
  onSessionComplete?: (duration: number) => void;
  sessionType?: string;
  className?: string;
}

export const SessionTimer = ({ 
  onSessionComplete, 
  sessionType = "Study Session",
  className = ""
}: SessionTimerProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsSessionActive(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleEnd = () => {
    setIsRunning(false);
    setIsSessionActive(false);
    onSessionComplete?.(time);
    setTime(0);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSessionActive(false);
    setTime(0);
  };

  const getSessionBadge = () => {
    if (!isSessionActive) return null;
    
    return (
      <Badge 
        variant="secondary" 
        className={`${isRunning ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'} border-0`}
      >
        {isRunning ? 'Active' : 'Paused'}
      </Badge>
    );
  };

  return (
    <Card className={`p-4 bg-gradient-card border-calm/30 shadow-soft ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">{sessionType}</span>
          </div>
          {getSessionBadge()}
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-foreground mb-3">
            {formatTime(time)}
          </div>
          
          <div className="flex justify-center gap-2">
            {!isSessionActive ? (
              <Button 
                onClick={handleStart}
                className="bg-success hover:bg-success/90 text-success-foreground"
              >
                <Play className="h-4 w-4 mr-1" />
                Start Session
              </Button>
            ) : (
              <>
                {!isRunning ? (
                  <Button 
                    onClick={handleStart}
                    size="sm"
                    className="bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePause}
                    size="sm"
                    variant="outline"
                    className="border-warning/30 text-warning hover:bg-warning/10"
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </Button>
                )}
                
                <Button 
                  onClick={handleEnd}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  End Session
                </Button>
                
                <Button 
                  onClick={handleReset}
                  size="sm"
                  variant="outline"
                  className="border-muted text-muted-foreground hover:bg-muted/10"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {time > 0 && !isSessionActive && (
          <div className="text-center text-sm text-muted-foreground">
            Last session: {formatTime(time)}
          </div>
        )}
      </div>
    </Card>
  );
};