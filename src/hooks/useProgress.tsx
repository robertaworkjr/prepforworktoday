import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface ProgressEntry {
  id: string;
  quiz_category: string;
  score: number;
  total_questions: number;
  completed_at: string;
}

export interface ActivityEntry {
  id: string;
  activity_type: string;
  activity_id: string;
  completed_at: string;
}

export interface UserSettings {
  id: string;
  daily_goal: number;
  notifications_enabled: boolean;
}

export function useProgress() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch user progress
  const fetchProgress = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user activities
  const fetchActivities = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  // Fetch user settings
  const fetchSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  // Save quiz progress
  const saveQuizProgress = async (category: string, score: number, totalQuestions: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .insert({
          user_id: user.id,
          quiz_category: category,
          score,
          total_questions: totalQuestions
        });

      if (error) throw error;
      
      await fetchProgress();
      toast({
        title: "Progress saved!",
        description: `Your ${category} quiz score has been recorded.`
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Error",
        description: "Failed to save progress.",
        variant: "destructive"
      });
    }
  };

  // Mark activity as completed
  const markActivityCompleted = async (activityType: string, activityId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_activities')
        .upsert({
          user_id: user.id,
          activity_type: activityType,
          activity_id: activityId
        }, {
          onConflict: 'user_id,activity_type,activity_id'
        });

      if (error) throw error;
      await fetchActivities();
    } catch (error) {
      console.error('Error marking activity completed:', error);
    }
  };

  // Update user settings
  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          ...newSettings
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      await fetchSettings();
      toast({
        title: "Settings updated!",
        description: "Your preferences have been saved."
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchProgress();
      fetchActivities();
      fetchSettings();
    }
  }, [user]);

  return {
    progress,
    activities,
    settings,
    loading,
    saveQuizProgress,
    markActivityCompleted,
    updateSettings,
    refreshData: () => {
      fetchProgress();
      fetchActivities();
      fetchSettings();
    }
  };
}