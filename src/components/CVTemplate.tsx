import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, User, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CVTemplateProps {
  className?: string;
}

export const CVTemplate = ({ className = "" }: CVTemplateProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const cvTemplate = `[YOUR FULL NAME]
[Your Address, City, Postcode]
[Your Phone Number] | [Your Email Address]

PERSONAL STATEMENT
Motivated and reliable individual seeking an entry-level position to begin my career. I bring a positive attitude, strong work ethic, and eagerness to learn new skills. I am committed to contributing effectively to a team while developing professionally.

SKILLS
• Reliable and punctual - understand the importance of being on time
• Good communication skills - comfortable speaking with people
• Quick learner - adapt well to new situations and instructions  
• Team player - work well with others and support colleagues
• Problem-solving - can think through challenges and find solutions
• [Add specific skills like computer skills, languages, driving license]

EXPERIENCE & RESPONSIBILITIES

[Job Title/Role] - [Company/Place] | [Dates]
• [Describe what you did - focus on responsibilities and achievements]
• [Example: Served customers in busy environment, handled money accurately]
• [Example: Worked as part of team to meet daily targets]

Volunteer Work/Personal Responsibilities
• [Example: Cared for younger siblings - developed patience and responsibility]
• [Example: Helped elderly neighbor with shopping - showed reliability and kindness]
• [Example: Organized family events - demonstrated planning and coordination skills]

School/College Responsibilities
• [Example: Class representative - showed leadership and communication skills]
• [Example: Helped new students settle in - demonstrated empathy and support]
• [Example: Participated in group projects - developed teamwork abilities]

EDUCATION
[School/College Name] | [Years Attended]
• [Qualifications gained - GCSEs, A-levels, BTECs, etc.]
• [Relevant subjects that relate to the job you're applying for]
• [Any special achievements, awards, or recognition]

ADDITIONAL INFORMATION
• Available for full-time/part-time work
• Flexible with working hours including weekends
• [Transport arrangements - own transport, public transport, etc.]
• [Any relevant certificates - first aid, food hygiene, etc.]
• [Hobbies that show positive qualities - sports for teamwork, reading for learning]

REFERENCES
Available upon request

---
Tips for completion:
- Replace all [bracketed] sections with your own information
- If you have no formal work experience, focus on volunteer work, responsibilities at home, or school activities
- Think about times you've been responsible for something important
- Include any achievements, even small ones
- Be honest but present everything in a positive light`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cvTemplate);
      setCopied(true);
      toast({
        title: "CV template copied!",
        description: "Template copied to clipboard. Customize it with your details.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please manually select and copy the text.",
        variant: "destructive"
      });
    }
  };

  const experienceExamples = [
    {
      category: "Personal Responsibilities",
      examples: [
        "Cared for younger siblings while parents worked",
        "Managed household budget for groceries",
        "Organized family celebrations or events",
        "Looked after pets - showed commitment and routine"
      ]
    },
    {
      category: "School/Community",
      examples: [
        "Helped classmates with studies",
        "Participated in school productions or events",
        "Volunteered for local charity or community center",
        "Completed work experience placements"
      ]
    },
    {
      category: "Basic Work Experience",
      examples: [
        "Paper round - showed reliability and time management",
        "Babysitting - demonstrated trust and responsibility",
        "Casual work helping family business",
        "Weekend/holiday jobs in retail or hospitality"
      ]
    }
  ];

  return (
    <Card className={`p-6 bg-gradient-card border-calm/30 shadow-soft ${className}`}>
      <div className="space-y-6">
        {/* Header */}
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
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Entry Level
          </Badge>
        </div>

        {/* CV Template */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">CV Template</h4>
            <Button
              onClick={handleCopy}
              size="sm"
              className={
                copied
                  ? "bg-success hover:bg-success/90 text-success-foreground"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy CV
                </>
              )}
            </Button>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg border border-muted/40 max-h-96 overflow-y-auto">
            <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {cvTemplate}
            </pre>
          </div>
        </div>

        {/* Experience Ideas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Edit3 className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-foreground">Experience Ideas to Include</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experienceExamples.map((category, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/20 border border-muted/30">
                <h5 className="font-medium text-foreground mb-2 text-sm">{category.category}</h5>
                <div className="space-y-1">
                  {category.examples.map((example, exIndex) => (
                    <div key={exIndex} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-muted-foreground">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <h5 className="font-medium text-foreground mb-2 text-sm">✨ What to Emphasize</h5>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Reliability and punctuality</p>
              <p>• Willingness to learn</p>
              <p>• Any responsibility you've had</p>
              <p>• Positive attitude and teamwork</p>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-success/5 border border-success/20">
            <h5 className="font-medium text-foreground mb-2 text-sm">💡 Pro Tips</h5>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• Keep it to 1-2 pages maximum</p>
              <p>• Use clear, simple language</p>
              <p>• Check spelling and grammar</p>
              <p>• Tailor it for each job application</p>
            </div>
          </div>
        </div>

        {/* Encouragement */}
        <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
          <p className="text-sm text-muted-foreground">
            🌟 <strong>Remember:</strong> Everyone starts somewhere! Your personal experiences and positive attitude are valuable qualities that employers look for in entry-level candidates.
          </p>
        </div>
      </div>
    </Card>
  );
};