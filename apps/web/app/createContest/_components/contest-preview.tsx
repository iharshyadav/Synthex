'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/components/ui/card';
import { format } from 'date-fns';
import { Trophy, Calendar, Tag } from 'lucide-react';
import { Badge } from '@components/components/ui/badge';

interface ContestPreviewProps {
  formData: any;
}

export function ContestPreview({ formData }: ContestPreviewProps) {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Preview</span>
          <Badge variant="outline" className="hover-scale">
            Draft
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold">{formData.title || 'Contest Title'}</h3>
          <p className="text-sm text-muted-foreground mt-2 break-words">
            {formData.description || 'Contest description will appear here'}
          </p>
        </div>

        {formData.categories?.length > 0 && (
          <div className="flex gap-2">
            {formData.categories.map((category: string) => (
              <Badge key={category} variant="secondary" className="hover-scale">
                <Tag className="h-3 w-3 mr-1" />
                {category}
              </Badge>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <div className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {formData.startDate ? format(formData.startDate, 'PPP') : 'Start Date'} -{' '}
              {formData.endDate ? format(formData.endDate, 'PPP') : 'End Date'}
            </span>
          </div>
        </div>

        {formData.prizes.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              Prizes
            </h4>
            <div className="space-y-2">
              {formData.prizes.map((prize: any, index: number) => (
                <div key={index} className="text-sm flex items-center justify-between p-2 rounded-md bg-muted/50">
                  <span className="font-medium">
                    {index + 1}
                    {index === 0
                      ? 'st'
                      : index === 1
                      ? 'nd'
                      : index === 2
                      ? 'rd'
                      : 'th'}{' '}
                    Place
                  </span>
                  <span className="text-primary">{prize.reward || 'TBD'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}