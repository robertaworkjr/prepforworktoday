import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FlipCardPractice from "./pages/FlipCardPractice";
import QuizPractice from "./pages/QuizPractice";
import EmailTemplatesPage from "./pages/EmailTemplatesPage";
import InterviewChecklistPage from "./pages/InterviewChecklistPage";
import LetterTemplatePage from "./pages/LetterTemplatePage";
import CVTemplatePage from "./pages/CVTemplatePage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/practice/cards" element={<FlipCardPractice />} />
            <Route path="/practice/quiz" element={<QuizPractice />} />
            <Route path="/email-templates" element={<EmailTemplatesPage />} />
            <Route path="/interview-checklist" element={<InterviewChecklistPage />} />
            <Route path="/letter-template" element={<LetterTemplatePage />} />
            <Route path="/cv-template" element={<CVTemplatePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;