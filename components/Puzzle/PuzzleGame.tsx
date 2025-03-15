'use client';
import PuzzleElement from "@/components/Puzzle/PuzzleElement";
import WinScreen from "@/components/Puzzle/WinScreen";
import Hint from "@/components/Puzzle/Hint";
import usePuzzleLogic from "@/hooks/usePuzzleLogic";
import { redirect } from "next/navigation";
import { availablePaints, countInRow, countInCol } from "@/constants";
import {use, useEffect, useState} from "react";
import useGallery from "@/hooks/useGallery";
import {getRandomInt} from "@/utils/random";

export default function PuzzleGame({ params }: { params: Promise<{ name: string }> }) {
    const resolvedParams = use(params);
    const { addToGallery } = useGallery();
    const [winScore] = useState(() => 5 + getRandomInt(5));

    if (!availablePaints.includes(resolvedParams.name)) {
        redirect('/');
    }

    const {
        isClient,
        isInteracted,
        rotations,
        isWin,
        handleRotate,
        gridTemplateRows,
        gridTemplateColumns
    } = usePuzzleLogic(countInRow, countInCol);

    useEffect(() => {
        if (isWin) {
            addToGallery(resolvedParams.name, winScore);
        }
    }, [addToGallery, isWin, resolvedParams.name, winScore]);

    if (!isClient) return null;

    return (
        <div className="w-full h-full flex flex-col items-center bg-plus-bg">
            {isWin ? (
                <WinScreen winScore={winScore} paintName={resolvedParams.name} />
            ) : (
                <>
                    <div className="my-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Собери картину
                        </h1>
                        <p className="text-lg text-gray-600">
                            Поворачивай элементы, чтобы собрать изображение
                        </p>
                        <div className="mt-4 bg-gradient-to-r from-[#fd5a54] to-[#7649f1] h-1 w-24 mx-auto rounded-full"/>
                    </div>

                    <div
                        className="gap-2.5 p-4 bg-white rounded-2xl shadow-plus-inner"
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
                                transitionDuration={isInteracted ? "0.3s" : "1.5s"}
                            />
                        ))}
                    </div>

                    <Hint />
                </>
            )}
        </div>
    );
}