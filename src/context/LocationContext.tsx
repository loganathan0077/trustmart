import React, { createContext, useContext, useState, useEffect } from 'react';
import { locations } from '@/data/mockData';

interface LocationContextType {
    location: string;
    setLocation: (location: string) => void;
    isLoading: boolean;
    error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<string>('All Locations');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if location is already set in session/local storage to avoid repeated prompts?
        // For now, let's try to fetch on mount if not set.

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Mock reverse geocoding
                // In a real app, we'd call an API with position.coords.latitude, position.coords.longitude
                // For this demo, let's pick "Mumbai, Maharashtra" if we successfully get permission,
                // or maybe simulate based on some logic. Let's just default to a major city for demo.

                // Simulating API delay
                setTimeout(() => {
                    setLocation('Mumbai, Maharashtra');
                    setIsLoading(false);
                }, 1000);
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError('Unable to retrieve your location');
                setIsLoading(false);
                // Fallback is 'All Locations' which is already initial state
            }
        );
    }, []);

    return (
        <LocationContext.Provider value={{ location, setLocation, isLoading, error }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocationContext must be used within a LocationProvider');
    }
    return context;
};
