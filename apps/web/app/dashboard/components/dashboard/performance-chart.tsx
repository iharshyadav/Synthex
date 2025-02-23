'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@components/components/ui/card';

const data = [
  { date: '2024-03-01', score: 240 },
  { date: '2024-03-02', score: 300 },
  { date: '2024-03-03', score: 280 },
  { date: '2024-03-04', score: 350 },
  { date: '2024-03-05', score: 320 },
  { date: '2024-03-06', score: 380 },
  { date: '2024-03-07', score: 400 },
];

export function PerformanceChart() {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}