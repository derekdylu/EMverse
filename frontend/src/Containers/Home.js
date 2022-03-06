import { React, useRef, useState, useEffect } from 'react'
import Jar from '../Components/Jar'

import { EMOTIONS_COUNT } from '../graphql';
import { useQuery, useLazyQuery } from "@apollo/client";

const Home = () => {
    // const {loading, error, data} = useQuery(EMOTIONS_COUNT);
    const [getCounts, {loading, error, data}] = useLazyQuery(EMOTIONS_COUNT);

    useEffect(() => {
        getCounts();
    }, [])

    return (
        <div>
            {(loading) ? (<p>loading</p>) : (<Jar emotionsCount={data}/>)}
        </div>
    )
}

export default Home