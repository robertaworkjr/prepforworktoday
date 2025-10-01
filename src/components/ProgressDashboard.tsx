import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, BookOpen, Brain, TrendingUp, Award } from "lucide-react";

interface ProgressStats {
  cardsCompleted: number;
  totalCards: number;
  quizzesCompleted: number;
  quizAccuracy: number;
  studyStreak: number;
  achievements: string[];
  skillLevels: {
    [key: string]: number;
  };
}

interface ProgressDashboardProps {
  stats: ProgressStats;
}

export const ProgressDashboard = ({ stats }: ProgressDashboardProps) => {
  const cardProgress = (stats.cardsCompleted / stats.totalCards) * 100;
  
  const achievements = [
    { id: 'first_steps', name: 'First Steps', icon: Target, completed: stats.cardsCompleted > 0 },
    { id: 'consistent', name: 'Consistent Learner', icon: TrendingUp, completed: stats.studyStreak >= 7 },
    { id: 'quiz_master', name: 'Quiz Master', icon: Brain, completed: stats.quizAccuracy >= 80 },
    { id: 'interview_ready', name: 'Interview Ready', icon: Trophy, completed: cardProgress >= 50 },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-card border-calm/30 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Interview Cards</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{stats.cardsCompleted}/{stats.totalCards}</span>
            </div>
            <Progress value={cardProgress} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-calm/30 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Brain className="h-5 w-5 text-success" />
            </div>
            <h3 className="font-semibold text-foreground">Quiz Performance</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-medium">{stats.quizAccuracy}%</span>
            </div>
            <Progress value={stats.quizAccuracy} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-calm/30 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-progress/10">
              <TrendingUp className="h-5 w-5 text-progress" />
            </div>
            <h3 className="font-semibold text-foreground">Study Streak</h3>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-progress">{stats.studyStreak}</div>
            <div className="text-sm text-muted-foreground">days</div>
          </div>
        </Card>
      </div>

      {/* Skill Levels */}
      <Card className="p-6 bg-gradient-card border-calm/30 shadow-soft">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Skill Levels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(stats.skillLevels).map(([skill, level]) => (
            <div key={skill} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize text-foreground">{skill.replace('_', ' ')}</span>
                <span className="font-medium text-primary">{level}%</span>
              </div>
              <Progress value={level} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-gradient-card border-calm/30 shadow-soft">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border text-center transition-all ${
                  achievement.completed
                    ? 'bg-success/10 border-success/30 text-success'
                    : 'bg-muted/30 border-muted text-muted-foreground'
                }`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-2 ${
                  achievement.completed ? 'text-success' : 'text-muted-foreground'
                }`} />
                <div className="text-sm font-medium">{achievement.name}</div>
                {achievement.completed && (
                  <Badge variant="secondary" className="mt-1 bg-success/20 text-success border-0">
                    Earned
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};