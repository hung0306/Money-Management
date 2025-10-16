import { useState, useEffect } from 'react';

const useCounter = (end, duration = 5000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const incrementTime = 20;
        const steps = Math.ceil(duration / incrementTime);
        const stepValue = end / steps;

        const counter = setInterval(() => {
            start += stepValue;
            if (start >= end) {
                start = end;
                clearInterval(counter);
            }
            setCount(Math.floor(start));
        }, incrementTime);

        return () => clearInterval(counter);
    }, [end, duration]);

    return count;
};

export default useCounter;
