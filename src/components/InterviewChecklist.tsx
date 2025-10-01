import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, RotateCcw, User, Briefcase, FileText, Phone } from "lucide-react";

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  timeframe: string;
  importance: 'essential' | 'recommended' | 'optional';
}

const checklistItems: ChecklistItem[] = [
  // Research Phase
  {
    id: 'r1',
    category: 'Research & Preparation',
    item: 'Research the company',
    description: 'Review company website, mission, values, recent news, and products/services',
    timeframe: '1-2 days before',
    importance: 'essential'
  },
  {
    id: 'r2',
    category: 'Research & Preparation',
    item: 'Study the job description',
    description: 'Understand key requirements, responsibilities, and required skills',
    timeframe: '1-2 days before',
    importance: 'essential'
  },
  {
    id: 'r3',
    category: 'Research & Preparation',
    item: 'Research your interviewer',
    description: 'Look up interviewer on LinkedIn to understand their background and role',
    timeframe: '1 day before',
    importance: 'recommended'
  },
  {
    id: 'r4',
    category: 'Research & Preparation',
    item: 'Prepare STAR examples',
    description: 'Prepare 3-5 examples using Situation, Task, Action, Result framework',
    timeframe: '1-2 days before',
    importance: 'essential'
  },
  {
    id: 'r5',
    category: 'Research & Preparation',
    item: 'Practice common questions',
    description: 'Practice answers to common interview questions out loud',
    timeframe: '1-2 days before',
    importance: 'essential'
  },
  {
    id: 'r6',
    category: 'Research & Preparation',
    item: 'Prepare questions to ask',
    description: 'Prepare 5-7 thoughtful questions about the role and company',
    timeframe: '1 day before',
    importance: 'essential'
  },

  // Documents & Materials
  {
    id: 'd1',
    category: 'Documents & Materials',
    item: 'Print multiple copies of resume',
    description: 'Bring 3-5 clean, updated copies of your resume',
    timeframe: 'Night before',
    importance: 'essential'
  },
  {
    id: 'd2',
    category: 'Documents & Materials',
    item: 'Prepare portfolio/work samples',
    description: 'Organize relevant work samples or portfolio pieces if applicable',
    timeframe: '1-2 days before',
    importance: 'recommended'
  },
  {
    id: 'd3',
    category: 'Documents & Materials',
    item: 'Prepare reference list',
    description: 'Have a list of 3-4 professional references ready',
    timeframe: '1 day before',
    importance: 'recommended'
  },
  {
    id: 'd4',
    category: 'Documents & Materials',
    item: 'Bring notepad and pen',
    description: 'Professional notepad and working pen for taking notes',
    timeframe: 'Day of interview',
    importance: 'essential'
  },

  // Appearance & Attire
  {
    id: 'a1',
    category: 'Appearance & Attire',
    item: 'Choose and prepare outfit',
    description: 'Select appropriate interview attire and ensure it\'s clean and pressed',
    timeframe: 'Night before',
    importance: 'essential'
  },
  {
    id: 'a2',
    category: 'Appearance & Attire',
    item: 'Plan grooming routine',
    description: 'Ensure hair is neat, nails are clean, and overall appearance is professional',
    timeframe: 'Morning of',
    importance: 'essential'
  },
  {
    id: 'a3',
    category: 'Appearance & Attire',
    item: 'Check shoes and accessories',
    description: 'Ensure shoes are clean and polished, accessories are minimal and professional',
    timeframe: 'Night before',
    importance: 'essential'
  },

  // Logistics
  {
    id: 'l1',
    category: 'Logistics & Timing',
    item: 'Confirm interview details',
    description: 'Double-check time, location, interviewer name, and format (in-person/virtual)',
    timeframe: '1 day before',
    importance: 'essential'
  },
  {
    id: 'l2',
    category: 'Logistics & Timing',
    item: 'Plan route and timing',
    description: 'Map out route, check traffic/transport, plan to arrive 10-15 minutes early',
    timeframe: 'Night before',
    importance: 'essential'
  },
  {
    id: 'l3',
    category: 'Logistics & Timing',
    item: 'Test technology (virtual interviews)',
    description: 'Test camera, microphone, internet connection, and platform access',
    timeframe: '1 hour before',
    importance: 'essential'
  },
  {
    id: 'l4',
    category: 'Logistics & Timing',
    item: 'Charge devices',
    description: 'Ensure phone and other devices are fully charged',
    timeframe: 'Night before',
    importance: 'recommended'
  },

  // Final Preparations
  {
    id: 'f1',
    category: 'Final Preparations',
    item: 'Get good rest',
    description: 'Aim for 7-8 hours of sleep the night before',
    timeframe: 'Night before',
    importance: 'essential'
  },
  {
    id: 'f2',
    category: 'Final Preparations',
    item: 'Eat a proper meal',
    description: 'Have a light but satisfying meal before the interview',
    timeframe: '2-3 hours before',
    importance: 'recommended'
  },
  {
    id: 'f3',
    category: 'Final Preparations',
    item: 'Review key points',
    description: 'Quick review of company info, job description, and your key examples',
    timeframe: '30 minutes before',
    importance: 'essential'
  },
  {
    id: 'f4',
    category: 'Final Preparations',
    item: 'Practice relaxation techniques',
    description: 'Deep breathing, positive visualization, or other calming techniques',
    timeframe: '15 minutes before',
    importance: 'recommended'
  }
];

export const InterviewChecklist = () => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
  };

  const resetChecklist = () => {
    setCompletedItems(new Set());
  };

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));
  const totalItems = checklistItems.length;
  const completedCount = completedItems.size;
  const progressPercentage = (completedCount / totalItems) * 100;

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'essential': return 'bg-destructive text-destructive-foreground';
      case 'recommended': return 'bg-warning text-warning-foreground';
      case 'optional': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Research & Preparation': return <Briefcase size={20} />;
      case 'Documents & Materials': return <FileText size={20} />;
      case 'Appearance & Attire': return <User size={20} />;
      case 'Logistics & Timing': return <Clock size={20} />;
      case 'Final Preparations': return <CheckCircle size={20} />;
      default: return <CheckCircle size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">Interview Preparation Checklist</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete this comprehensive checklist to ensure you're fully prepared for your interview.
        </p>

        <img 
          src="/images/dresscodePFWT.png" 
          alt="Dress code and interview preparation illustration" 
          className="w-32 h-32 mx-auto rounded-lg shadow-md"
        />
        
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              Progress: {completedCount}/{totalItems} completed
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={resetChecklist}
              className="text-xs"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset
            </Button>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          {completedCount === totalItems && (
            <div className="bg-confidence/10 text-confidence border border-confidence/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span className="font-medium">Congratulations! You're fully prepared!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {categories.map((category) => {
          const categoryItems = checklistItems.filter(item => item.category === category);
          const categoryCompleted = categoryItems.filter(item => completedItems.has(item.id)).length;
          
          return (
            <Card key={category} className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {getCategoryIcon(category)}
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>
                      {categoryCompleted}/{categoryItems.length} completed
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {Math.round((categoryCompleted / categoryItems.length) * 100)}%
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {categoryItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={item.id}
                        checked={completedItems.has(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <label
                            htmlFor={item.id}
                            className={`font-medium cursor-pointer ${
                              completedItems.has(item.id) 
                                ? 'text-muted-foreground line-through' 
                                : 'text-foreground'
                            }`}
                          >
                            {item.item}
                          </label>
                          <div className="flex gap-2">
                            <Badge className={getImportanceColor(item.importance)} variant="secondary">
                              {item.importance}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock size={12} className="mr-1" />
                              {item.timeframe}
                            </Badge>
                          </div>
                        </div>
                        <p className={`text-sm ${
                          completedItems.has(item.id) 
                            ? 'text-muted-foreground' 
                            : 'text-muted-foreground'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-calm/50 rounded-lg border border-calm">
        <h3 className="font-semibold text-calm-foreground mb-3 flex items-center gap-2">
          <Phone size={16} />
          Phone Interview Tips:
        </h3>
        <ul className="space-y-2 text-calm-foreground text-sm">
          <li>• Find a quiet space with good reception and minimal distractions</li>
          <li>• Use a landline or strong mobile signal - avoid speakerphone unless necessary</li>
          <li>• Have your resume, job description, and notes easily accessible</li>
          <li>• Stand up during the call - it helps project confidence in your voice</li>
          <li>• Smile while talking - it comes through in your tone</li>
          <li>• Take notes during the conversation and ask for clarification if needed</li>
          <li>• Have water nearby and avoid eating, chewing, or smoking</li>
        </ul>
      </div>
    </div>
  );
};