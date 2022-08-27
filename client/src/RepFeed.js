import useFetchReps from './hooks/useFetchReps';
import './RepFeed.css';

const RepFeed = () => {
    const { reps, loading, error } = useFetchReps('UT');

    return (
        <>
            <div className='layout'>
                <h2 className='layout-header'>Find your reps.</h2>
                <div className='layout-content'>
                    {
                        reps.map(rep => {
                            return (
                                <div className='rep'>
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
