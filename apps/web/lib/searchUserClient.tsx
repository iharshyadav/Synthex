"use client"
import { useQuery } from '@tanstack/react-query';

export function useGetUserById(userId: string | undefined, options: { enabled?: boolean } = {}) {
    const { enabled = true } = options;
    if(userId == undefined) return;
    
    return useQuery({
        queryKey: ['getUserById', userId],
        queryFn: async () => {
            if (!userId.trim()) return { user: null };
            
            const response = await fetch(`/api/searchUser?id=${encodeURIComponent(userId)}`);
            
            if (!response.ok) {
                throw new Error('Failed to find user by ID');
            }
            console.log(await response.json());
            
            return await response.json();
        },
        enabled: enabled && userId.trim().length > 0,
    });
}