"use client"
import Loader from "@components/loader";
import { useEffect, useState } from "react";

export default function LoaderWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        const lastVisitTime = localStorage.getItem('lastVisitTime');
        const currentTime = new Date().getTime();
        
        // Show loader if never visited or last visit was more than 24 hours ago
        if (!hasVisited || (lastVisitTime && currentTime - parseInt(lastVisitTime) > 60 * 60 * 1000)) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                localStorage.setItem('hasVisited', 'true');
                localStorage.setItem('lastVisitTime', currentTime.toString());
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (loading) return <Loader />;
    return <>{children}</>;
}
