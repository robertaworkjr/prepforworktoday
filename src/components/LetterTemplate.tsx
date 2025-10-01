import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, FileText, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LetterTemplateProps {
  className?: string;
}

export const LetterTemplate = ({ className = "" }: LetterTemplateProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const letterTemplate = `[Your Name]
[Your Address]
[City, State ZIP Code]
[Your Email]
[Your Phone Number]

[Date]

[Hiring Manager's Name]
[Company Name]
[Company Address]
[City, State ZIP Code]

Dear Hiring Manager,

I am writing to express my strong interest in the [Job Title] position at [Company Name]. After researching your company, I am impressed by [specific company detail - values, mission, recent news, etc.] and believe my enthusiasm and willingness to learn would make me a valuable addition to your team.

Although I am early in my career, I bring several key qualities that I believe would benefit your organization:

• Strong work ethic and reliability - I understand the importance of showing up on time and giving my best effort every day
• Eagerness to learn - I am excited about developing new skills and growing professionally
• Positive attitude - I work well with others and approach challenges with enthusiasm
• [Add specific skill or experience relevant to the role]

I am particularly drawn to this position because [specific reason related to the job or company]. I am confident that my dedication and fresh perspective would allow me to contribute meaningfully to your team while continuing to develop my professional skills.

I would welcome the opportunity to discuss how my enthusiasm and commitment to excellence can benefit [Company Name]. Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
[Your Name]`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letterTemplate);
      setCopied(true);
      toast({
        title: "Letter copied!",
        description: "Template copied to clipboard. Customize it for your application.",
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

  const customizationTips = [
    "Replace all [bracketed] placeholders with your specific information",
    "Research the company to add specific details about why you want to work there",
    "Mention any relevant skills, volunteer work, or education",
    "Keep the letter to one page when printed",
    "Proofread carefully for spelling and grammar errors",
    "Match the tone to the company culture (more formal for corporate, slightly casual for startups)"
  ];

  return (
    <Card className={`p-6 bg-gradient-card border-calm/30 shadow-soft ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Letter of Interest Template</h3>
              <p className="text-sm text-muted-foreground">
                Professional template for job applications
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            Ready to Use
          </Badge>
        </div>

        {/* Letter Template */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Template Letter</h4>
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
                  Copy Letter
                </>
              )}
            </Button>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg border border-muted/40">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {letterTemplate}
            </pre>
          </div>
        </div>

        {/* Customization Tips */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Edit3 className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-foreground">Customization Tips</h4>
          </div>
          
          <div className="space-y-2">
            {customizationTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Remember:</strong> This template is a starting point. Personalize it to reflect your unique qualities and genuine interest in each specific role!
          </p>
        </div>
      </div>
    </Card>
  );
};