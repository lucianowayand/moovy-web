import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height }
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }

    useEffect(() => {
        handleResize()
    }, []);

    return windowDimensions;
}