import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, FileText, Edit3, Download, ArrowLeft, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const LetterTemplatePage = () => {
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('general');
  const { toast } = useToast();

  // Form data for customization
  const [formData, setFormData] = useState({
    yourName: '',
    yourAddress: '',
    yourEmail: '',
    yourPhone: '',
    companyName: '',
    jobTitle: '',
    hiringManager: '',
    companyAddress: '',
    specificDetail: '',
    specificSkill: '',
    reasonForInterest: ''
  });

  const templates = {
    general: {
      title: "General Interest Letter",
      description: "Perfect for most job applications",
      content: `[Your Name]
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

I am writing to express my strong interest in the [Job Title] position at [Company Name]. After researching your company, I am impressed by [specific company detail] and believe my enthusiasm and willingness to learn would make me a valuable addition to your team.

Although I am early in my career, I bring several key qualities that I believe would benefit your organization:

• Strong work ethic and reliability - I understand the importance of showing up on time and giving my best effort every day
• Eagerness to learn - I am excited about developing new skills and growing professionally
• Positive attitude - I work well with others and approach challenges with enthusiasm
• [Add specific skill or experience relevant to the role]

I am particularly drawn to this position because [specific reason related to the job or company]. I am confident that my dedication and fresh perspective would allow me to contribute meaningfully to your team while continuing to develop my professional skills.

I would welcome the opportunity to discuss how my enthusiasm and commitment to excellence can benefit [Company Name]. Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
[Your Name]`
    },
    retail: {
      title: "Retail/Customer Service",
      description: "Tailored for retail and customer-facing roles",
      content: `[Your Name]
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

I am excited to apply for the [Job Title] position at [Company Name]. As someone who genuinely enjoys helping others and creating positive experiences, I believe I would be an excellent fit for your customer service team.

What I can bring to your team:

• Friendly and approachable personality - I enjoy meeting new people and making them feel welcome
• Patience and understanding - I remain calm and helpful even in challenging situations
• Quick learner - I can rapidly understand product information and store procedures
• Reliability - I understand the importance of being dependable, especially during busy periods
• Team spirit - I work well with colleagues and am always willing to help where needed

I am particularly interested in working at [Company Name] because [specific reason - could be company values, products you use, positive reputation]. I believe that excellent customer service starts with genuine care for people, and I would love the opportunity to represent your brand with that philosophy.

I am available for flexible scheduling including evenings and weekends, and I am committed to providing the kind of service that keeps customers coming back.

Thank you for considering my application. I would welcome the opportunity to discuss how my positive attitude and commitment to customer satisfaction can contribute to your team's success.

Best regards,
[Your Name]`
    },
    office: {
      title: "Office/Administrative",
      description: "For office support and administrative positions",
      content: `[Your Name]
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

I am writing to express my interest in the [Job Title] position at [Company Name]. I am eager to begin my career in an office environment where I can contribute to your team's efficiency while developing my professional skills.

The qualities I would bring to this role include:

• Strong organizational skills - I am naturally detail-oriented and enjoy keeping things well-organized
• Computer literacy - I am comfortable with basic software and eager to learn new systems
• Professional communication - I can interact effectively with colleagues and clients both in person and over the phone
• Reliability and punctuality - I understand the importance of being dependable in a professional environment
• Adaptability - I am quick to learn new procedures and adapt to changing priorities

I am particularly attracted to [Company Name] because [specific reason - company reputation, growth opportunities, work environment]. I believe that starting my career with an organization that values [relevant company value] would provide an excellent foundation for my professional development.

I am enthusiastic about the opportunity to support your team's daily operations and contribute to a positive work environment. I am available for full-time employment and am committed to growing with your organization.

Thank you for your time and consideration. I look forward to the opportunity to discuss how my dedication and fresh perspective can benefit your team.

Sincerely,
[Your Name]`
    }
  };

  const getCurrentTemplate = () => {
    let template = templates[selectedTemplate as keyof typeof templates].content;
    
    // Replace placeholders with form data
    if (formData.yourName) template = template.replace(/\[Your Name\]/g, formData.yourName);
    if (formData.yourAddress) template = template.replace(/\[Your Address\]/g, formData.yourAddress);
    if (formData.yourEmail) template = template.replace(/\[Your Email\]/g, formData.yourEmail);
    if (formData.yourPhone) template = template.replace(/\[Your Phone Number\]/g, formData.yourPhone);
    if (formData.companyName) template = template.replace(/\[Company Name\]/g, formData.companyName);
    if (formData.jobTitle) template = template.replace(/\[Job Title\]/g, formData.jobTitle);
    if (formData.hiringManager) template = template.replace(/\[Hiring Manager's Name\]/g, formData.hiringManager);
    if (formData.companyAddress) template = template.replace(/\[Company Address\]/g, formData.companyAddress);
    if (formData.specificDetail) template = template.replace(/\[specific company detail[^\]]*\]/g, formData.specificDetail);
    if (formData.specificSkill) template = template.replace(/\[Add specific skill[^\]]*\]/g, formData.specificSkill);
    if (formData.reasonForInterest) template = template.replace(/\[specific reason[^\]]*\]/g, formData.reasonForInterest);

    return template;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentTemplate());
      setCopied(true);
      toast({
        title: "Letter copied!",
        description: "Your customized letter has been copied to clipboard.",
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

  const handleDownload = () => {
    const content = getCurrentTemplate();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `letter-of-interest-${formData.companyName || 'template'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Letter downloaded!",
      description: "Your letter has been saved as a text file.",
    });
  };

  const tips = [
    "Research the company before applying - mention something specific you learned",
    "Keep your letter to one page when printed",
    "Use the same font and style as your CV for consistency",
    "Proofread carefully - ask someone else to check it too",
    "Address it to a specific person if possible (check company website)",
    "Show enthusiasm but remain professional in tone"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Letter of Interest Templates
          </h1>
          <p className="text-muted-foreground">
            Professional templates to help you write compelling job application letters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customization Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  Customize Your Letter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-select">Template Type</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(templates).map(([key, template]) => (
                      <Button
                        key={key}
                        variant={selectedTemplate === key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTemplate(key)}
                        className="justify-start text-left h-auto py-2"
                      >
                        <div>
                          <div className="font-medium">{template.title}</div>
                          <div className="text-xs opacity-70">{template.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="yourName">Your Name</Label>
                    <Input
                      id="yourName"
                      value={formData.yourName}
                      onChange={(e) => setFormData({...formData, yourName: e.target.value})}
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <Label htmlFor="yourEmail">Your Email</Label>
                    <Input
                      id="yourEmail"
                      type="email"
                      value={formData.yourEmail}
                      onChange={(e) => setFormData({...formData, yourEmail: e.target.value})}
                      placeholder="john@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      placeholder="ABC Company Ltd"
                    />
                  </div>

                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                      placeholder="Sales Assistant"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specificDetail">What impresses you about this company?</Label>
                    <Textarea
                      id="specificDetail"
                      value={formData.specificDetail}
                      onChange={(e) => setFormData({...formData, specificDetail: e.target.value})}
                      placeholder="their commitment to excellent customer service"
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Display */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle>{templates[selectedTemplate as keyof typeof templates].title}</CardTitle>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      <Star className="h-3 w-3 mr-1" />
                      Ready to Use
                    </Badge>
                  </div>
                  <div className="flex gap-2">
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
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/30 rounded-lg border border-muted/40 min-h-[600px]">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                    {getCurrentTemplate()}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-warning" />
                  Pro Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterTemplatePage;