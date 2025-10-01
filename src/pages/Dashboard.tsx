import { ProgressDashboard } from "@/components/ProgressDashboard";
import { JobSites } from "@/components/JobSites";
import { LetterTemplate } from "@/components/LetterTemplate";
import { CVTemplate } from "@/components/CVTemplate";
import { CareerJourney } from "@/components/CareerJourney";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Target, Mail, CheckCircle, Flame, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress, activities, settings } = useProgress();
  
  // Calculate stats from real data
  const completedActivities = activities.length;
  const quizProgress = progress.filter(p => p.quiz_category);
  const avgScore = quizProgress.length > 0 
    ? Math.round(quizProgress.reduce((sum, p) => sum + (p.score / p.total_questions * 100), 0) / quizProgress.length)
    : 0;
  
  const stats = {
    cardsCompleted: activities.filter(a => a.activity_type === 'flashcards').length,
    totalCards: 50,
    quizzesCompleted: quizProgress.length,
    quizAccuracy: avgScore,
    studyStreak: 0, // Calculate based on recent activity
    achievements: completedActivities > 5 ? ['first_steps', 'consistent'] : ['first_steps'],
    skillLevels: {
      interview_basics: Math.min(80, completedActivities * 10),
      communication: Math.min(65, completedActivities * 8),
      workplace_scenarios: Math.min(45, completedActivities * 6),
      career_planning: Math.min(30, completedActivities * 4),
    }
  };

  const todayRecommendations = [
    {
      type: 'cards',
      title: 'Interview Questions & Dress Code',
      description: 'Practice responses with built-in timers',
      icon: BookOpen,
      link: '/practice/cards',
      color: 'primary'
    },
    {
      type: 'quiz',
      title: 'Skills & Appearance Quiz',
      description: 'Test professional knowledge with time tracking',
      icon: Brain,
      link: '/practice/quiz',
      color: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Progress Dashboard
          </h1>
          <p className="text-muted-foreground">
            🌟 You're doing amazing! Every step forward is building your bright future.
          </p>
          <div className="mt-3 p-3 bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-lg">
            <p className="text-sm text-success-foreground font-medium">
              💪 Remember: You have unique talents that the world needs. Keep building your confidence - you're closer to success than you think!
            </p>
          </div>
        </div>

        {/* Career Journey Section */}
        <CareerJourney userName={user?.email?.split('@')[0] || "Future Professional"} className="mb-8" />

        {/* Quick Actions with New Features */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="shadow-card cursor-pointer hover:shadow-float transition-shadow" onClick={() => navigate('/practice/cards')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Practice</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">5 mins</div>
              <p className="text-xs text-muted-foreground">
                Practice 3 interview questions
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card cursor-pointer hover:shadow-float transition-shadow" onClick={() => navigate('/email-templates')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email Templates</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">6</div>
              <p className="text-xs text-muted-foreground">
                Professional templates
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card cursor-pointer hover:shadow-float transition-shadow" onClick={() => navigate('/interview-checklist')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Prep</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-confidence">Ready?</div>
              <p className="text-xs text-muted-foreground">
                Complete checklist
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{completedActivities} days</div>
              <p className="text-xs text-muted-foreground">
                Keep it going!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Goal - Updated */}
        <Card className="p-6 mb-8 bg-gradient-hero text-white border-0 shadow-float">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/20">
              <Target className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Today's Goal</h3>
              <p className="text-white/90">🎯 You're building skills that will last a lifetime! Practice dress code cards, use timers, and complete 1 quiz</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{completedActivities}/{settings?.daily_goal || 3}</div>
              <div className="text-sm text-white/80">completed</div>
            </div>
          </div>
        </Card>

        {/* Job Sites Section */}
        <div id="job-sites">
          <JobSites className="mb-8" />
        </div>

        {/* Letter Template Section */}
        <div id="letter-template">
          <Card className="p-6 bg-gradient-card border-calm/30 shadow-soft mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Letter of Interest Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional templates for job applications
                  </p>
                </div>
              </div>
              <Link to="/letter-template">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Create Letter
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* CV Template Section */}
        <div id="cv-template">
          <Card className="p-6 bg-gradient-card border-calm/30 shadow-soft mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Basic CV Template</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for young people starting their career journey
                  </p>
                </div>
              </div>
              <Link to="/cv-template">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Build CV
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Progress Dashboard */}
        <ProgressDashboard stats={stats} />

        {/* Motivational Quote */}
        <Card className="p-6 mt-8 bg-gradient-card border-calm/30 shadow-soft">
          <div className="text-center">
            <blockquote className="text-lg font-medium text-foreground mb-2">
              "Your age is your superpower - you bring fresh energy, new perspectives, and unlimited potential to everything you do."
            </blockquote>
            <cite className="text-muted-foreground">Your Success Journey</cite>
            <div className="mt-4 text-sm text-muted-foreground">
              🌟 Keep going! You're building the foundation for an incredible career. Every practice session, every skill learned, every step forward matters.
            </div>
            <div className="mt-3 text-xs text-primary font-medium">
              ✨ You've got this! The world is waiting for your unique talents to shine.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;