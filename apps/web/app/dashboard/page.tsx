'use client';

import {
  Trophy,
  Target,
  BrainCircuit,
  Medal,
  Flame,
  Users,
} from 'lucide-react';
import { Sidebar } from './components/layout/sidebar';
import { Header } from './components/layout/header';
import { StatsCard } from './components/dashboard/stats-card';
import { PerformanceChart } from './components/dashboard/performance-chart';
import useMounted from 'hooks/useMounted';

export default function Home() {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-[240px]">
        <Header />
        <main className="flex-1 overflow-auto pt-16">
          <div className="container mx-auto p-8">
            <h1 className="mb-8">Welcome back, Harsh!</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <StatsCard
                title="Total Contests"
                value="48"
                icon={<Trophy className="h-4 w-4 text-primary" />}
                description="Participated in 3 contests this week"
              />
              <StatsCard
                title="Win Rate"
                value="67%"
                icon={<Target className="h-4 w-4 text-secondary" />}
                description="Up 5% from last month"
              />
              <StatsCard
                title="Problems Solved"
                value="156"
                icon={<BrainCircuit className="h-4 w-4 text-primary" />}
                description="12 problems this week"
              />
              <StatsCard
                title="Current Rank"
                value="#234"
                icon={<Medal className="h-4 w-4 text-secondary" />}
                description="Top 5% of all users"
              />
              <StatsCard
                title="Weekly Streak"
                value="12 days"
                icon={<Flame className="h-4 w-4 text-primary" />}
                description="Personal best streak!"
              />
              <StatsCard
                title="Following"
                value="89"
                icon={<Users className="h-4 w-4 text-secondary" />}
                description="4 new followers this week"
              />
            </div>
            <div className="mt-8">
              <PerformanceChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}