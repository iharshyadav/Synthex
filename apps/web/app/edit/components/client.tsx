import React from 'react';
import Avatar from 'react-avatar';

interface ClientProps {
    username: string;
}

const Client = ({ username }: ClientProps) => {
    return (
        <div className="flex flex-col items-center client">
            <Avatar name={username} size="50" round="14px" />
            <span className="mt-2.5 font-bold">{username}</span>
        </div>
    );
};

export default Client;