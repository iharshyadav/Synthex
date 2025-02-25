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

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('contestDraft', JSON.stringify(formData));
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on mount
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
    <div className="min-h-screen bg-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            className="hover-scale mr-4"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
              Create New Contest
            </h1>
            <p className="text-muted-foreground mt-2">
              Set up your coding challenge and inspire developers worldwide
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          <ContestForm formData={formData} setFormData={setFormData} />
          <div className="lg:sticky lg:top-8 space-y-6 h-fit">
            <ContestPreview formData={formData} />
            <div className="text-xs text-muted-foreground text-center">
              Draft auto-saved {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Providers>
    </>
  );
}