'use client';

import { useState, useEffect } from 'react';
import { Card } from '@components/components/ui/card';
import { Input } from '@components/components/ui/input';
import { Button } from '@components/components/ui/button';
import { Label } from '@components/components/ui/label';
import { Textarea } from '@components/components/ui/textarea';
import { Calendar } from '@components/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Minus, Upload, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@components/lib/utils';
import { FileUpload } from '@components/ui/file-upload';
import { useMutation } from '@tanstack/react-query';
import { createContest } from '../lib/createContestServerAction';

interface ContestFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const CATEGORIES = [
  'Algorithms',
  'Data Structures',
  'Dynamic Programming',
  'Machine Learning',
  'Web Development',
  'System Design',
];

export function ContestForm({ formData, setFormData }: ContestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 4;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title && currentStep == 1) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description && currentStep == 1) {
      newErrors.description = 'Description is required';
    }
    if (formData.categories.length === 0 && currentStep == 2) {
      newErrors.categories = 'Select at least one category';
    }
    if (!formData.prizes[0].reward && currentStep == 3) {
      newErrors.prizes = 'First place prize is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(Math.min(totalSteps, currentStep + 1));
      if(currentStep == totalSteps){
        mutation.mutate(formData);
      }
      toast.success(
        'Progress saved'
      );
    }
  };

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const response = await fetch('/api/createContest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: (data:any) => {
      toast.success('Contest created successfully!');
      console.log(data);
    },
    onError: (error: any) => {
      toast.error('Failed to create contest');
      console.error(error);
    }
  })

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex justify-between mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center',
              index < totalSteps - 1 && 'flex-1'
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors hover-scale cursor-pointer',
                currentStep > index + 1
                  ? 'bg-primary border-primary text-primary-foreground'
                  : currentStep === index + 1
                  ? 'border-primary text-primary'
                  : 'border-muted-foreground text-muted-foreground'
              )}
              onClick={() => setCurrentStep(index + 1)}
            >
              {currentStep > index + 1 ? (
                <Check className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  'h-1 flex-1 mx-2 rounded transition-colors',
                  currentStep > index + 1
                    ? 'bg-primary'
                    : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Basic Details */}
      <Card className={cn(
        "p-6 card-shadow transition-opacity duration-300",
        currentStep === 1 ? "opacity-100" : "opacity-0 hidden"
      )}>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center">
              Contest Title
              {errors.title && (
                <span className="text-destructive text-sm ml-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.title}
                </span>
              )}
            </Label>
            <Input
              id="title"
              name='title'
              placeholder="Enter contest title"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              className={cn(
                "hover-scale",
                errors.title && "border-destructive"
              )}
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.title.length}/100
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center">
              Description
              {errors.description && (
                <span className="text-destructive text-sm ml-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.description}
                </span>
              )}
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your contest"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              className={cn(
                "min-h-[100px] hover-scale",
                errors.description && "border-destructive"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center">
              Categories
              {errors.categories && (
                <span className="text-destructive text-sm ml-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.categories}
                </span>
              )}
            </Label>
            <Select
              value={formData.categories[0]}
              onValueChange={(value) => 
                updateFormData('categories', [value])
              }
            >
              <SelectTrigger className="hover-scale">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Dates and Times */}
      <Card className={cn(
        "p-6 card-shadow transition-opacity duration-300",
        currentStep === 2 ? "opacity-100" : "opacity-0 hidden"
      )}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal hover-scale',
                    !formData.startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? (
                    format(formData.startDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => date && updateFormData('startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal hover-scale',
                    !formData.endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? (
                    format(formData.endDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => date && updateFormData('endDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>

      {/* Prize Structure */}
      <Card className={cn(
        "p-6 card-shadow transition-opacity duration-300",
        currentStep === 3 ? "opacity-100" : "opacity-0 hidden"
      )}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          Prize Structure
          {errors.prizes && (
            <span className="text-destructive text-sm ml-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.prizes}
            </span>
          )}
        </h3>
        <div className="space-y-4">
          {formData.prizes.map((prize: any, index: number) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Position {prize.position}</Label>
                <Input
                  placeholder="Enter prize details"
                  value={prize.reward}
                  onChange={(e) => {
                    const newPrizes = [...formData.prizes];
                    newPrizes[index].reward = e.target.value;
                    updateFormData('prizes', newPrizes);
                  }}
                  className={cn(
                    "hover-scale",
                    index === 0 && errors.prizes && "border-destructive"
                  )}
                />
              </div>
              {index > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newPrizes = formData.prizes.filter((_:any, i:number) => i !== index);
                    updateFormData('prizes', newPrizes);
                  }}
                  className="hover-scale"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              const newPrizes = [
                ...formData.prizes,
                { position: formData.prizes.length + 1, reward: '' }
              ];
              updateFormData('prizes', newPrizes);
            }}
            className="w-full hover-scale"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Prize Position
          </Button>
        </div>
      </Card>

      {/* File Upload */}
      <Card className={cn(
        "p-6 card-shadow transition-opacity duration-300",
        currentStep === 4 ? "opacity-100" : "opacity-0 hidden"
      )}>
        {/* <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <h4 className="text-lg font-medium mb-2">Upload Contest Materials</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your files here, or click to browse
          </p>
          <Button variant="outline" className="hover-scale">
            Choose Files
          </Button>
        </div> */}
        <FileUpload />
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className="hover-scale"
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="hover-scale"
          variant={currentStep === totalSteps ? "default" : "outline"}
        >
          {currentStep === totalSteps ? 'Create Contest' : 'Next'}
        </Button>
      </div>
    </div>
  );
}