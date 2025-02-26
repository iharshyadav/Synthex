'use client';
import { FC } from 'react';
import { Card, CardHeader, CardContent } from '@components/components/ui/card';
import { Button } from '@components/components/ui/button';

interface ContestProps {}

const ContestPage: FC<ContestProps> = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Active Contests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contest Card */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Web Development Challenge</h2>
            <p className="text-sm text-gray-500">Ends in 2 days</p>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Build a responsive website using React and Tailwind CSS.</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Prize: $500</span>
              <Button>Join Contest</Button>
            </div>
          </CardContent>
        </Card>

        {/* You can add more contest cards here */}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Past Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="opacity-75">
            <CardHeader>
              <h2 className="text-xl font-semibold">AI Chat Interface</h2>
              <p className="text-sm text-gray-500">Ended</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Design an AI chat interface with modern UI components.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Winner announced</span>
                <Button variant="outline">View Results</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContestPage;