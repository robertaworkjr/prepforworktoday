import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface EmailTemplate {
  id: string;
  category: string;
  subject: string;
  template: string;
  purpose: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'e1',
    category: 'Application Follow-up',
    subject: 'Following up on my application for [Position Title]',
    template: `Dear [Hiring Manager Name],

I hope this email finds you well. I wanted to follow up on my application for the [Position Title] position that I submitted on [Date]. I remain very interested in this opportunity and would welcome the chance to discuss how my skills and enthusiasm can contribute to your team.

I understand you're likely reviewing many applications, and I appreciate your time and consideration. If you need any additional information from me, please don't hesitate to reach out.

Thank you for your time, and I look forward to hearing from you.

Best regards,
[Your Name]
[Your Phone Number]
[Your Email]`,
    purpose: 'To politely follow up on a job application after a reasonable waiting period',
    difficulty: 'beginner'
  },
  {
    id: 'e2',
    category: 'Interview Thank You',
    subject: 'Thank you for the interview - [Position Title]',
    template: `Dear [Interviewer Name],

Thank you for taking the time to meet with me today to discuss the [Position Title] role. I enjoyed learning more about [specific topic discussed] and your team's goals for the upcoming year.

Our conversation reinforced my interest in this position and my enthusiasm for contributing to [Company Name]. I'm particularly excited about [specific project or responsibility mentioned].

Please let me know if you need any additional information from me. I look forward to the next steps in the process.

Best regards,
[Your Name]`,
    purpose: 'To send within 24 hours after an interview to show appreciation and reinforce interest',
    difficulty: 'beginner'
  },
  {
    id: 'e3',
    category: 'Professional Request',
    subject: 'Request for [specific item/information]',
    template: `Dear [Recipient Name],

I hope you're doing well. I'm writing to request [specific item/information/meeting] for [brief reason].

[Provide context and explanation of why you need this]

I would be happy to discuss this further at your convenience. Please let me know if you need any additional information from me or if there's a better time to connect.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Position/Title]
[Contact Information]`,
    purpose: 'For making professional requests to colleagues or supervisors',
    difficulty: 'intermediate'
  },
  {
    id: 'e4',
    category: 'Networking',
    subject: 'Introduction and potential collaboration',
    template: `Dear [Contact Name],

I hope this email finds you well. My name is [Your Name], and I'm a [your role/background]. [Mutual connection] suggested I reach out to you because of your expertise in [their field/area].

I'm currently [brief description of your situation/goals], and I would value the opportunity to learn from your experience. Would you be available for a brief coffee or phone call in the coming weeks?

I understand your time is valuable, and I'm happy to work around your schedule.

Thank you for considering my request.

Best regards,
[Your Name]
[LinkedIn Profile]
[Phone Number]`,
    purpose: 'For reaching out to new professional connections or industry contacts',
    difficulty: 'intermediate'
  },
  {
    id: 'e5',
    category: 'Workplace Communication',
    subject: 'Update on [Project Name]',
    template: `Hi [Supervisor/Team],

I wanted to provide you with an update on [Project Name] as of [Date].

Progress Summary:
• [Completed task 1]
• [Completed task 2]
• [Current focus area]

Upcoming Milestones:
• [Next deadline and deliverable]
• [Future milestone]

Challenges/Support Needed:
[If any - otherwise state "No blocking issues at this time"]

Please let me know if you have any questions or if you'd like to schedule a meeting to discuss further details.

Best regards,
[Your Name]`,
    purpose: 'For providing regular project updates to supervisors or team members',
    difficulty: 'beginner'
  },
  {
    id: 'e6',
    category: 'Absence/Time Off',
    subject: 'Time off request for [dates]',
    template: `Dear [Supervisor Name],

I would like to request time off from [start date] to [end date] for [brief reason - personal/vacation/family].

To ensure a smooth workflow during my absence, I plan to:
• Complete [specific tasks] before my departure
• Brief [colleague name] on any ongoing projects
• Ensure all urgent matters are addressed beforehand

I will check my email periodically and can be reached at [phone number] for any urgent matters.

Please let me know if you need any additional information or if we should discuss coverage arrangements.

Thank you for your consideration.

Best regards,
[Your Name]`,
    purpose: 'For requesting time off from work in a professional manner',
    difficulty: 'beginner'
  }
];

export const EmailTemplates = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (template: EmailTemplate) => {
    try {
      await navigator.clipboard.writeText(template.template);
      setCopiedId(template.id);
      toast({
        title: "Template copied!",
        description: "Email template has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-confidence text-confidence-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Email Templates</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professional email templates for common workplace and job search situations. 
          Copy and customize these templates for your needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {emailTemplates.map((template) => (
          <Card key={template.id} className="shadow-card">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.category}</CardTitle>
                  <CardDescription className="text-sm">
                    {template.purpose}
                  </CardDescription>
                </div>
                <Badge className={getDifficultyColor(template.difficulty)}>
                  {template.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <span className="font-medium">Subject:</span>
                <span className="italic">{template.subject}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg border">
                <pre className="text-sm whitespace-pre-wrap font-mono text-foreground leading-relaxed">
                  {template.template}
                </pre>
              </div>
              
              <Button
                onClick={() => copyToClipboard(template)}
                className="w-full"
                variant="outline"
                disabled={copiedId === template.id}
              >
                {copiedId === template.id ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-2" />
                    Copy Template
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-calm/50 rounded-lg border border-calm">
        <h3 className="font-semibold text-calm-foreground mb-3">Tips for Using Email Templates:</h3>
        <ul className="space-y-2 text-calm-foreground text-sm">
          <li>• Replace all bracketed placeholders [like this] with specific information</li>
          <li>• Personalize the tone to match your relationship with the recipient</li>
          <li>• Always proofread before sending and check recipient details</li>
          <li>• Keep subject lines clear and specific to improve response rates</li>
          <li>• Send follow-ups within appropriate timeframes (24-48 hours for interviews)</li>
        </ul>
      </div>
    </div>
  );
};