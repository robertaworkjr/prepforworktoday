import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { Home, BookOpen, Brain, User } from 'lucide-react';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'signin');
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in."
      });
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { error } = await signUp(email, password);
    
    if (error) {
      if (error.message.includes('already registered')) {
        toast({
          title: "Account exists",
          description: "An account with this email already exists. Please sign in instead.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account."
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
        <div className="text-center max-w-md space-y-8">
          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              Your Path to{" "}
              <span className="text-[#3B82F6]">
                Interview<br />
                Confidence
              </span>
            </h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Build skills and confidence for your next job interview with interactive flashcards, quizzes, and progress tracking.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mt-8">
            <img 
              src="/images/AppImagePFWT1.jpg" 
              alt="Interview preparation platform" 
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full h-14 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-lg font-medium rounded-2xl shadow-lg"
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full h-12 text-[#3B82F6] hover:bg-[#3B82F6]/10 text-lg font-medium"
                  onClick={() => setActiveTab('signin')}
                >
                  Log In
                </Button>
                
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full h-12 text-muted-foreground hover:bg-muted/50 text-lg font-medium"
                  >
                    Continue as Guest
                  </Button>
                </Link>
              </div>

              {/* Forms appear when buttons are clicked */}
              <TabsContent value="signin" className="mt-6">
                <div className="bg-background/80 backdrop-blur p-6 rounded-2xl border shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Welcome Back! 🌟</h3>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing In...' : 'Continue Your Journey 🎯'}
                    </Button>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-6">
                <div className="bg-background/80 backdrop-blur p-6 rounded-2xl border shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Start Your Success Story! ✨</h3>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password (min. 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Your Future...' : 'Create Account 🌟'}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-background border-t border-border px-6 py-4">
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          <Link to="/dashboard" className="flex flex-col items-center space-y-1 group">
            <div className="p-2 rounded-lg group-hover:bg-[#3B82F6]/10 transition-colors">
              <Home className="h-6 w-6 text-[#3B82F6]" />
            </div>
            <span className="text-xs font-medium text-[#3B82F6]">Dashboard</span>
          </Link>
          
          <Link to="/practice/cards" className="flex flex-col items-center space-y-1 group">
            <div className="p-2 rounded-lg group-hover:bg-muted transition-colors">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Flip Cards</span>
          </Link>
          
          <Link to="/practice/quiz" className="flex flex-col items-center space-y-1 group">
            <div className="p-2 rounded-lg group-hover:bg-muted transition-colors">
              <Brain className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Quizzes</span>
          </Link>
          
          <Link to="/cv-template" className="flex flex-col items-center space-y-1 group">
            <div className="p-2 rounded-lg group-hover:bg-muted transition-colors">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">CV</span>
          </Link>
        </div>
      </div>
    </div>
  );
}