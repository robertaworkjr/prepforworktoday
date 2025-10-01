import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  Briefcase, 
  User, 
  Shirt, 
  FileText 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface JourneyOption {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  link: string;
  color: string;
  bgColor: string;
}

interface CareerJourneyProps {
  userName?: string;
  className?: string;
}

export const CareerJourney = ({ userName = "Future Professional", className = "" }: CareerJourneyProps) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const journeyOptions: JourneyOption[] = [
    {
      id: 'interview',
      title: 'Interview Practice',
      icon: BookOpen,
      link: '/practice/cards',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'quiz',
      title: 'Skills Quiz',
      icon: Brain,
      link: '/practice/quiz',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'jobs',
      title: 'Find Jobs',
      icon: Briefcase,
      link: '#job-sites',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'cv',
      title: 'Build CV',
      icon: User,
      link: '#cv-template',
      color: 'text-progress',
      bgColor: 'bg-progress/10'
    },
    {
      id: 'appearance',
      title: 'Dress Code',
      icon: Shirt,
      link: '/practice/cards',
      color: 'text-calm',
      bgColor: 'bg-calm/10'
    },
    {
      id: 'letter',
      title: 'Email Templates',
      icon: FileText,
      link: '/email-templates',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOptionClick = (option: JourneyOption) => {
    if (option.link.startsWith('#')) {
      scrollToSection(option.link);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Greeting Header Card */}
      <Card className="p-6 bg-gradient-hero text-white border-0 shadow-float relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-sm text-white/80 mb-1">{getGreeting()}</div>
          <h2 className="text-2xl font-bold mb-4">{userName}</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/90">🌟 You're building an amazing future!</div>
              <div className="text-xs text-white/70">Your potential is limitless - keep shining bright</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">🚀</div>
              <div className="text-xs text-white/80">You've got this!</div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
      </Card>

      {/* Journey Options */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Start your career journey</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {journeyOptions.map((option, index) => {
            const Icon = option.icon;
            const isExternal = option.link.startsWith('#');
            
            const cardContent = (
              <Card 
                className="p-6 bg-gradient-card border-calm/20 shadow-soft hover:shadow-float transition-all duration-300 hover-scale cursor-pointer group"
                onClick={() => isExternal && handleOptionClick(option)}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-4 rounded-full ${option.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`h-8 w-8 ${option.color}`} />
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {option.title}
                  </h4>
                </div>
                
                {/* Animated underline */}
                <div className="mt-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Card>
            );

            if (isExternal) {
              return (
                <div 
                  key={option.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link 
                key={option.id} 
                to={option.link}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="p-4 bg-gradient-card border-calm/20 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-foreground">Today's Progress</h4>
            <p className="text-sm text-muted-foreground">Keep building your confidence</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">3/6</div>
            <div className="text-xs text-muted-foreground">activities completed</div>
          </div>
        </div>
        <div className="mt-3 w-full bg-muted/30 rounded-full h-2">
          <div className="bg-gradient-to-r from-primary to-success h-2 rounded-full w-1/2 transition-all duration-500"></div>
        </div>
      </Card>
    </div>
  );
};