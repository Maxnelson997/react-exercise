import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchReps = (stateAbbreviation) => {
    const [reps, setReps] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(stateAbbreviation !== undefined) {
            setLoading(true);
            setError(false);
            axios({
                method: 'GET',
                url: `/representatives/${stateAbbreviation}`,
            }).then(res => {
                setReps(prevReps => {
                    return [...new Set([...prevReps, ...res.data.results])];
                });
                setLoading(false);
            }).catch(e => {
                setError(true);
            });
        }
    }, [stateAbbreviation]);

    return { reps, loading, error };
}

export default useFetchReps;