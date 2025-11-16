
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
            <Button onClick={() => navigate('/')} className="mt-8">
                Go to Home
            </Button>
        </div>
    );
};

export default NotFound;
