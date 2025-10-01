import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Check, Plus, Briefcase } from 'lucide-react';

interface JobSite {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

const jobSites: JobSite[] = [
  {
    id: 'indeed',
    name: 'Indeed',
    url: 'https://indeed.com',
    description: 'World\'s largest job search engine with millions of listings',
    category: 'General'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Jobs',
    url: 'https://linkedin.com/jobs',
    description: 'Professional network with quality job opportunities',
    category: 'Professional'
  },
  {
    id: 'glassdoor',
    name: 'Glassdoor',
    url: 'https://glassdoor.com',
    description: 'Jobs with company reviews and salary insights',
    category: 'Research'
  },
  {
    id: 'ziprecruiter',
    name: 'ZipRecruiter',
    url: 'https://ziprecruiter.com',
    description: 'Quick apply to multiple jobs with one click',
    category: 'Quick Apply'
  },
  {
    id: 'monster',
    name: 'Monster',
    url: 'https://monster.com',
    description: 'Established job board with career advice and tools',
    category: 'Career Tools'
  }
];

interface JobSitesProps {
  className?: string;
}

export const JobSites = ({ className = "" }: JobSitesProps) => {
  const [joinedSites, setJoinedSites] = useState<Set<string>>(new Set());

  const handleToggleJoined = (siteId: string) => {
    const newJoinedSites = new Set(joinedSites);
    if (newJoinedSites.has(siteId)) {
      newJoinedSites.delete(siteId);
    } else {
      newJoinedSites.add(siteId);
    }
    setJoinedSites(newJoinedSites);
  };

  const joinedCount = joinedSites.size;
  const totalSites = jobSites.length;

  return (
    <Card className={`p-6 bg-gradient-card border-calm/30 shadow-soft ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Job Search Platforms</h3>
              <p className="text-sm text-muted-foreground">
                Join these platforms to maximize your job opportunities
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{joinedCount}/{totalSites}</div>
            <div className="text-sm text-muted-foreground">joined</div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="text-center">
          <img 
            src="/images/findjobs.png" 
            alt="Job search platforms illustration" 
            className="w-32 h-32 mx-auto rounded-lg shadow-md"
          />
        </div>

        {/* Progress Message */}
        {joinedCount > 0 && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-success font-medium">
              {joinedCount === totalSites 
                ? "🎉 Excellent! You're on all major job platforms!" 
                : `Great start! ${totalSites - joinedCount} more platform${totalSites - joinedCount > 1 ? 's' : ''} to go.`
              }
            </p>
          </div>
        )}

        {/* Job Sites List */}
        <div className="space-y-3">
          {jobSites.map((site) => {
            const isJoined = joinedSites.has(site.id);
            
            return (
              <div 
                key={site.id}
                className={`p-4 rounded-lg border transition-all ${
                  isJoined 
                    ? 'bg-success/5 border-success/30' 
                    : 'bg-muted/20 border-muted/30 hover:border-primary/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{site.name}</h4>
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {site.category}
                      </Badge>
                      {isJoined && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-success/20 text-success border-success/30"
                        >
                          Joined
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{site.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10"
                    >
                      <a 
                        href={site.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Visit
                      </a>
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => handleToggleJoined(site.id)}
                      className={
                        isJoined
                          ? "bg-success hover:bg-success/90 text-success-foreground"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }
                    >
                      {isJoined ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Joined
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3 mr-1" />
                          Mark Joined
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Encouragement */}
        {joinedCount === 0 && (
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Having profiles on multiple job sites increases your chances of finding the perfect opportunity!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};