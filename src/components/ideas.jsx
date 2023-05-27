import { useState, useEffect } from 'react';

const Ideas = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch('http://localhost:5000/trips');
                const data = await response.json();
                setTrips(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);
    
    if (loading) return 'Loading...';
    if (error) return 'Error!';
    return (
        <div>
            <h1>Ideas</h1>
        </div>
    );
}

export default Ideas;

