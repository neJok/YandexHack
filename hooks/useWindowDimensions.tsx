'use client';
import { useState, useEffect } from 'react';

interface IWindowRes {
    width: number;
    height: number;
}

export default function useWindowDimensions(): IWindowRes {
    const [windowDimensions, setWindowDimensions] = useState<IWindowRes>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function getWindowDimensions(): IWindowRes {
            const { innerWidth: width, innerHeight: height } = window;
            return { width, height };
        }

        setWindowDimensions(getWindowDimensions());

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowDimensions;
}