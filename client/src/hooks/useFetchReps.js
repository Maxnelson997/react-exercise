import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchReps = (stateAbbreviation) => {
    const [reps, setReps] = useState([]);
    // TODO: laoding, error states

    useEffect(() => {
        if(stateAbbreviation !== undefined) {
            // TODO: set loading true
            axios({
                method: 'GET',
                url: `/representatives/${stateAbbreviation}`
            }).then(res => {
                setReps(prevReps => {
                    return [...prevReps, ...res.data.results];
                });
                // TODO: set loading false 
            }).catch(e => {
                // TODO: set error
            });
        }
    }, [stateAbbreviation]);

    // TODO: return loading + error.
    return { reps };
}

export default useFetchReps;