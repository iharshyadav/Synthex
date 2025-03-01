'use client';

import { useState, useEffect } from 'react';
import { Button } from '@components/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ContestForm } from './_components/contestForms';
import { ContestPreview } from './_components/contest-preview';
import { Providers } from 'app/dashboard/themeProviders';
import NavigationHeader from '@components/NavigationHeader';

const AUTOSAVE_DELAY = 1000;

export default function CreateContest() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    participantLimit: 100,
    categories: [],
    rules: [],
    prizes: [{ position: 1, reward: '' }],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('contestDraft', JSON.stringify(formData));
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    const savedDraft = localStorage.getItem('contestDraft');
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      parsedDraft.startDate = new Date(parsedDraft.startDate);
      parsedDraft.endDate = new Date(parsedDraft.endDate);
      setFormData(parsedDraft);
    }
  }, []);

  return (
    <>
    <NavigationHeader />
    <Providers>
      <div className="min-h-screen bg-background mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section with Advanced Animation */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-12 space-y-4 md:space-y-0 bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <Button
          variant="ghost"
          className="hover:scale-105 transition-all duration-300 mr-4 group flex items-center backdrop-blur-sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-[-4px] transition-transform duration-300" />
          Back to Dashboard
        </Button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent animate-gradient">
          Create New Contest
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center animate-fade-in">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-ping"></span>
          Set up your coding challenge and inspire developers worldwide
          </p>
        </div>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
        {/* Enhanced Form Section */}
        <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
          <ContestForm formData={formData} setFormData={setFormData} />
        </div>

        {/* Enhanced Preview Section */}
        <div className="space-y-6">
          <div className="sticky lg:top-8">
          <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-left">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Live Preview
            </h2>
            <ContestPreview formData={formData} />
          </div>
          
          {/* Enhanced Auto-save Indicator */}
          <div className="mt-4 bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center space-x-2 group">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary group-hover:border-secondary transition-colors"></div>
            <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
              Auto-saving... Last updated at {new Date().toLocaleTimeString()}
            </div>
            </div>
          </div>

          {/* Enhanced Quick Tips */}
          <div className="mt-4 bg-card p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Quick Tips
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
            {['Set clear and specific contest objectives', 'Define comprehensive rules and guidelines', 'Ensure prize distribution is fair', 'Consider time zones for participants']
              .map((tip, index) => (
              <li key={index} className="flex items-center space-x-2 hover:translate-x-2 transition-transform duration-300">
                <span className="text-primary">•</span>
                <span className="hover:text-primary transition-colors">{tip}</span>
              </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </Providers>
    </>
  );
}