import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, User, Edit3, Download, ArrowLeft, Star, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const CVTemplatePage = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Form data for customization
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    personalStatement: 'Motivated and reliable individual seeking an entry-level position to begin my career. I bring a positive attitude, strong work ethic, and eagerness to learn new skills.',
    skills: [
      'Reliable and punctual',
      'Good communication skills',
      'Quick learner',
      'Team player'
    ],
    experiences: [
      {
        title: '',
        company: '',
        dates: '',
        responsibilities: ['']
      }
    ],
    education: [
      {
        school: '',
        years: '',
        qualifications: ['']
      }
    ],
    additionalInfo: [
      'Available for full-time/part-time work',
      'Flexible with working hours including weekends'
    ]
  });

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  const removeSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, {
        title: '',
        company: '',
        dates: '',
        responsibilities: ['']
      }]
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };
    setFormData({
      ...formData,
      experiences: newExperiences
    });
  };

  const generateCV = () => {
    let cv = `${formData.fullName.toUpperCase()}\n`;
    cv += `${formData.address}\n`;
    cv += `${formData.phone} | ${formData.email}\n\n`;

    cv += `PERSONAL STATEMENT\n`;
    cv += `${formData.personalStatement}\n\n`;

    cv += `SKILLS\n`;
    formData.skills.filter(skill => skill.trim()).forEach(skill => {
      cv += `• ${skill}\n`;
    });
    cv += `\n`;

    if (formData.experiences.some(exp => exp.title || exp.company)) {
      cv += `EXPERIENCE & RESPONSIBILITIES\n\n`;
      formData.experiences.forEach(exp => {
        if (exp.title || exp.company) {
          cv += `${exp.title} - ${exp.company} | ${exp.dates}\n`;
          exp.responsibilities.filter(resp => resp.trim()).forEach(resp => {
            cv += `• ${resp}\n`;
          });
          cv += `\n`;
        }
      });
    }

    if (formData.education.some(edu => edu.school)) {
      cv += `EDUCATION\n`;
      formData.education.forEach(edu => {
        if (edu.school) {
          cv += `${edu.school} | ${edu.years}\n`;
          edu.qualifications.filter(qual => qual.trim()).forEach(qual => {
            cv += `• ${qual}\n`;
          });
          cv += `\n`;
        }
      });
    }

    cv += `ADDITIONAL INFORMATION\n`;
    formData.additionalInfo.filter(info => info.trim()).forEach(info => {
      cv += `• ${info}\n`;
    });
    cv += `\nREFERENCES\nAvailable upon request`;

    return cv;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateCV());
      setCopied(true);
      toast({
        title: "CV copied!",
        description: "Your customized CV has been copied to clipboard.",
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
    const content = generateCV();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv-${formData.fullName.replace(/\s+/g, '-').toLowerCase() || 'template'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "CV downloaded!",
      description: "Your CV has been saved as a text file.",
    });
  };

  const experienceExamples = [
    "Cared for younger siblings while parents worked - developed responsibility and time management",
    "Completed paper round for 6 months - showed reliability and punctuality",
    "Volunteered at local charity shop - gained customer service experience",
    "Helped organize school events - demonstrated teamwork and planning skills",
    "Managed household budget and shopping - showed responsibility and math skills"
  ];

  const skillSuggestions = [
    "Computer skills (Microsoft Office, social media)",
    "Driving license",
    "First aid certification",
    "Foreign language skills",
    "Problem-solving abilities",
    "Customer service experience",
    "Money handling experience",
    "Leadership experience",
    "Organizational skills",
    "Time management"
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
            <User className="h-8 w-8 text-primary" />
            CV Builder
          </h1>
          <p className="text-muted-foreground">
            Create your professional CV step by step - perfect for entry-level positions
          </p>
        </div>

        {/* Hero Image */}
        <div className="text-center mb-8">
          <img 
            src="/images/buildcvPFWT.png" 
            alt="CV building illustration" 
            className="w-32 h-32 mx-auto rounded-lg shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="additional">Extra</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="123 Main Street, City, Postcode"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="07123 456789"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personalStatement">Personal Statement</Label>
                      <Textarea
                        id="personalStatement"
                        value={formData.personalStatement}
                        onChange={(e) => setFormData({...formData, personalStatement: e.target.value})}
                        rows={4}
                        placeholder="Write a brief statement about yourself and your goals..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Skills & Abilities</CardTitle>
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Skill
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={skill}
                          onChange={(e) => updateSkill(index, e.target.value)}
                          placeholder="Enter a skill..."
                        />
                        <Button 
                          onClick={() => removeSkill(index)} 
                          size="sm" 
                          variant="outline"
                          disabled={formData.skills.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="mt-4">
                      <Label className="text-sm font-medium">Skill Suggestions:</Label>
                      <div className="grid grid-cols-1 gap-1 mt-2">
                        {skillSuggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="justify-start text-xs h-auto py-1"
                            onClick={() => {
                              if (!formData.skills.includes(suggestion)) {
                                setFormData({
                                  ...formData,
                                  skills: [...formData.skills, suggestion]
                                });
                              }
                            }}
                          >
                            + {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Experience & Responsibilities</CardTitle>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {formData.experiences.map((exp, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Job Title/Role</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => updateExperience(index, 'title', e.target.value)}
                              placeholder="e.g., Babysitter, Volunteer"
                            />
                          </div>
                          <div>
                            <Label>Company/Place</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              placeholder="e.g., Local Family, Charity Shop"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Dates</Label>
                          <Input
                            value={exp.dates}
                            onChange={(e) => updateExperience(index, 'dates', e.target.value)}
                            placeholder="e.g., 2023-2024, Summer 2023"
                          />
                        </div>
                      </div>
                    ))}

                    <div className="mt-4">
                      <Label className="text-sm font-medium">Experience Ideas:</Label>
                      <div className="grid grid-cols-1 gap-1 mt-2">
                        {experienceExamples.map((example, index) => (
                          <div key={index} className="text-xs text-muted-foreground p-2 bg-muted/20 rounded">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="additional" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Availability & Other Details</Label>
                      <Textarea
                        value={formData.additionalInfo.join('\n')}
                        onChange={(e) => setFormData({
                          ...formData,
                          additionalInfo: e.target.value.split('\n').filter(info => info.trim())
                        })}
                        rows={6}
                        placeholder="• Available for full-time/part-time work
• Flexible with working hours including weekends
• Own transport available
• First aid certificate
• Hobbies: Reading, football (shows dedication)"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* CV Preview */}
          <div className="lg:sticky lg:top-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle>Your CV Preview</CardTitle>
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      <Star className="h-3 w-3 mr-1" />
                      Live Preview
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
                <div className="p-4 bg-muted/30 rounded-lg border border-muted/40 min-h-[600px] max-h-[800px] overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                    {generateCV()}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-warning" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>• Keep it to 1-2 pages maximum</p>
                  <p>• Use action words (managed, organized, helped)</p>
                  <p>• Include any volunteer work or responsibilities</p>
                  <p>• Proofread for spelling and grammar</p>
                  <p>• Tailor for each job application</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVTemplatePage;