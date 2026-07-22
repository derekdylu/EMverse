import { React, useEffect } from 'react'
import Jar from '../Components/Jar'

import { EMOTIONS_COUNT } from '../graphql';
import { useLazyQuery } from "@apollo/client";

const Home = () => {
    // const {loading, error, data} = useQuery(EMOTIONS_COUNT);
    const [getCounts, { loading, error, data }] = useLazyQuery(EMOTIONS_COUNT);

    useEffect(() => {
        getCounts();
    }, [])

    return (
        <>
            {error ? (
                <div role="alert">
                    <p>Unable to load emotions.</p>
                    <button onClick={() => getCounts()}>retry</button>
                </div>
            ) : loading || !data ? (
                <div>
                    <p>loading</p>
                </div>
            ) : (
                <div>
                    <Jar emotionsCount={data} />
                </div>
            )}
        </>
    )
}

export default Home
