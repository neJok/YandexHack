'use client';
import { useState, useEffect, use } from "react";
import PuzzleElement from "@/components/PuzzleElement/PuzzleElement";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { getRandomInt } from "@/utils/random";
import {redirect} from "next/navigation";
import Image from "next/image";

export default function PuzzleGame({ params }: { params: Promise<{ name: string }> }) {
    const resolvedParams = use(params);

    const availablePaints = ['paint']
    if (!availablePaints.includes(resolvedParams.name)) {
        redirect('/');
    }

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { height, width } = useWindowDimensions();
    const minRes = Math.min(width, height) * 0.7;

    const countInRow = 3;
    const countInCol = 3;
    const totalElements = countInRow * countInCol;

    const initRotation = Array(totalElements).fill(0).map(() => 90 * getRandomInt(4) + 90);
    const [rotations, setRotations] = useState(initRotation);
    const [isWin, setIsWin] = useState(false);

    const gridTemplateRows = Array(countInRow).fill(`${Math.round(minRes / countInRow)}px`).join(' ');
    const gridTemplateColumns = Array(countInCol).fill(`${Math.round(minRes / countInCol)}px`).join(' ');

    const handleRotate = (index: number) => {
        const newRotations = [...rotations];
        newRotations[index] = newRotations[index] + 90;
        setRotations(newRotations);
    };

    useEffect(() => {
        if (rotations.every(rotate => rotate % 360 === 0)) {
            const timer = setTimeout(() => {
                setIsWin(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [rotations]);

    if (!isClient) {
        return null;
    }

    return (
        <div className="w-full h-full px-10">
            {isWin ? (
                <div className="w-full h-full flex mt-3 justify-center">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-center">Победа!</h1>
                        <div className="flex flex-row items-center gap-2 rounded-2xl py-2 px-2 mt-3" style={{background: "linear-gradient(90deg, #FD5A54 0%, #F24F82 17.82%, #DF45A9 34.03%, #C042C3 48.77%, #9D41DD 63.69%, #7649F1 78.61%, #5C57F5 88.74%, #4162F8 100%)"}}>
                            <Image alt="alt" src="/plus_logo.svg" width={30} height={30} />
                            <span className="text-3xl text-white">Вы выиграли {5 + getRandomInt(5)} баллов плюса </span>
                        </div>
                        <div className="cursor-pointer mt-3" onClick={() => redirect("/")}>Назад к галерее</div>
                    </div>
                </div>
            ) : (
                <>
                    <h1 className="text-center text-2xl font-bold my-4">Собери картину и получи бонусы!</h1>
                    <div
                        className="gap-2 w-full h-full items-center justify-center"
                        style={{
                            display: "grid",
                            gridTemplateRows: gridTemplateRows,
                            gridTemplateColumns: gridTemplateColumns,
                        }}
                    >
                        {rotations.map((rotate, index) => (
                            <PuzzleElement
                                key={index}
                                paintName={String(resolvedParams.name) || ''}
                                frameIndex={index + 1}
                                rotate={rotate}
                                onRotate={() => handleRotate(index)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}