'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@components/components/ui/button';
import { Input } from '@components/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/components/ui/dropdown-menu';
import { Badge } from '@components/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@components/components/ui/avatar';
import { format } from 'date-fns';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  Users,
  Trophy,
  Tag,
  Star,
  StarOff,
  Share2,
  Download,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  HourglassIcon,
} from 'lucide-react';
import { cn } from '@components/lib/utils';

// Mock data for contests
const MOCK_CONTESTS = [
  {
    id: '1',
    title: 'Advanced Algorithm Challenge',
    description: 'Solve complex algorithmic problems in limited time',
    startDate: new Date('2025-04-15T10:00:00'),
    endDate: new Date('2025-04-15T14:00:00'),
    status: 'upcoming',
    type: 'knockout',
    participantLimit: 100,
    currentParticipants: 68,
    entryFee: 0,
    prizes: [
      { position: 1, reward: '$500' },
      { position: 2, reward: '$250' },
      { position: 3, reward: '$100' },
    ],
    categories: ['Algorithms', 'Data Structures'],
    organizer: {
      name: 'CodeArena Team',
      avatar: 'https://github.com/shadcn.png',
    },
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Web Development Hackathon',
    description: 'Build a complete web application in 48 hours',
    startDate: new Date('2025-03-10T09:00:00'),
    endDate: new Date('2025-03-12T09:00:00'),
    status: 'active',
    type: 'tournament',
    participantLimit: 50,
    currentParticipants: 50,
    entryFee: 10,
    prizes: [
      { position: 1, reward: '$1000' },
      { position: 2, reward: '$500' },
      { position: 3, reward: '$250' },
    ],
    categories: ['Web Development', 'UI/UX'],
    organizer: {
      name: 'TechStartup Inc.',
      avatar: 'https://github.com/shadcn.png',
    },
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Machine Learning Competition',
    description: 'Create the most accurate prediction model',
    startDate: new Date('2025-02-01T00:00:00'),
    endDate: new Date('2025-02-28T23:59:59'),
    status: 'completed',
    type: 'league',
    participantLimit: 200,
    currentParticipants: 187,
    entryFee: 0,
    prizes: [
      { position: 1, reward: '$2000' },
      { position: 2, reward: '$1000' },
      { position: 3, reward: '$500' },
    ],
    categories: ['Machine Learning', 'Data Science'],
    organizer: {
      name: 'AI Research Group',
      avatar: 'https://github.com/shadcn.png',
    },
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Mobile App Challenge',
    description: 'Develop an innovative mobile application',
    startDate: new Date('2025-03-01T00:00:00'),
    endDate: new Date('2025-03-31T23:59:59'),
    status: 'active',
    type: 'league',
    participantLimit: 75,
    currentParticipants: 62,
    entryFee: 5,
    prizes: [
      { position: 1, reward: '$1500' },
      { position: 2, reward: '$750' },
      { position: 3, reward: '$300' },
    ],
    categories: ['Mobile Development', 'UI/UX'],
    organizer: {
      name: 'AppDev Community',
      avatar: 'https://github.com/shadcn.png',
    },
    isFavorite: true,
  },
  {
    id: '5',
    title: 'System Design Challenge',
    description: 'Design scalable and efficient system architectures',
    startDate: new Date('2025-01-15T00:00:00'),
    endDate: new Date('2025-01-20T23:59:59'),
    status: 'completed',
    type: 'knockout',
    participantLimit: 50,
    currentParticipants: 48,
    entryFee: 0,
    prizes: [
      { position: 1, reward: '$800' },
      { position: 2, reward: '$400' },
      { position: 3, reward: '$200' },
    ],
    categories: ['System Design', 'Architecture'],
    organizer: {
      name: 'Enterprise Solutions',
      avatar: 'https://github.com/shadcn.png',
    },
    isFavorite: false,
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={
        status === 'active'
          ? 'default'
          : status === 'upcoming'
          ? 'secondary'
          : 'outline'
      }
      className={cn(
        'hover-scale',
        status === 'active' && 'bg-green-500',
        status === 'upcoming' && 'bg-blue-500',
        status === 'completed' && 'bg-gray-500'
      )}
    >
      {status === 'active' && <CheckCircle2 className="h-3 w-3 mr-1" />}
      {status === 'upcoming' && <HourglassIcon className="h-3 w-3 mr-1" />}
      {status === 'completed' && <Clock className="h-3 w-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

// Contest card component
function ContestCard({ contest, onToggleFavorite }: { contest: any; onToggleFavorite: (id: string) => void }) {
  return (
    <Card className="hover-scale card-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{contest.title}</CardTitle>
            <CardDescription className="mt-2">
              {contest.description}
            </CardDescription>
          </div>
          <StatusBadge status={contest.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {format(contest.startDate, 'PPP')} - {format(contest.endDate, 'PPP')}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {contest.currentParticipants} / {contest.participantLimit} participants
            </span>
            {contest.currentParticipants >= contest.participantLimit && (
              <Badge variant="outline" className="ml-2">Full</Badge>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {contest.categories.map((category: string) => (
              <Badge key={category} variant="secondary" className="hover-scale">
                <Tag className="h-3 w-3 mr-1" />
                {category}
              </Badge>
            ))}
            <Badge variant="outline" className="hover-scale">
              {contest.type.charAt(0).toUpperCase() + contest.type.slice(1)}
            </Badge>
            {contest.entryFee > 0 && (
              <Badge variant="outline" className="hover-scale">
                ${contest.entryFee} Entry
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={contest.organizer.avatar} alt={contest.organizer.name} />
              <AvatarFallback>{contest.organizer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{contest.organizer.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(contest.id)}
            className="hover-scale"
          >
            {contest.isFavorite ? (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="hover-scale">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover-scale">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          {contest.status === 'upcoming' && (
            <Button className="hover-scale">Register</Button>
          )}
          {contest.status === 'active' && (
            <Button className="hover-scale">Enter Contest</Button>
          )}
          {contest.status === 'completed' && (
            <Button variant="outline" className="hover-scale">View Results</Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover-scale">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="hover-scale">
                <Edit className="h-4 w-4 mr-2" />
                Edit Contest
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive hover-scale">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Contest
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function ContestsPage() {
  const [contests, setContests] = useState(MOCK_CONTESTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Toggle favorite status
  const handleToggleFavorite = (id: string) => {
    setContests(
      contests.map((contest) =>
        contest.id === id
          ? { ...contest, isFavorite: !contest.isFavorite }
          : contest
      )
    );
  };
  
  // Filter contests based on search, status, and type
  const filteredContests = contests.filter((contest) => {
    const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contest.status === statusFilter;
    const matchesType = typeFilter === 'all' || contest.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Sort contests
  const sortedContests = [...filteredContests].sort((a, b) => {
    if (sortBy === 'date') {
      return a.startDate.getTime() - b.startDate.getTime();
    } else if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'participants') {
      return b.currentParticipants - a.currentParticipants;
    }
    return 0;
  });
  
  // Group contests by status for tabs
  const activeContests = sortedContests.filter((contest) => contest.status === 'active');
  const upcomingContests = sortedContests.filter((contest) => contest.status === 'upcoming');
  const completedContests = sortedContests.filter((contest) => contest.status === 'completed');
  const favoriteContests = sortedContests.filter((contest) => contest.isFavorite);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
              Contest Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Create, manage, and participate in coding competitions
            </p>
          </div>
          
          <Link href="/contests/create">
            <Button className="hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Create New Contest
            </Button>
          </Link>
        </div>
        
        {/* Search and filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contests..."
                className="pl-10 hover-scale"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="hover-scale">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="hover-scale">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="knockout">Knockout</SelectItem>
                <SelectItem value="league">League</SelectItem>
                <SelectItem value="tournament">Tournament</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Sort options */}
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hover-scale">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy('date')} className="hover-scale">
                Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('name')} className="hover-scale">
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('participants')} className="hover-scale">
                Participants
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Contest tabs and listings */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All ({sortedContests.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeContests.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingContests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedContests.length})</TabsTrigger>
            <TabsTrigger value="favorites">Favorites ({favoriteContests.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {sortedContests.length > 0 ? (
              sortedContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No contests found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4">
            {activeContests.length > 0 ? (
              activeContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No active contests</h3>
                <p className="text-muted-foreground mt-2">
                  Check back later or create a new contest
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingContests.length > 0 ? (
              upcomingContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No upcoming contests</h3>
                <p className="text-muted-foreground mt-2">
                  Be the first to create a new contest
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedContests.length > 0 ? (
              completedContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No completed contests</h3>
                <p className="text-muted-foreground mt-2">
                  Completed contests will appear here
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="favorites" className="space-y-4">
            {favoriteContests.length > 0 ? (
              favoriteContests.map((contest) => (
                <ContestCard
                  key={contest.id}
                  contest={contest}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No favorite contests</h3>
                <p className="text-muted-foreground mt-2">
                  Star contests to add them to your favorites
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}