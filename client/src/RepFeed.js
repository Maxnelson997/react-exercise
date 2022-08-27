import { useState, useRef, useCallback } from 'react';
import { clsx } from 'clsx';
import useFetchReps from './hooks/useFetchReps';
import './RepFeed.css';

const RepFeed = () => {
    const [states, setStates] = useState(['UT', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'AK', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']);
    const { reps, loading, error } = useFetchReps(states[0]);

    const observer = useRef();
    const lastRepElemRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && states.length > 0) {
                let statesRemaining = [...states];
                statesRemaining.shift();
                setStates(statesRemaining);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, states]);

    return (
        <>
            <div className={clsx('layout', loading && 'layout-loading')}>
                <h2 className='layout-header'>Find your reps.</h2>
                <div className='layout-content'>
                    {
                        reps.map((rep, index) => {
                            return (
                                <div className='rep' ref={(index === reps.length - 1) ? lastRepElemRef : undefined} key={rep.name}>
                                    <div>
                                        <span>Name:</span><span>{rep.name}</span>
                                    </div>
                                    <div>
                                        <span>Party:</span><span>{rep.party}</span>
                                    </div>
                                    <div>
                                        <span>State:</span><span>{rep.state}</span>
                                    </div>
                                    <div>
                                        <span>District:</span><span>{rep.district}</span>
                                    </div>
                                    <div>
                                        <span>Phone:</span><span>{rep.phone}</span>
                                    </div>
                                    <div>
                                        <span>Office:</span><span><address>{rep.office}</address></span>
                                    </div>
                                    <div>
                                        <span>Link:</span><span><a href={rep.link} rel="noopener noreferrer" target="_blank">{rep.link}</a></span>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
                <h2 className='layout-footer'>
                    {error && 'Error'}
                    {states.length === 0 && 'All representatives fetched.'}
                </h2>

            </div>
        </>
    )
};

export default RepFeed;
