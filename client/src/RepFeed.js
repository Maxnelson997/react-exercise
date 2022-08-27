import useFetchReps from './hooks/useFetchReps';
import './RepFeed.css';

const RepFeed = () => {

    // const reps = [
    //     {
    //         name: 'John-117',
    //         state: 'Earth'
    //     },
    //     {
    //         name: 'Cortana',
    //         state: 'Earth'
    //     }
    // ]

    const { reps } = useFetchReps('UT');

    return (
        <>
            <div className='layout'>
                <div className='layout-header'>Find your reps.</div>
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

            </div>
        </>
    )
};

export default RepFeed;
