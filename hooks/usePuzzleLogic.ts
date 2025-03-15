import { useState, useEffect } from "react";
import { getRandomInt } from "@/utils/random";
import useWindowDimensions from "./useWindowDimensions";

export default function usePuzzleLogic(countInRow: number, countInCol: number) {
    const [isClient, setIsClient] = useState(false);
    const [isInteracted, setIsInteracted] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const totalElements = countInRow * countInCol;
    const initRotation = Array(totalElements).fill(0).map(() => 90 * getRandomInt(4) + 90);
    const [rotations, setRotations] = useState(initRotation);
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        if (isInteracted) return;

        const intervals: NodeJS.Timeout[] = [];
        for (let i = 0; i < totalElements; i++) {
            const interval = setInterval(() => {
                if (Math.random() < 0.15) {
                    setRotations(prev => {
                        const newRotations = [...prev];
                        newRotations[i] += 90;
                        return newRotations;
                    });
                }
            }, 3000 + Math.random() * 2000);
            intervals.push(interval);
        }
        return () => intervals.forEach(clearInterval);
    }, [isInteracted, totalElements]);

    const handleRotate = (index: number) => {
        if (!isInteracted) setIsInteracted(true);
        setRotations(prev => {
            const newRotations = [...prev];
            newRotations[index] += 90;
            return newRotations;
        });
    };

    useEffect(() => {
        if (isInteracted && rotations.every(rotate => rotate % 360 === 0)) {
            const timer = setTimeout(() => setIsWin(true), 300);
            return () => clearTimeout(timer);
        }
    }, [rotations, isInteracted]);

    const { height, width } = useWindowDimensions();
    const minRes = Math.min(width, height) * 0.7;

    const gridTemplateRows = Array(countInRow).fill(`${Math.round(minRes / countInRow)}px`).join(' ');
    const gridTemplateColumns = Array(countInCol).fill(`${Math.round(minRes / countInCol)}px`).join(' ');

    return {
        isClient,
        isInteracted,
        rotations,
        isWin,
        handleRotate,
        gridTemplateRows,
        gridTemplateColumns
    };
}