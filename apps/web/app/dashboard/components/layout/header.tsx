'use client';

import { Bell, Moon, Sun, Plus, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@components/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@components/components/ui/avatar';
import { useClerk, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export function Header() {
  const { setTheme, theme } = useTheme();

  const { user } = useUser();
  const { signOut } = useClerk();

  const userData = useQuery(api.users.getUser, { userId: user?.id ?? "" });

  return (
    <header className="fixed top-0 right-0 left-[240px] dark:bg-[#09090B] bg-white z-50 nav-blur border-b">
      <div className="flex h-20 items-center px-8 gap-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative hover-scale">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="hover-scale"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button variant="default" className="gap-2 hover-scale">
            <Plus className="h-4 w-4" /> New Contest
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover-scale">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl} alt="User" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 card-shadow" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover-scale">
                <User className="mr-2 h-4 w-4" />
                <a href="/profile"><span>Profile</span></a>
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="hover-scale">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem> */}
              <DropdownMenuItem className="text-destructive hover-scale" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}