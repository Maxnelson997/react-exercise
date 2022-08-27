import { useEffect, useState, useRef, useCallback } from 'react';
import useFetchReps from './hooks/useFetchReps';
import './RepFeed.css';

const RepFeed = () => {
    const [nextState, setNextState] = useState('UT')
    const { reps, loading, error } = useFetchReps(nextState);

    const observer = useRef();
    const lastRepElemRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                // TODO: fetch reps for next state
                // TODO: pop from a states collection perhaps?
                console.log('last element reached');
                setNextState('AZ');
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, nextState]);

    return (
        <>
            <div className='layout'>
                <h2 className='layout-header'>Find your reps.</h2>
                <div className='layout-content'>
                    {
                        reps.map((rep, index) => {
                            return (
                                <div className='rep' ref={(index === reps.length - 1) ? lastRepElemRef : undefined}>
                                    <div>
                                        <span>Name:</span><span>{rep.name}</span>
                                    </div>
                                    <div>
                                        <span>State:</span><span>{rep.state}</span>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
                <h2 className='layout-footer'>
                    {error && 'Error'}
                    {loading && 'Loading'}
                </h2>

            </div>
        </>
    )
};

export default RepFeed;
